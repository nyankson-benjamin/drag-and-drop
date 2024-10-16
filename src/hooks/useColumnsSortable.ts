import { useSortable } from "@dnd-kit/sortable";
import { columns } from "../types/types";
import { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useStore } from "../store/store";
import { generateId } from "../utils/utls";
import { TEXTCOLOR, TEXTCOLORVARIANT } from "../constants/colors";
import { useOtherStuff } from "../store/otherStuffs";

export default function useColumnsSortable(column: columns) {
  const [editMode, setEditMode] = useState(false);
  const { updateColumnTitle, tasks, addTask } = useStore();
  const {isDragActive} = useOtherStuff()

  const [title, setTitle] = useState(column.title);
const [content, setContent] = useState("")
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    border:isDragActive ? `3px solid ${TEXTCOLOR}` :"",
    background:isDragActive ? TEXTCOLORVARIANT :"",
    // opacity: isDragActive ? 0.4 :1

  };

  useEffect(() => {
    if (!editMode) {
      updateColumnTitle(column.id, title);
    }
  }, [column.id, editMode, title, updateColumnTitle]);

  const currentTasks = tasks.filter(task=>task.columnId === column.id)
const addToTasks=()=>{
addTask({columnId:column.id, id:generateId(), content:content})
}


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
    currentTasks,
    addToTasks,
    editMode,
    content, 
    setContent
  };
}
