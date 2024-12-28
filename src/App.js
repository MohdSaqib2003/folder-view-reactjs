import React from "react";
import FolderView from "./Components/FolderView";
import { data } from "./Components/dummy";

const App = () => {
  return (
    <div>
      <h1>Folder View</h1>
      <FolderView data={data} />

      {/* If data is in array */}
      {/* {data.map((d)=>{
        return <FolderView data={d}/>
      })} */}
    </div>
  );
};

export default App;
