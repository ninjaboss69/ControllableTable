import React from "react";

import { useLocation } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { useRef } from "react";

import MainTable from "./MainTable";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ControllableTable = ({ pageRow, array }) => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const currentPage = useRef(page);

  return (
    <div>
      {console.log("rendering Controllable Table")}
      <section className="flex flex-col mt-[20px] relative m-5 ">
        {/* This is formally place of Main Table */}
        <MainTable currentPage={currentPage} pageRow={pageRow} />
      </section>
      <div className="flex mt-5 justify-between mb-[30px]">
        <Pagination
          totalRow={array.length}
          pageRow={pageRow}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default ControllableTable;
