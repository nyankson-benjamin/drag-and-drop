import ColumnComponent from "./ColumnComponent";
import { ColumnsProps } from "../types/types";

export default function ColumnsContainer({columns}:Readonly<ColumnsProps>) {
  
  return (
    <div className="flex gap-4">

      {columns.map((column) => (
        <ColumnComponent column={column} key={column.id} />
      ))}
    </div>
  );
}
