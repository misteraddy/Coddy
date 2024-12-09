import React, { useEffect, useState } from "react";
import EditorComponent from "./EditorComponent";

function EditorComponentContainer() {
  const [editorState, setEditorState] = useState({
    theme: null,
  });

  async function downloadTheme() {
    const response = await fetch("/themes/Dracula.json");
    const data = await response.json();
    console.log(data);
    setEditorState({ ...editorState, theme: data });
  }

  function handleEditorTheme(editor, monaco) {
    monaco.editor.defineTheme("dracula", editorState.theme);
    monaco.editor.setTheme("dracula");
  }

  useEffect(() => {
    downloadTheme();
  }, []);

  return (
    <>
      <EditorComponent
        editorState={editorState}
        handleEditorTheme={handleEditorTheme}
      />
    </>
  );
}

export default EditorComponentContainer;
