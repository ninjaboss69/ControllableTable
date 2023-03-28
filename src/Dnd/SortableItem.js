import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCloseKeys } from "../redux/user/user-selector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { USERS_ACTIONS_TYPES } from "../redux/user/user-reducer";

export function SortableItem({ id, k }) {
  const { attributes, transform, transition, listeners, setNodeRef } =
    useSortable({
      id: id,
    });
  const dispatch = useDispatch();

  const allCloseKeys = useSelector(selectCloseKeys);
  const addCloseKeys = (key) => {
    dispatch({ type: USERS_ACTIONS_TYPES.ADD_CLOSE_KEY, payload: key });
  };
  const removeCloseKeys = (key) => {
    dispatch({ type: USERS_ACTIONS_TYPES.REMOVE_CLOSE_KEY, payload: key });
  };

  const handleChange = (key) => {
    if (allCloseKeys.includes(key)) {
      removeCloseKeys(key);
    } else addCloseKeys(key);
  };

  const style = { transform: CSS.Transform.toString(transform), transition };

  const closeKeys = useSelector(selectCloseKeys);

  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (closeKeys.includes(k)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [closeKeys, k]);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {console.log("rendering sortable item")}
      <div className="border-2 border-gray-500 h-[50px] w-[250px] p-[10px] grid grid-cols-2 mt-5 rounded-lg">
        <span className="font-bold ">{k}</span>

        {/* <button type="button" value="" class="" onClick={() => handleChange(k)}>
          {check ? "Open" : "Close"}
        </button> */}
        {check ? (
          <button
            type="button"
            onClick={() => handleChange(k)}
            class="text-white bg-green-600 hover:bg-green-600   rounded-lg text-sm px-1"
          >
            Open
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleChange(k)}
            class=" text-white bg-red-600 hover:bg-red-600  rounded-lg text-sm px-1"
          >
            Hide
          </button>
        )}
      </div>
    </div>
  );
}
