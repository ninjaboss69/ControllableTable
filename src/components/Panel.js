import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { assets } from "./assets";

const Panel = ({
  menuArray,
  current,
  setCurrent,
  expandArray,
  setExpandArray,
  isMobile,
  showMenu,
}) => {
  const [currentMode, setCurrentMode] = useState("Loading");
  const [hideText, setHideText] = useState(false);
  const [tt, settt] = useState("");

  useEffect(() => {
    handleModeSwitch();
  }, []);

  const handleModeSwitch = () => {
    if (
      !localStorage.getItem("color-theme") ||
      localStorage.getItem("color-theme") === "light"
    ) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("color-theme", "dark");
      setCurrentMode("Light Mode");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("color-theme", "light");
      setCurrentMode("Dark Mode");
    }
  };

  const toggleText = () => {
    setHideText(!hideText);
  };

  useEffect(() => {
    if (isMobile && showMenu) {
      settt("hidden");
    } else {
      settt("");
    }
  }, [isMobile, showMenu]);

  return (
    <div>
      <aside
        className={`${
          hideText ? "w-16" : "w-64"
        } transition-all  transition-transform duration-[2000ms] h-full ${tt} ${
          isMobile ? "z-40 fixed" : ""
        }`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-secondary">
          <ul class="space-y-2 font-medium">
            <li
              className={`flex  mb-5  ${hideText ? "" : "justify-end"} ${
                isMobile ? "hidden" : ""
              }`}
            >
              <img
                alt="Menu Toggle Button"
                src={assets.swap}
                height={25}
                width={25}
                onClick={() => toggleText()}
              />
            </li>

            {menuArray?.map((menu) => (
              <li>
                {hideText ? (
                  <>
                    {" "}
                    <Link
                      to={`/${menu.name.toLowerCase()}`}
                      class={`flex items-center w-full p-2 text-link transition duration-75 rounded-lg group  ${
                        menu.name === current.name ? "bg-primary" : null
                      }`}
                      onClick={() => {
                        if (current.name !== menu.name)
                          setCurrent({ name: menu.name, parent: null });
                      }}
                    >
                      <img
                        src={menu.svg}
                        width={20}
                        height={20}
                        alt={menu.name}
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/${menu.name.toLowerCase()}`}
                      class={`flex items-center w-full p-2 text-link transition duration-75 rounded-lg group  ${
                        menu.name === current.name ? "bg-primary" : null
                      }`}
                    >
                      <img
                        src={menu.svg}
                        width={20}
                        height={20}
                        alt={menu.name}
                      />
                      <span
                        class="flex-1 ml-3 text-left  whitespace-nowrap"
                        sidebar-toggle-item
                        onClick={() => {
                          if (current.name !== menu.name)
                            setCurrent({ name: menu.name, parent: null });
                        }}
                      >
                        {menu.name}
                      </span>
                      {menu.children?.length >= 1 ? (
                        <div
                          onClick={() => {
                            if (expandArray.includes(menu.name)) {
                              setExpandArray([
                                ...expandArray.filter(
                                  (expand) => expand !== menu.name
                                ),
                              ]);
                            } else {
                              if (menu.children.length >= 1) {
                                setExpandArray([...expandArray, menu.name]);
                              }
                            }
                          }}
                        >
                          {" "}
                          <svg
                            sidebar-toggle-item
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      ) : null}
                    </Link>
                  </>
                )}

                {expandArray.includes(menu.name) ? (
                  <ul class=" py-2 space-y-2">
                    {menu.children?.map((child) => (
                      <li
                        onClick={() => {
                          if (current.name !== child.name)
                            setCurrent({
                              name: child.name,
                              parent: menu.name,
                            });
                        }}
                        className="flex justify-center"
                      >
                        {hideText ? (
                          <Link
                            to={`/${menu.name.toLowerCase()}/${child.name.toLowerCase()}`}
                            class={`flex items-center w-full p-2 text-link transition duration-75 rounded-lg group  ${
                              child.name === current.name ? "bg-primary" : null
                            }`}
                          >
                            <img
                              src={assets.bulb}
                              alt="learn"
                              height={20}
                              width={20}
                            />
                          </Link>
                        ) : (
                          <>
                            {" "}
                            <Link
                              to={`/${menu.name.toLowerCase()}/${child.name.toLowerCase()}`}
                              class={`flex items-center w-full p-2 text-link transition duration-75 rounded-lg  pl-11 group  ${
                                child.name === current.name
                                  ? "bg-primary"
                                  : null
                              }`}
                            >
                              <img
                                src={assets.bulb}
                                alt="learn"
                                height={20}
                                width={20}
                                className="mr-3"
                              />
                              {hideText ? "" : child.name}
                            </Link>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}

            <li class="flex justify-start mb-5">
              <button
                className="text-link pt-3"
                onClick={() => {
                  handleModeSwitch();
                }}
              >
                <div>
                  {" "}
                  {currentMode === "Light Mode" ? (
                    <img
                      src={assets.light}
                      width={20}
                      height={20}
                      alt="light"
                      className="inline mr-5 ml-2"
                    />
                  ) : (
                    <img
                      src={assets.dark}
                      width={20}
                      height={20}
                      alt="dark"
                      className="inline mr-5 ml-2"
                    />
                  )}
                  {hideText ? "" : currentMode}
                </div>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Panel;
