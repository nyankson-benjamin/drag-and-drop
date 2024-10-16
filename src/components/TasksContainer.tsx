import { DndContext } from "@dnd-kit/core";
import { TaskContainerProps } from "../types/types";
import TaskItem from "./TaskItem";
import useTasksDND from "../hooks/useTasksDND";
import { SortableContext } from "@dnd-kit/sortable";

export default function TasksContainer({ tasks }: TaskContainerProps) {
  const { onDragStart, onDragEnd, tasksId,sensors } = useTasksDND();
  return (
    <div className="flex gap-2 flex-col text-center w-full">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors} >
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
