import React, { useEffect, useState } from "react";
import EditorComponent from "./EditorComponent";
import { useEditorSocketStore } from "@/stores/editorSocketStore";
import { useActiveFileTabStore } from "@/stores/activeFileTabStore";
import { useTheme } from "@/components/atoms/DarkMode/ThemeProvider";

function EditorComponentContainer() {
  const { theme } = useTheme();
  const { editorSocket } = useEditorSocketStore();
  const { activeFileTab } = useActiveFileTabStore();

  let timerId = null;

  const handleEditorTheme = theme === "dark" ? "vs-dark" : "light";

  function handleChange(value) {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      editorSocket.emit("writeFile", {
        data: value,
        pathToFileOrFolder: activeFileTab.path,
      });
    }, 2000);
  }

  return (
    <EditorComponent
      handleEditorTheme={handleEditorTheme}
      handleChange={handleChange}
    />
  );
}


export default EditorComponentContainer;
