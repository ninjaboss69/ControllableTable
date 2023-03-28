import React from "react";
import { assets } from "../../assets";
import { useState } from "react";
import ExpandRow from "./ExpandRow";
import { useEffect } from "react";
import { getObjFromID } from "../../utils";
import EditRow from "../Modal/EditRow";

const TableRow = ({
  user,
  windowDimensions,
  numbersOfColumn,
  expandAll,
  id,
  addSelectId,
  allSelctedId,
  array,
}) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    setExpand(expandAll);
  }, [expandAll]);

  // const { attributes, transform, transition, listeners, setNodeRef } =
  //   useSortable({
  //     id: id,
  //   });

  // const style = { transform: CSS.Transform.toString(transform), transition };
  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };
  // const [editObject, setEditObject] = useState({});
  // const updateByID = () => {
  //   // setEditObject(getObjFromID(user.id, array));
  //   // console.log(user.id);
  //   setShow(true);
  // };
  const editable = [
    "age",
    "hair_color",
    "weight",
    "name",
    "laptop",
    "keyboard_color",
    "glass",
    "coffee",
    "phone",
    "watch",
    "id",
  ];

  return (
    <>
      {console.log("rendering table row")}
      {show ? (
        <>
          <EditRow user={user} closeModal={closeModal} editable={editable} />
        </>
      ) : (
        <></>
      )}
      <tr
        class="border-[1px] border-gray-200 dark:border-gray-300 "
        key={user.id}
      >
        <td class="px-6 py-4 w-[100px]">
          {expand ? (
            <>
              <img
                alt="expand"
                src={assets.arrowUp}
                width="30px"
                height="30px"
                onClick={() => {
                  setExpand(!expand);
                }}
              />
            </>
          ) : (
            <>
              <img
                alt="expand"
                src={assets.arrowDown}
                width="30px"
                height="30px"
                onClick={() => setExpand(!expand)}
              />
            </>
          )}
        </td>
        <td class="px-6 py-4 w-[50px]">
          <div class="flex items-center mb-2">
            {allSelctedId.includes(user.id) ? (
              <>
                <input
                  checked
                  type="checkbox"
                  value=""
                  onClick={() => {
                    addSelectId(user.id);
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  value=""
                  onClick={() => {
                    addSelectId(user.id);
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </>
            )}
          </div>
        </td>

        {Object.keys(user)
          .slice(0, numbersOfColumn)
          .map((key) => (
            <td class="px-6 py-4 w-[100px]">
              {<p className="overflow-hidden truncate">{user[key]}</p>}
            </td>
          ))}
        <td colSpan={1}>
          <div className="grid grid-cols-2">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
              onClick={() => setShow(true)}
            >
              Update
            </button>
          </div>
        </td>
      </tr>

      {expand ? (
        Object.keys(user)
          .slice(numbersOfColumn, user.length)
          .map((k) => (
            <ExpandRow
              key={k}
              k={k}
              value={user[k]}
              windowDimensions={windowDimensions}
              numberOfColumns={numbersOfColumn}
            />
          ))
      ) : (
        <></>
      )}
    </>
  );
};

export default TableRow;
