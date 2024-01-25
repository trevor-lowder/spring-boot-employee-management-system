import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <div className="mx-5">Employee Management System</div>
        </a>
      </nav>
    </header>
  );
};

export default Header;
