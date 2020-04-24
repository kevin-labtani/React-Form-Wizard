import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation();
  return (
    <nav className="container">
      <ul className="steps">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Step 1</Link>
        </li>
        <li className={location.pathname === "/step2" ? "active" : ""}>
          <Link to="/step2">Step 2</Link>
        </li>
        <li className={location.pathname === "/result" ? "active" : ""}>
          <Link to="/result">Result</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
