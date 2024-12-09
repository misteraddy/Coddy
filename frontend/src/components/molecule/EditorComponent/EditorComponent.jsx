import { Editor } from "@monaco-editor/react";
import React from "react";

function EditorComponent({ editorState, handleEditorTheme }) {
  return (
    <div className="w-full h-screen">
      {editorState.theme && (
        <Editor
          height="100%"
          width="100%" 
          defaultLanguage="javascript"
          defaultValue="// Welcome to the playground"
          options={{
            fontSize: 18,
            fontFamily: "monospace",
          }}
          onMount={handleEditorTheme}
        />
      )}
    </div>
  );
}

export default EditorComponent;
