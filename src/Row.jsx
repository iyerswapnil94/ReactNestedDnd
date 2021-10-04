import React, { useRef, useMemo } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import DropZone from "./DropZone";
import Column from "./Column";
import { UNGROUPED } from "./constants";

const Row = ({ data, handleDrop, path, expandedRows, handleRowExpansion }) => {
  const ref = useRef(null);

  const [{}, drag] = useDrag({
    item: {
      type: ROW,
      id: data.id,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  const rowHasChildren = data.children && data.children.length > 0;
  const isUngrouped = data.id === UNGROUPED;
  const expandCollapseOption = useMemo(() => {
    return (
      <button onClick={() => handleRowExpansion(data.id)}>
        {expandedRows.includes(data.id) ? " - " : " + "}
      </button>
    );
  }, [expandedRows, handleRowExpansion]);

  return (
    <div ref={ref} className="base">
      {isUngrouped ? null : (
        <div className="row">
          {expandCollapseOption}
          {data.id}
        </div>
      )}
      <div className={isUngrouped ? "" : "columns"}>
        {rowHasChildren &&
          (expandedRows.includes(data.id) || isUngrouped) &&
          data.children.map((column, index) => {
            const currentPath = `${path}-${index}`;

            return (
              <React.Fragment key={column.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: data.children.length,
                  }}
                  onDrop={handleDrop}
                  className="verticalDrag"
                />
                <Column
                  key={column.id}
                  data={column}
                  handleDrop={handleDrop}
                  path={currentPath}
                />
              </React.Fragment>
            );
          })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          className="verticalDrag"
          isLast
        />
      </div>
    </div>
  );
};
export default Row;
