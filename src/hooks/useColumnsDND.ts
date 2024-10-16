import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useStore } from "../store/store";
import { generateId } from "../utils/utls";
import { columns, Task } from "../types/types";
import { useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export default function useColumnsDND() {
  const [activeColumn, setActiveColumn] = useState<columns | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const { columns, addColumn, setColumns, setTasks, tasks } = useStore();

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
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
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

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return; // No drop target
  
    const activeId = active.id;
    const overId = over.id;
  
    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";
  
    if (!isActiveTask) return; // We are only handling tasks
  
    const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);
    const activeTask = tasks[activeTaskIndex];
    
    // Dropping a task over another task (reorder tasks within or across columns)
    if (isActiveTask && isOverTask) {
      const overTaskIndex = tasks.findIndex((task) => task.id === overId);
      const overTask = tasks[overTaskIndex];
  
      // If dropping within the same column, just reorder the tasks
      if (activeTask.columnId === overTask.columnId) {
        setTasks(arrayMove(tasks, activeTaskIndex, overTaskIndex));
      } 
      // If dropping to a different column, move the task to the new column and reorder
      else {
        const updatedTasks = [...tasks];
  
        // Remove task from its original position
        updatedTasks.splice(activeTaskIndex, 1);
        
        // Set the new columnId for the task
        activeTask.columnId = overTask.columnId;
  
        // Insert the task at the new position in the target column
        updatedTasks.splice(overTaskIndex, 0, activeTask);
  
        // Update tasks
        setTasks(updatedTasks);
      }
    }
  
    // Dropping a task over another column (move task to new column at the end)
    if (isActiveTask && isOverColumn) {
      const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);
  
      // Change the columnId for the task
      tasks[activeTaskIndex].columnId = overId;
  
      // Move the task to the end of the new column
      setTasks([...tasks]);
    }
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
    sensors,
    activeTask,
    onDragOver,
  };
}
