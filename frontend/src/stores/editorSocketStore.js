import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";

export const useEditorSocketStore = create((set) => {
  return {
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
      const activeFileTabSetter =
        useActiveFileTabStore.getState().setActiveFileTab;

      incomingSocket?.on("readFileSuccess", (data) => {
        const fileExtension = data.path.split('.').pop();
        activeFileTabSetter(data.path, data.value,fileExtension);
      });

      set({
        editorSocket: incomingSocket,
      });
    },
  };
});
