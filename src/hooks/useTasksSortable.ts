import { useSortable } from "@dnd-kit/sortable";
import { Task } from "../types/types";
import { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useOtherStuff } from "../store/otherStuffs";
export default function useTasksSortable(task: Task) {
  const [isEditMode, setIsEditMode,] = useState(false);
  const [content, setContent] = useState(task.content);
const {setDragactive} = useOtherStuff()

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
    disabled: isEditMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(()=>{
    setDragactive(isDragging)
  },[isDragging, setDragactive])

  
  return {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    style,
    isEditMode,
    setIsEditMode,
    content,
    setContent,
  };
}
