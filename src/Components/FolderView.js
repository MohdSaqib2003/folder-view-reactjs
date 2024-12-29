import React, { useState } from "react";
import "./FolderView.css";

const FolderView = ({ data, insertNewNode }) => {
  const [expand, setExpand] = useState(false);
  const [inputField, setInputField] = useState({
    visible: false,
    isFolder: false,
  });

  // handle on add new folder or file (when user presses enter key)
  const onAddNewFolderOrFile = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      setInputField({
        ...inputField,
        visible: false,
      });
      const newNodeData = {
        id: new Date().getTime(), // generate id
        name: e.target.value,
        isFolder: inputField.isFolder,
        items: [],
      };
      insertNewNode(data.id, newNodeData);
    }
  };
  // handle on click on folder or file icon
  const handleNewFolderOrFile = (isFolder) => {
    setInputField({
      ...inputField,
      visible: true,
      isFolder,
    });
    setExpand(true);
  };

  // check not file, folder logic that may contain nested folders/files
  if (data.isFolder) {
    return (
      <div className="folder-container">
        <div className="folder-name" onClick={() => setExpand(!expand)}>
          <img
            src={expand ? "assests/expand.png" : "assests/collapse.png"}
            alt="folder"
            width={10}
          />{" "}
          {data.name} {/* Add new folder or file icons */}
          <span
            onClick={(e) => e.stopPropagation()}
            className="add-new-folder-file-buttons"
          >
            <img
              src="assests/folder.png"
              alt="folder"
              width={12}
              onClick={() => handleNewFolderOrFile(true)}
            />

            <img
              src="assests/file.png"
              alt="file"
              width={12}
              onClick={() => handleNewFolderOrFile(false)}
            />
          </span>
        </div>
        <div>
          {inputField.visible && (
            <div className="new-folder-file-input">
              {/* When user click on add new folder show collapse (>) icon */}
              {inputField.isFolder && (
                <img src="assests/collapse.png" alt="folder" width={10} />
              )}{" "}
              <input
                type="text"
                onKeyDown={onAddNewFolderOrFile}
                autoFocus
                onBlur={() =>
                  setInputField({
                    ...inputField,
                    visible: false,
                  })
                }
              />
            </div>
          )}
        </div>

        <div style={expand ? { display: "block" } : { display: "none" }}>
          {data.items.map((item, ind) => {
            return (
              <FolderView
                data={item}
                insertNewNode={insertNewNode}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div className="file">{data.name}</div>;
  }
};

export default FolderView;
