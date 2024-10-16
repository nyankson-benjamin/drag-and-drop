import { useSortable } from "@dnd-kit/sortable";
import { Task } from "../types/types";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

export default function useTasksSortable(task: Task) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.content);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  
  return {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    setEditMode,
    isDragging,
    style,
    title,
    setTitle,
    // currentTasks,
    // addToTasks,
    editMode,
  };
}
