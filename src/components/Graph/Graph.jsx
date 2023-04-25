import React, { useState } from "react";
import { Graph } from "react-d3-graph";

const GraphDiagram = () => {
  const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }, { id: "Hello" }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
      { source: "Sally", target: "Alice" },
      { source: "Hello", target: "Harry" },
    ],
  };
  const myConfig = {
    nodeHighlightBehavior: true,
    freezeAllDragEvents: false,
    width: 1200,
    height: 500,

    node: {
      color: "lightgreen",
      size: 550,
      highlightStrokeColor: "blue",
    },
    link: {
      opacity: 1,
      highlightColor: "lightblue",
      type: "CURVE_SMOOTH",
      color: "#d3d",
      strokeWidth: 2.5,
      length: 300,
    },
    d3: {
      alphaTarget: 0.05,
      gravity: -100,
      linkLength: 100,
      linkStrength: 1,
      disableLinkForce: false,
    },
  };

  return (
    <div className="w-full h-[100vh] ml-[200px] mt-[100px]">
      <Graph id="graph-id" data={data} config={myConfig} />
    </div>
  );
};

export default GraphDiagram;
