import {  ColumnsStore, } from "./../types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create<ColumnsStore>()(
  persist(
    (set) => ({
      columns: [],
      tasks: [],
      setColumns: (newColumns) => set({ columns: newColumns }),

      addColumn: (newColumn) =>
        set((state) => ({ columns: [...state.columns, newColumn] })),

      removeColumn: (id) =>
        set((state) => ({
          columns: state.columns.filter((column) => column.id !== id),
          tasks: state.tasks.filter((task) => task.columnId !== id),
        })),

      updateColumnTitle: (id, title: string) => {
        set((state) => {
          const updatedColumns = state.columns.map((col) =>
            col.id === id ? { ...col, title } : col
          );
          return { ...state, columns: updatedColumns };
        });
      },

      addTask: (newTask) => {
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      removeTask: (columnId, taskId) => {
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => !(task.id === taskId && task.columnId === columnId)
          ),
        }));
      },
      setTasks: (newTasks) => set({ tasks: newTasks }),
      updateTask: (taskId, columnId, content) => {
        set((state) => {
          const updatedColumns = state.tasks.map((task) =>
            task.id === taskId && task.columnId === columnId
              ? { ...task, content }
              : task
          );
          return { ...state, tasks: updatedColumns };
        });
      },
    }),
    {
      name: "columns-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
