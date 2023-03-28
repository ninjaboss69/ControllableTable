import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const EditRow = ({ user, editable, closeModal }) => {
  const [filteredObject, setFilterdObject] = useState({});
  // const filteredObject = {};
  useEffect(() => {
    Object.keys(user).forEach((key) => {
      if (editable.includes(key)) {
        filteredObject[key] = user[key];
      }
    });
    setFilterdObject({ ...filteredObject });
  }, []);

  return (
    <div>
      {console.log("rendering edit row" + user.id)}
      <div
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
      >
        <div class="relative w-full h-full max-w-md md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={closeModal}
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only" onClick={closeModal}>
                Close modal
              </span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Update Row Data
              </h3>
              <div class=" grid grid-cols-2 gap-4">
                {Object.keys(filteredObject).map((key) => (
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your {key}
                    </label>
                    <input
                      defaultValue={user[key]}
                      type="text"
                      name="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                class="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRow;
