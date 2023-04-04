import React from "react";

const Card = ({ current }) => {
  return (
    <div className="bg-gray-700 h-[100vh]">
      {/* {console.log("rendering card")} */}
      <h1 className="text-link">
        This is {current.name} page{" "}
        {current.parent !== null ? ` under ${current.parent} directory` : "."}
      </h1>
    </div>
  );
};

export default Card;
