import React from "react";

const Navbar = ({ title, icon }) => {
  return (
    <nav className="navbar bg-primary text-white">
      <h1>
        <i className={icon} /> {title}
      </h1>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Survey Wizard",
  icon: "fas fa-poll-h",
};

export default Navbar;
