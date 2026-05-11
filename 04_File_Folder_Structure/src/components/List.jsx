import { useState } from "react";

const List = ({ list, setData }) => {
  const [isExpanded, setIsExpended] = useState({});

  // Add New Folder
  const setNodeList = (nodeId) => {
    const name = prompt("Enter Folder Name");
    const addNodeList = (prev) => {
      return prev.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: Date.now().toString(), name: name, isFolder: true, children: [] },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: addNodeList(node.children) };
        }
        return node;
      });
    };
    setData((prev) => addNodeList(prev));
  };

  // Delete Folder
  const deleteNodeList = (nodeId)=>{
    const updateNodeTree = (prev)=>{
      return prev.filter((node)=> node.id !== nodeId).map((node)=> {
        if(node.children){
          return {...node, children : updateNodeTree(node.children)}
        }
        return node
      })
    }
    setData((prev)=> updateNodeTree(prev))
  }

  return (
    <div className="container">
      {list.map((node) => (
        <div key={node.id}>
          <div className="node-list">
            {node.isFolder && (
              <span
                className="extend"
                onClick={() => {
                  setIsExpended((prev) => ({
                    ...prev,
                    [node.name]: !prev[node.name],
                  }));
                }}
              >
                {isExpanded[node.name] ? "- " : "+ "}
              </span>
            )}
            <span>{node.name}</span>
            {node.isFolder && (
              <img
                onClick={() => setNodeList(node.id)}
                className="add-folder-image"
                src="https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/add-folder-icon.png"
              />
            )}
            <img
                onClick={() => deleteNodeList(node.id)}
                className="add-folder-image"
                src="https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/remove-folder-icon.png"
            />
          </div>
          {node?.children && isExpanded?.[node.name] && (
            <List list={node.children} setData={setData} />
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
