import React from "react";
import Panel from "./Panel";
import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";
import { assets } from "./assets";

const Menu = ({ menuArray }) => {
  const [current, setCurrent] = useState({});
  useEffect(() => {
    if (menuArray == null) return;
    setCurrent({ name: menuArray[0].name, parent: null });
  }, [menuArray]);

  const [expandArray, setExpandArray] = useState(["Dashboard"]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      const tt = getWindowDimensions().width;
      console.log(tt);
      if (tt <= 550) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [showMenu, setShowMenu] = useState(true);
  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <section className="h-[86%]  font-qs">
      {isMobile ? (
        <div
          className="block  py-5 w-full bg-secondary px-2"
          onClick={handleToggle}
        >
          <img src={assets.menu} alt="menu button" width={30} height={30} />
        </div>
      ) : (
        <></>
      )}
      <div class={`${isMobile ? "fl" : "flex-row"} flex h-full`}>
        <Panel
          isMobile={isMobile}
          menuArray={menuArray}
          current={current}
          setCurrent={setCurrent}
          expandArray={expandArray}
          setExpandArray={setExpandArray}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
        <div className="flex-auto flex overflow-hidden">
          <div className="flex-auto overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
