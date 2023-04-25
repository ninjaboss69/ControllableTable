import React, { useEffect } from "react";
import Tree from "react-d3-tree";
import "./custom-tree.css";
import { orgChart } from "./Source";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TREE_ACTIONS_TYPE } from "../../redux/tree/tree-actions";
import { useRef } from "react";

const renderRectSvgNode = ({ nodeDatum }) => (
  <g>
    {/* <rect
      width="50"
      height="50"
      x="-25"
      y="-25"
      onClick={() => {}}
      fill="#539165"
      stroke="#FFEAEA"
      r="50%"
    /> */}
    <circle cx="q0" cy="10" r="25" stroke="black" stroke-width="3" fill="red" />

    {/* <text
      strokeWidth="1"
      x="20"
      stroke="#F8F5E4"
      dx="10"
      dy="20"
      font-size="8px"
    >
      {nodeDatum.id}
    </text> */}
    <br />
    <text stroke="#F7C04A" strokeWidth={1} dx="-20" dy="65" font-size="15px">
      {nodeDatum.name}
    </text>
  </g>
);

const TreeDiagram = () => {
  const treeChart = useSelector((state) => state.tree.tree_data);
  const [currentNode, setCurrentNode] = useState(treeChart);
  const [currentParent, setCurrentParent] = useState(treeChart);
  const [options, setOptions] = useState([]);
  const selectedRef = useRef();
  const nameRef = useRef();

  const dispatch = useDispatch();

  const dfs = (parent, data) => {
    if (parent == null) return;
    data.push(parent);
    if (parent.children?.length >= 1) {
      for (let i = 0; i < parent.children?.length; i++) {
        dfs(parent.children[i], data);
      }
    }
  };

  useEffect(() => {
    dispatch({ type: TREE_ACTIONS_TYPE.SET_TREE, payload: orgChart });
    // if (!currentParent) setCurrentParent(orgChart);
  }, []);

  useEffect(() => {
    const data = [];
    dfs(treeChart, data);
    setOptions(data);
  }, [treeChart]);

  const addNewNode = () => {
    handleTextArea();
    dispatch({
      type: TREE_ACTIONS_TYPE.ADD_NEW_NODE,
      payload: { parentNode: currentParent, nodeToAdd: currentNode },
    });
  };

  const deleteNode = () => {
    dispatch({
      type: TREE_ACTIONS_TYPE.DELETE_NEW_NODE,
      payload: selectedRef.current.value || "Currently No Node",
    });
  };

  const handleTextArea = () => {
    setCurrentNode({ name: nameRef.current.value || "No Name Here" });
  };

  const changeParentNode = () => {
    setCurrentParent({
      ...currentParent,
      id: selectedRef.current.value,
    });
  };

  // Available Path Function
  // step, elbow , straight , diagonal

  return (
    <div className="flex flex-row bg-gray-500">
      <div className="border-r-2  border-gray-600 p-5">
        <h3 className="mb-5">Parent Node</h3>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-3"
          ref={selectedRef}
          onClick={() => {
            changeParentNode();
          }}
          onChange={() => {
            changeParentNode();
          }}
        >
          {options.map((option) => (
            <option
              value={option.id}
            >{`${option.name} ( id : ${option.id})`}</option>
          ))}
        </select>

        <div className="grid grid-cols-2 justify-center mt-10">
          <p>New Node Name : </p>
          <textarea
            onChange={handleTextArea}
            rows="1"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="New Node ..."
            ref={nameRef}
          ></textarea>
        </div>
        <div className="flex gap-10">
          <button
            className="bg-success rounded-lg p-3 mt-10"
            onClick={addNewNode}
          >
            Add New Node
          </button>
          <button
            className="bg-danger rounded-lg p-3 mt-10"
            onClick={deleteNode}
          >
            Delete Node
          </button>
        </div>
      </div>
      <div id="treeWrapper" className=" w-full h-[100vh]">
        <Tree
          data={treeChart}
          // renderCustomNodeElement={renderRectSvgNode}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          orientation="vertical"
          pathFunc="straight"
          translate={{ x: 450, y: 100 }}
          transitionDuration={1000}
          centeringTransitionDuration={800}
          zoom={5}
          enableLegacyTransitions={true}
        />
      </div>
    </div>
  );
};

export default TreeDiagram;
