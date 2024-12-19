import { create } from "zustand";

export const useModalActiveStore = create((set) => ({
  openDialog: false,
  isFileOrFolder: null,

  setOpenDialog: (value) => set({ openDialog: value }),

  toggleModalToFileOrFolder: (value) => {
    set({ isFileOrFolder: value });
  },
}));
