import { ROW, COLUMN } from "./constants";

export const initialData = [
  {
    type: ROW,
    id: "row3",
    children: [
      {
        type: COLUMN,
        id: "column8",
      },
      {
        type: COLUMN,
        id: "column1",
      },
      {
        type: COLUMN,
        id: "column3",
      },
    ],
  },
  {
    type: ROW,
    id: "row1",
    children: [
      {
        type: COLUMN,
        id: "column2",
      },
      {
        type: COLUMN,
        id: "column4",
      },
    ],
  },
  {
    type: ROW,
    id: "row2",
    children: [
      {
        type: COLUMN,
        id: "column5",
      },
      {
        type: COLUMN,
        id: "column6",
      },
      {
        type: COLUMN,
        id: "column7",
      },
    ],
  },
];
