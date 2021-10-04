import React, { useState, useCallback } from "react";

import DropZone from "./DropZone";
import Row from "./Row";
import { initialData } from "./initial-data";
import { handleMoveWithinParent, handleMoveToDifferentParent } from "./helpers";

import { COLUMN, UNGROUPED } from "./constants";

const Container = () => {
  const [layout, setLayout] = useState(initialData);
  const [expandedRows, setExpandedRows] = useState([]);

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log(dropZone, item);
      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      const newLayout = handleMoveToDifferentParent(
        layout,
        splitDropZonePath,
        splitItemPath,
        newItem
      );

      setLayout(newLayout);
    },
    [layout]
  );

  const handleRowExpansion = (rowId) => {
    const updatedExpansionState = expandedRows.includes(rowId)
      ? expandedRows.filter((x) => x !== rowId)
      : [...expandedRows, rowId];
    setExpandedRows(updatedExpansionState);
  };

  const renderRow = (row, currentPath) => {
    const isUngroupedWithOutChildren =
      row && row.id === UNGROUPED && row.children && row.children.length === 0;
    return (
      !isUngroupedWithOutChildren && (
        <Row
          key={row.id + Math.random()}
          data={row}
          handleDrop={handleDrop}
          path={currentPath}
          expandedRows={expandedRows}
          handleRowExpansion={handleRowExpansion}
        />
      )
    );
  };

  return (
    <div className="body">
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id + Math.random()}>
                {row.id !== UNGROUPED && (
                  <DropZone
                    data={{
                      path: currentPath,
                      childrenCount: layout.length,
                    }}
                    onDrop={handleDrop}
                    path={currentPath}
                  />
                )}
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
