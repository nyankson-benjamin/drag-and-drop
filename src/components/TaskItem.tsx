import { TaskItemProps } from "../types/types";
import DeleteIcon from "../assets/DeleteIcon";
import { useStore } from "../store/store";
import useTasksSortable from "../hooks/useTasksSortable";
import { useEffect, useState } from "react";
import TextArea from "./TextArea";

export default function TaskItem({ task }: TaskItemProps) {
  const { removeTask, updateTask } = useStore();
  const [isMouseActive, setIsMouseActive] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    style,
    isEditMode,
    setIsEditMode,
    content, setContent
  } = useTasksSortable(task);

  useEffect(() => {
    if (!isEditMode) {
      updateTask(task.id, task.columnId, content);
    }
  }, [task.id, isEditMode, content, updateTask, task.columnId]);
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBg m-2 p-5 rounded-lg flex items-center justify-between border  border-rose-500"
      >
        Dragging...
      </div>
    );
  }

  return (
    <div
      className="bg-mainBg m-2 p-5 rounded-lg flex items-center justify-between"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseOver={() => setIsMouseActive(true)}
      onMouseLeave={() => setIsMouseActive(false)}
    >
      {!isEditMode && (
        <p onClick={() => setIsEditMode(true)} className="text-left">
          {content}
        </p>
      )}
      {isEditMode && (
        <div className="w-full">
          <TextArea
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            onBlur={() => setIsEditMode(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                setIsEditMode(false);
              }
            }}
          />
        </div>
      )}
      {isMouseActive && !isEditMode && (
        <DeleteIcon handleDelete={() => removeTask(task.columnId, task.id)} />
      )}
    </div>
  );
}
