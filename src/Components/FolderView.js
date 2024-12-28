import React, { useState } from "react";
import "./FolderView.css";

const FolderView = ({ data }) => {
  const [expand, setExpand] = useState(false);

  // check not file, folder logic that may contain nested folders/files
  if (!data.name.includes(".")) {
    return (
      <div className="folder-container">
        <div className="folder-name" onClick={() => setExpand(!expand)}>
          <img
            src={expand ? "assests/expand.png" : "assests/collapse.png"}
            alt="folder"
            width={10}
          />{" "}
          {data.name}
        </div>

        <div style={expand ? { display: "block" } : { display: "none" }}>
          {data.items.map((child) => {
            return <FolderView data={child} />;
          })}
        </div>
      </div>
    );
  } else {
    return <div className="file">{data.name}</div>;
  }
};

export default FolderView;
