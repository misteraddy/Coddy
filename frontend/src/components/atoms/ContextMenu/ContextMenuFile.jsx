import { useEditorSocketStore } from "@/stores/editorSocketStore";
import { useFileContextMenuStore } from "@/stores/fileContextMenuStore";
import { useModalActiveStore } from "@/stores/modalActiveStore";
import { useDirectoryTreeStore } from "@/stores/treeStructureStore";
import React from "react";

function ContextMenuFile({ x, y, path }) {
  const { editorSocket } = useEditorSocketStore();

  const { closeContextMenu } = useFileContextMenuStore();

  const {setTreeStructure} = useDirectoryTreeStore();

  const { setOpenDialog , toggleModalToFileOrFolder } = useModalActiveStore();

  function handleDelete(e) {
    e.preventDefault();
    editorSocket.emit("deleteFile", { pathToFileOrFolder: path });
    closeContextMenu();
    setTreeStructure();
  }

  function handleRename() {
    setOpenDialog(true);
    toggleModalToFileOrFolder("File");
    closeContextMenu();
  }

  function handleMouseLeave() {
    closeContextMenu();
  }

  return (
    <div
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        top: y,
        left: x,
        zIndex: 1000,
      }}
      className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-600"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownMenuIconButton"
      >
        <li>
          <button
            onClick={handleDelete}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Delete
          </button>
        </li>
        <li>
          <button
            onClick={handleRename}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Rename
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ContextMenuFile;
