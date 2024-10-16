import {
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useStore } from "../store/store";
import { generateId } from "../utils/utls";
import { columns } from "../types/types";
import { useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export default function useColumnsDND() {
  const [activeColumn, setActiveColumn] = useState<columns | null>(null);

  const { columns, addColumn, setColumns } = useStore();

  const createColumn = () => {
    const columnToAdd: columns = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    addColumn(columnToAdd);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);


  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const activeColumnIndex = columns.findIndex(
      (col) => col.id === activeColumnId
    );
    const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);

    setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
  };

  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );


  return {
    createColumn,
    onDragStart,
    activeColumn,
    columnsId,
    onDragEnd,
    sensors
  };
}
