import React from "react";

const PaginateItem = ({ number, currentPage }) => {
  return (
    <a
      className={`w-[35px] h-[35px] rounded-full border-[1px] border-gray-200 grid justify-items-center ml-5 ${
        number === currentPage ? "bg-green-700 text-white" : null
      } text-sm content-center`}
      href={`/?page=${Math.round(number)}`}
    >
      {console.log("rendering pagination items" + number)}
      {Math.round(number)}
    </a>
  );
};

export default PaginateItem;
