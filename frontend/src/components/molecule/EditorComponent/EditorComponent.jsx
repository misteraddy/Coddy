import { ExtensionToText } from "@/components/atoms/Mapper/ExtensionToText";
import { useActiveFileTabStore } from "@/stores/activeFileTabStore";
import { Editor } from "@monaco-editor/react";
import React from "react";

function EditorComponent({ handleEditorTheme, handleChange }) {
  const { activeFileTab } = useActiveFileTabStore();

  return (
    <div className="w-full h-screen">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={undefined}
        defaultValue="// Welcome to the playground"
        options={{
          fontSize: 18,
          fontFamily: "monospace",
        }}
        theme={handleEditorTheme}
        onChange={handleChange}
        language={ExtensionToText(activeFileTab?.extension)}
        value={
          activeFileTab?.value
            ? activeFileTab.value
            : "// Welcome to the playground"
        }
      />
    </div>
  );
}


export default EditorComponent;
