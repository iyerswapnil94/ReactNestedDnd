import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constants";

const style = {};
const Column = ({ data, path }) => {
  const ref = useRef(null);

  const [{}, drag] = useDrag({
    item: {
      type: COLUMN,
      id: data.id,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div ref={ref} className="column">
      {"icon "}{data.id}
    </div>
  );
};
export default Column;
