import { useEffect, useMemo, useState } from "react";
import { Id, Task } from "../types/types";
import { DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useStore } from "../store/store";
import { arrayMove } from "@dnd-kit/sortable";

export default function useTasksDND(){

    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const { tasks, setTasks } = useStore();

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
        }
    };
    
    const combineTaskAndColumnIds = (taskId:Id, columnId:Id)=>{
        return Number(`${taskId}${columnId}`)
    }
    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log(event)
        if (!over) return;
        const activeTaskId = active.id;
        const overTaskId = over.id;
    
        if (activeTaskId === overTaskId) return;
    
        const activeTaskIndex = tasks.findIndex(
          (task) => combineTaskAndColumnIds(task.id, task.columnId) === activeTaskId
        );
        const overTaskIndex = tasks.findIndex(
            (task) => combineTaskAndColumnIds(task.id, task.columnId) === overTaskId
          );
        setTasks(arrayMove(tasks,activeTaskIndex, overTaskIndex))

        console.log({activeTaskIndex,overTaskIndex})
      };
      const tasksId = useMemo(() => tasks.map((task) => Number(`${task.id}${task.columnId}`)), [tasks]);
      const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 0,
          },
        })
      );

      useEffect(()=>{
        console.log(activeTask)
      },[activeTask])
    return{
        onDragStart,
        onDragEnd,
        tasksId,
        activeTask,
        sensors
    }
}