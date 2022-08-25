import React from "react";
import logo from "../images/logo3.png";
const Menu = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <img
            src={logo}
            alt="Logo"
            className="brand-image"
            style={{ opacity: ".9", maxHeight: "45px" }}
          />
          <span className="brand-text font-weight-light invisible">Cogent</span>
        </a>
        <div className="sidebar">
          <nav className="mt-5">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open mb-2">
                <a href="/admin" className="nav-link active">
                  <i
                    className="nav-icon fas fa-tachometer-alt"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>
                    Manage Location
                    {/* <i className="right fas fa-angle-left" /> */}
                  </p>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/role" className="nav-link">
                  <i
                    className="nav-icon fas fa-user"
                    style={{ color: "white" }}
                  ></i>
                  <p style={{ color: "white", fontWeight: "400" }}>
                    Manage Role
                  </p>
                </a>
              </li>
              <li className="nav-item  mb-2">
                <a href="/users" className="nav-link">
                  <i
                    className="nav-icon fas fa-user"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>Manage Users</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Menu;
