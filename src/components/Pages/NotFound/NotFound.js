import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found-page section">
      <div className="not-found-container">
        <h1>oops! it's a dead end :(</h1>
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
