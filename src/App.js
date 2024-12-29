import React, { useState } from "react";
import FolderView from "./Components/FolderView";
import { dummyData } from "./Components/dummy";
import { useTraverseTree } from "./hooks/useTraverse";

const App = () => {
  const [folderData, setFolderData] = useState(dummyData);
  const { addNewNode, deleteNode, editName } = useTraverseTree();

  const insertNewNode = (parentId, newNode) => {
    const updatedFolderData = addNewNode(folderData, parentId, newNode);
    setFolderData(updatedFolderData);
  };

  const handleDeleteNode = (idToDelete) => {
    const updatedFolderData = deleteNode(folderData, idToDelete);
    setFolderData(updatedFolderData || {}); // if user deletes root set empty object({}) in folderData
  };

  const handleEditName = (id, updatedName) => {
    const updatedFolderData = editName(folderData, id, updatedName);
    setFolderData(updatedFolderData);
  };

  return (
    <div>
      <h1>Folder View (add, delete and edit folder/file)</h1>
      <FolderView
        data={folderData}
        insertNewNode={insertNewNode}
        handleDeleteNode={handleDeleteNode}
        handleEditName={handleEditName}
      />
    </div>
  );
};

export default App;
