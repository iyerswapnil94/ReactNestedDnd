import React from "react";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { ROW, COLUMN } from "./constants";

const DropZone = ({ data, onDrop, isLast, className }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ROW, COLUMN],
    drop: (item) => {
      onDrop(data, item);
    },
    canDrop: (item) => {
      const dropZonePath = data.path;
      const splitDropZonePath = dropZonePath.split("-");
      const itemPath = item.path;

      const splitItemPath = itemPath.split("-");

      // Invalid (Can't drop a parent element (row) into a child (column))
      const parentDropInChild = splitItemPath.length < splitDropZonePath.length;
      if (parentDropInChild) return false;

      // Current area
      if (splitItemPath.length === splitDropZonePath.length) {
        const pathToItem = splitItemPath.slice(0, -1).join("-");
        const currentItemIndex = Number(splitItemPath.slice(-1)[0]);

        const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");
        const currentDropZoneIndex = Number(splitDropZonePath.slice(-1)[0]);

        if (pathToItem === pathToDropZone) {
          const nextDropZoneIndex = currentItemIndex + 1;
          if (nextDropZoneIndex === currentDropZoneIndex) return false;
        }
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  return (
    <div
      className={classNames(
        "dropZone",
        { active: isActive, isLast },
        className
      )}
      ref={drop}
    />
  );
};
export default DropZone;
