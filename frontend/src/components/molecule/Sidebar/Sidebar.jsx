import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDirectoryTreeStore } from "@/stores/treeStructureStore";
import Tree from "../Tree/TreeNode";
import { useFileContextMenuStore } from "@/stores/fileContextMenuStore";
import { useFolderContextMenuStore } from "@/stores/folderContextMenuStore"; // Import folder context menu store
import ContextMenuFile from "@/components/atoms/ContextMenu/ContextMenuFile";
import ContextMenuFolder from "@/components/atoms/ContextMenu/ContextMenuFolder";

function Sidebar({ activeTab, setActiveTab, handleLogout }) {
  const { treeStructure, setTreeStructure } = useDirectoryTreeStore();

  const {
    x: fileContextX,
    y: fileContextY,
    file: filePath,
    isOpen: isFileContextMenuOpen,
  } = useFileContextMenuStore();

  const {
    x: folderContextX,
    y: folderContextY,
    folder: folderPath,
    isOpen: isFolderContextMenuOpen,
  } = useFolderContextMenuStore();

  useEffect(() => {
    if (treeStructure) {
      console.log("Tree structure:", treeStructure);
    } else {
      setTreeStructure();
    }
  }, [treeStructure, setTreeStructure]);

  return (
    <aside className="w-64 shadow-md hidden md:block border-r-2 bg-gray-100 dark:bg-black border-gray-400 dark:border-white">
      <nav>
        {isFileContextMenuOpen && fileContextX && fileContextY && (
          <ContextMenuFile x={fileContextX} y={fileContextY} path={filePath} />
        )}
        
        {isFolderContextMenuOpen && folderContextX && folderContextY && (
          <ContextMenuFolder x={folderContextX} y={folderContextY} path={folderPath} />
        )}

        {treeStructure && <Tree fileFolderData={treeStructure} />}
      </nav>
    </aside>
  );
}

export default Sidebar;
