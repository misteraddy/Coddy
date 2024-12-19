import { create } from "zustand";

export const useFileContextMenuStore = create((set) => ({
  x: null,
  y: null,
  isOpen: false,
  file: null,

  setX: (x) => set({ x }),
  setY: (y) => set({ y }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setFile: (file) => set({ file }),

  closeContextMenu: () =>
    set({
      x: null,
      y: null,
      isOpen: false,
      file: null,
    }),
}));
