import { useState } from "react";
import "./App.css";

const data = [
  {
    id: "1",
    name: "Fruits",
    children: [
      {
        id: "1.1",
        name: "Citrus",
        children: [
          {
            id: "1.1.1",
            name: "Orange",
          },
          {
            id: "1.1.2",
            name: "Lemon",
          },
        ],
      },
      {
        id: "1.2",
        name: "Berries",
        children: [
          {
            id: "1.2.1",
            name: "Strawberry",
          },
          {
            id: "1.2.2",
            name: "Blueberry",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Tropical",
    children: [
      {
        id: "2.1",
        name: "Mango",
      },
      {
        id: "2.2",
        name: "Banana",
      },
    ],
  },
  {
    id: "3",
    name: "Apple",
  },
];

function CheckBox({ data, checked, setChecked }) {
  const handleChecked = (ischecked, node) => {
    setChecked((prev) => {
      const newChecked = { ...prev, [node.id]: ischecked };
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newChecked[child.id] = ischecked;
          child.children && updateChildren(child);
        });
      };
      node.children && updateChildren(node);

      const verifyChecked = (node) => {
        if(!node.children) return newChecked[node.id] || false
        const allCildrenChecked = node.children.map((child) => verifyChecked(child)).every(Boolean)
        newChecked[node.id] = allCildrenChecked
        return allCildrenChecked
      }
      data.forEach((node) => verifyChecked(node))

      return newChecked;
    });
  };

  return (
    <div>
      {data.map((node) => {
        return (
          <div className="node" key={node.id}>
            <input
              type="checkbox"
              checked={checked[node.id] || false}
              onChange={(e) => handleChecked(e.target.checked, node)}
            />
            <span>{node.name}</span>
            {node.children && (
              <CheckBox
                data={node.children}
                checked={checked}
                setChecked={setChecked}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [checked, setChecked] = useState({});
  return (
    <>
      <h1>Nested CheckBox</h1>
      <CheckBox data={data} checked={checked} setChecked={setChecked} />
    </>
  );
}

export default App;
