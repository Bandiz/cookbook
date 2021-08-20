import React from "react";
import Navbar from "./HeaderNav/HeaderNav";
import Sidebar from "./HeaderNav/Sidebar";
import Submenu from "./HeaderNav/Submenu";

function Header() {
  return (
    <header>
      <Navbar />
      <Sidebar />
      <Submenu />
    </header>
  );
}

export default Header;
