import React, { useState } from "react";
import FolderView from "./Components/FolderView";
import { dummyData } from "./Components/dummy";
import { useTraverseTree } from "./hooks/useTraverse";

const App = () => {
  const [folderData, setFolderData] = useState(dummyData);
  const { addNewNode } = useTraverseTree();

  const insertNewNode = (parentId, newNode) => {
    const updatedFolderData = addNewNode(folderData, parentId, newNode);
    setFolderData(updatedFolderData);
  };

  return (
    <div>
      <h1>Folder View (add new folder/file)</h1>
      <FolderView data={folderData} insertNewNode={insertNewNode} />
    </div>
  );
};

export default App;
