import { TaskContainerProps } from "../types/types";
import TaskItem from "./TaskItem";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";

export default function TasksContainer({ tasks }: TaskContainerProps) {
  const tasksId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  return (
    <div className="flex gap-2 flex-col text-center w-full">
      <SortableContext items={tasksId}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}
