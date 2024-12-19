import { create } from "zustand";

export const useFolderContextMenuStore = create((set) => ({
  x: null,
  y: null,
  isOpen: false,
  folder: null,

  setX: (x) => set({ x }),
  setY: (y) => set({ y }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setFolder: (folder) => set({ folder }),

  closeContextMenu: () =>
    set({
      x: null,
      y: null,
      isOpen: false,
      folder: null,
    }),
}));
