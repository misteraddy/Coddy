import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalActiveStore } from "@/stores/modalActiveStore";

const FileFolderDialog = () => {
  const { openDialog, setOpenDialog, isFileOrFolder, toggleModalToFileOrFolder } = useModalActiveStore();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setNewName("");
  }, [openDialog]);

  const handleSaveChanges = () => {
    if (isFileOrFolder) {
      console.log(`Renaming ${isFileOrFolder} to: ${newName}`);
    } else {
      console.log(`Creating new ${newName}`);
    }
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-2xl dark:text-white">
        <DialogHeader>
          <DialogTitle>
            {isFileOrFolder ? `Rename ${isFileOrFolder}` : "Create New"}
          </DialogTitle>
          <DialogDescription>
            {isFileOrFolder
              ? `Enter the new name for the ${isFileOrFolder}.`
              : `Enter the name for the new ${isFileOrFolder || "File/Folder"}.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newName" className="text-right">
              New Name
            </Label>
            <Input
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileFolderDialog;
