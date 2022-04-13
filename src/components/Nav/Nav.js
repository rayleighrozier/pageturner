import React from "react";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="nav">
      <div className="nav-pageturner">
        <a href="/">pageturner</a>
      </div>
      <div className="nav-links">
        <a href="/">Shelves</a>
        <a href="/">Current</a>
        <a href="/">Search</a>
        <a href="/">Sign Out</a>
      </div>
    </div>
  );
}
