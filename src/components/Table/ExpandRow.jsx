import React from "react";

const ExpandRow = ({ value, k, numberOfColumns }) => {
  const columSpan = numberOfColumns + 3;

  return (
    <tr className="text-left mt-5">
      {console.log("rendering expand row")}
      <td colSpan={columSpan}>
        <div className="border border-[1px] border-gray-200 p-5  grid grid-cols-2">
          <span className="uppercase font-bold text-xs">{k}</span>
          <span>{value}</span>
        </div>
      </td>
    </tr>
  );
};

export default ExpandRow;
