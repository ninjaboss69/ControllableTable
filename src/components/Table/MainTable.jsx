import React from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectFilterUsers,
  selectOrderKeys,
} from "../../redux/user/user-selector";

import { PointerSensor } from "@dnd-kit/core";
import TableRow from "./TableRow";

import { USERS_ACTIONS_TYPES } from "../../redux/user/user-reducer";
import { array } from "../../data";
import { useRef } from "react";
import { SortableItem } from "../../Dnd/SortableItem";
import { useMemo } from "react";

const MainTable = ({ currentPage, pageRow }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectFilterUsers);
  // const allCloseKeys = useSelector(selectCloseKeys);
  const orderKeys = useSelector(selectOrderKeys);
  const [keys, setKeys] = useState([...orderKeys]);
  const [rowUsers, setRowUsers] = useState(users);

  const [control, setControl] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  const [allSelctedId, setAllSelectedId] = useState([]);

  const modalRef = useRef();

  const [numbersOfColumn, setNumbersOfColumn] = useState(
    window.innerWidth / 250
  );
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const tt = async () => {
      if (currentPage.current < 1) {
        currentPage.current = 1;
      }

      const data = array.slice(
        (currentPage.current - 1) * pageRow,
        currentPage.current * pageRow
      );

      dispatch({ type: USERS_ACTIONS_TYPES.SET_USERS, payload: data });
    };
    tt();
    function handleResize() {
      // if (Math.ceil(getWindowDimensions.width / 250) !== numbersOfColumn) {
      //   console.warn(numbersOfColumn);
      //   setNumbersOfColumn(Math.ceil(getWindowDimensions.width / 250));
      // } else {
      //   console.warn(numbersOfColumn);
      // }
      setWindowDimensions(getWindowDimensions());
      const tt = getWindowDimensions().width;
      const abc = Math.round(tt / 250);
      setNumbersOfColumn(abc);
      console.log(abc);
      // if (abc === numbersOfColumn) {
      //   console.warn("Congratulations, not updating number of column");
      // } else {
      //   console.warn("Not same" + abc + " and " + numbersOfColumn);
      //   console.warn("Updating number of column for " + abc);
      //   setNumbersOfColumn(abc);
      // }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setNumbersOfColumn(Math.ceil(window.innerWidth / 250));
  }, [Math.ceil(window.innerWidth / 250)]);

  useEffect(() => {
    if (keys.length === 0) setKeys(Object.keys(users[0] || {}));
    setRowUsers(users);
  }, [users]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 0 },
    })
  );

  const sortByColumn = (key) => {
    dispatch({ type: USERS_ACTIONS_TYPES.SORT_USERS_BY_KEY, payload: key });
  };
  const handleShowModal = (e) => {
    if (!modalRef.current?.contains(e.target)) {
      setControl(false);
    }
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      const abc = (items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      };
      const changes = abc(keys);

      // It will change the state of sortable keys list state
      setKeys(abc);

      // Update Table Column Flows, Table Will Not Update If Not This State Change is Fired
      dispatch({
        type: USERS_ACTIONS_TYPES.SET_ORDER_KEYS,
        payload: changes,
      });
    }
  };

  const setAllIdSelected = () => {
    const newAllSelectedId = [];
    if (allSelctedId.length === users.length) {
      setAllSelectedId([]);
      return;
    }
    for (let i = 0; i < users.length; i++) {
      console.log(users.length);
      newAllSelectedId.push(users[i].id);
    }
    setAllSelectedId([...newAllSelectedId]);
  };

  const addSelectId = (id) => {
    const newAllSelectedId = [];
    if (allSelctedId.includes(id)) {
      for (let i = 0; i < allSelctedId.length; i++) {
        if (id !== allSelctedId[i]) {
          newAllSelectedId.push(allSelctedId[i]);
        }
      }
      setAllSelectedId(newAllSelectedId);
    } else {
      setAllSelectedId([...allSelctedId, id]);
    }
  };

  // const updateByID = (id, array) => {
  //   setEditObject(getObjFromID(id, array));
  //   setShow(true);
  // };
  return (
    <div className="relative">
      {console.log("rendering main table")}
      {console.log()}
      <table
        class="w-full text-md text-left text-black rounded-lg table-fixed"
        onClick={handleShowModal}
      >
        <thead class="text-xs text-gray-300 uppercase">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 bg-gray-50 dark:bg-gray-800"
              onClick={() => {
                setExpandAll(!expandAll);
              }}
            >
              Expand
            </th>
            <th
              scope="col"
              class="px-6 py-3 bg-gray-50 dark:bg-gray-800"
              onClick={() => setAllIdSelected()}
            >
              Select
            </th>
            {Object.keys(users[0] || {})
              .slice(0, numbersOfColumn)
              .map((key) => (
                <th
                  class="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                  onClick={() => sortByColumn(key)}
                >
                  {key}
                </th>
              ))}
            <th
              scope="col"
              colSpan={1}
              class="px-6 py-3 bg-gray-50 dark:bg-gray-800 w-[170px]"
              onClick={() => setAllIdSelected()}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {rowUsers?.map((user) => (
            <TableRow
              user={user}
              rowUsers={rowUsers}
              windowDimensions={windowDimensions}
              numbersOfColumn={numbersOfColumn}
              expandAll={expandAll}
              addSelectId={addSelectId}
              allSelctedId={allSelctedId}
              id={user.id}
              key={user.id}
              k={user.id}
              array={array}
            />
          ))}
        </tbody>
      </table>
      <div>
        {control ? (
          <div
            className="absolute left-[35%] top-[10%] py-[30px] px-[50px] bg-white border border-[2px] border-gray-500 rounded-lg mt-[20px] "
            ref={modalRef}
          >
            <h1 className="mb-[20px]"> Column Controls </h1>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={keys}
              >
                {keys?.map((key) => (
                  <SortableItem id={key} key={key} k={key} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        ) : (
          <></>
        )}
      </div>
      <button
        class="mt-5  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => setControl(!control)}
      >
        Edit
      </button>{" "}
    </div>
  );
};

export default MainTable;
