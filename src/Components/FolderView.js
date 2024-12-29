import React, { useState } from "react";
import "./FolderView.css";

const FolderView = ({
  data,
  insertNewNode,
  handleDeleteNode,
  handleEditName,
}) => {
  const [expand, setExpand] = useState(false);
  const [inputField, setInputField] = useState({
    visible: false,
    isFolder: false,
  });
  const [editValue, setEditValue] = useState("");

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

  const onEditName = (e) => {
    if (e.keyCode === 13) {
      handleEditName(data.id, e.target.value);
      setEditValue("");
    }
  };

  // check not file, folder logic that may contain nested folders/files
  if (data.isFolder) {
    return (
      <div className="folder-container">
        <div
          className="folder-name"
          onClick={() => setExpand(!expand)}
          onDoubleClick={() => setEditValue(data.name)} // also update name on double click
        >
          <img
            src={expand ? "assets/expand.png" : "assets/collapse.png"}
            alt="folder"
            width={10}
          />{" "}
          {!editValue ? (
            data.name
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={onEditName}
              autoFocus
              onBlur={() => setEditValue("")}
            />
          )}
          {!editValue && (
            <span
              onClick={(e) => e.stopPropagation()}
              className="add-new-folder-file-buttons"
            >
              <span>
                <img
                  src="assets/folder.png"
                  alt="folder"
                  width={12}
                  onClick={() => handleNewFolderOrFile(true)}
                />
                <img
                  src="assets/file.png"
                  alt="file"
                  width={12}
                  onClick={() => handleNewFolderOrFile(false)}
                />
              </span>

              <span>
                <img
                  src="assets/delete.png"
                  alt="delete"
                  width={12}
                  onClick={() => handleDeleteNode(data.id)}
                />{" "}
                <img
                  src="assets/edit.png"
                  alt="edit"
                  width={12}
                  onClick={() => setEditValue(data.name)}
                />
              </span>
            </span>
          )}
        </div>

        <div>
          {inputField.visible && (
            <div className="new-folder-file-input">
              {/* When user click on add new folder show collapse (>) icon */}
              {inputField.isFolder && (
                <img src="assets/collapse.png" alt="folder" width={10} />
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
                handleDeleteNode={handleDeleteNode}
                handleEditName={handleEditName}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file" onDoubleClick={() => setEditValue(data.name)}>
        <span>
          {!editValue ? (
            data.name
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={onEditName} // onChange doesn't provide keyCode
              autoFocus
              onBlur={() => setEditValue("")} // blur triggers when input field loses focus
            />
          )}
          {/* {data.name}  */}
        </span>{" "}
        {data.id && !editValue && (
          <span>
            <img
              src="assets/delete.png"
              alt="delete"
              width={12}
              onClick={() => handleDeleteNode(data.id)}
            />{" "}
            <img
              src="assets/edit.png"
              alt="edit"
              width={12}
              onClick={() => setEditValue(data.name)}
            />
          </span>
        )}
      </div>
    );
  }
};

export default FolderView;
