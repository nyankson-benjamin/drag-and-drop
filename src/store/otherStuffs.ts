import { create } from "zustand";

type Store = {
  isDragActive: boolean;
  setDragactive: (state: boolean) => void;
};
export const useOtherStuff = create<Store>()((set) => ({
  isDragActive: false,

  setDragactive: (state) => {
    set(() => ({
      isDragActive: state,
    }));
  },
}));
