import React from "react";
import { FaTimes } from "react-icons/fa";
import links from "./NavData";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../../context";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <aside
      className={`${
        isSidebarOpen ? "sidebar-wrapper show" : "sidebar-wrapper"
      }`}
    >
      <div className="sidebar">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-links">
          {links.map((item) => {
            const { text, url, id } = item;
            return (
              <article key={id}>
                <Link to={url} onClick={closeSidebar}>
                  <h4>{text}</h4>
                </Link>
                {text === "Recipes" && (
                  <div className="sidebar-sublinks">
                    {links[1].sublinks.map((link, index) => {
                      const { subUrl, icon, label } = link;
                      return link ? (
                        <a className="sublink" key={index} href={subUrl}>
                          {icon}
                          {label}
                        </a>
                      ) : null;
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
