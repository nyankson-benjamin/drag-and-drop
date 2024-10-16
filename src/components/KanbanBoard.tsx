import Button from "./Button";
import PlusIcon from "../assets/PlusIcon";
import ColumnsContainer from "./ColumnContainer";
import { useStore } from "../store/store";
import {
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnsComponent from "./ColumnComponent";
import useColumnsDND from "../hooks/useColumnsDND";
import TaskItem from "./TaskItem";

export default function KanbanBoard() {
  const { columns } = useStore();
  const { createColumn, onDragStart, activeColumn, columnsId, onDragEnd, sensors, activeTask,onDragOver } = useColumnsDND();
  return (
    <div
      className="
      m-auto 
      flex 
      min-h-screen 
      w-full
      items-center
      overflow-x-auto,
      overflow-y-hidden
      px-10
    "
    >
      <div
        className="
     m-auto
     "
      >
        <DndContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          sensors={sensors}
        >
          <SortableContext items={columnsId}>
            <ColumnsContainer columns={columns} />
          </SortableContext>
          <div className="w-[350px]">
            <Button text="Add column" onSubmit={createColumn}>
              <PlusIcon />
            </Button>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && <ColumnsComponent column={activeColumn} />}
              {activeTask && <TaskItem task={activeTask} />}

            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
}
