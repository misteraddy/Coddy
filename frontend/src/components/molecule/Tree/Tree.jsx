import { FileIcon } from "@/components/atoms/Mapper/FileIcon";
import { Button } from "@/components/ui/button";
import { useEditorSocketStore } from "@/stores/editorSocketStore";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { HiFolder } from "react-icons/hi";
import { useFileContextMenuStore } from "@/stores/fileContextMenuStore";
import { useFolderContextMenuStore } from "@/stores/folderContextMenuStore";

function Tree({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});

  const { editorSocket } = useEditorSocketStore();

  const {
    setX: setXFile,
    setY: setYFile,
    setIsOpen: setIsOpenFile,
    setFile: setFileFile,
  } = useFileContextMenuStore();

  const {
    setX: setXFolder,
    setY: setYFolder,
    setIsOpen: setIsOpenFolder,
    setFolder: setFileFolder,
  } = useFolderContextMenuStore();

  const toggleVisibility = (path) => {
    setVisibility((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleDoubleClick = (fileFolderData) => {
    console.log("Double clicked on", fileFolderData);
    editorSocket?.emit("readFile", {
      pathToFileOrFolder: fileFolderData.path,
    });
  };

  const handleExtractingExtension = (name) => {
    const parts = name.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "";
  };

  const handleContextMenuForFiles = (e, path) => {
    e.preventDefault();
    setXFile(e.clientX);
    setYFile(e.clientY);
    setIsOpenFile(true);
    setFileFile(path);
  };

  const handleContextMenuForFolders = (e, path) => {
    e.preventDefault();
    setXFolder(e.clientX);
    setYFolder(e.clientY);
    setIsOpenFolder(true);
    setFileFolder(path);
  };

  return (
    <div className="">
      {fileFolderData?.children ? (
        <div className="">
          <Button
            onClick={() => toggleVisibility(fileFolderData.path)}
            variant="ghost"
            className="flex items-center text-sm font-medium rounded dark:text-white"
            onContextMenu={(e) => handleContextMenuForFolders(e, fileFolderData.path)}
          >
            {visibility[fileFolderData.path] ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
            <HiFolder />
            <span>{fileFolderData.name}</span>
          </Button>
        </div>
      ) : (
        <div className="flex">
          <span>
            <FileIcon
              extension={handleExtractingExtension(fileFolderData.name)}
            />
          </span>
          <p
            className="flex items-center m-2 text-sm font-medium text-left rounded dark:text-white cursor-pointer "
            onDoubleClick={() => handleDoubleClick(fileFolderData)}
            onContextMenu={(e) =>
              handleContextMenuForFiles(e, fileFolderData.path)
            }
          >
            {fileFolderData.name}
          </p>
        </div>
      )}

      {visibility[fileFolderData.path] && fileFolderData?.children && (
        <div className="pl-4 mt-2">
          {fileFolderData.children.map((child) => (
            <Tree key={child.path} fileFolderData={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tree;
