import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../../../../context";
import Categories from "../../../Pages/Recipes/Categories";

const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { text, sublinks },
  } = useGlobalContext();
  const container = useRef(null);
  const [columns, setColumns] = useState("col-2");

  useEffect(() => {
    setColumns("col-2");
    const submenu = container.current;
    const { center, bottom } = location;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;
    if (sublinks.length > 6) {
      setColumns("col-3");
    }
  }, [location, sublinks]);

  return (
    <aside
      className={`${isSubmenuOpen ? "submenu show" : "submenu"}`}
      ref={container}
    >
      <h4>{text}</h4>
      <div className={`submenu-center ${columns}`}>
        {sublinks.map((link, index) => {
          const { label, icon, subUrl } = link;
          return (
            <a key={index} href={subUrl}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};
export default Submenu;
