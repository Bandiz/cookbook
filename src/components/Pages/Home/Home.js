import React from "react";
import { useGlobalContext } from "../../../context";
import "./Home.css";

function Home() {
  const { closeSubmenu } = useGlobalContext();
  return (
    <React.Fragment>
      <div className="home" onMouseOver={closeSubmenu}>
        Home
      </div>
    </React.Fragment>
  );
}

export default Home;
