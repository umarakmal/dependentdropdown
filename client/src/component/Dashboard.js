import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Dashboard = () => {
  return (
    <div>
      <ToastContainer />
      <div className="content-wrapper">
        <div className="card mt-5">
          <center>
            <h1>Manage Location</h1>
          </center>
          <div style={{ marginLeft: "30%" }} className="row card-body mt-4">
            <div className="content-header">
              <div className="container-fluid">
                <div className="add_btn mt-2 mb-2">
                  <NavLink to="/region" className="btn btn-primary">
                    Add/Edit Region
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="content-header">
              <div className="container-fluid">
                <div className="add_btn mt-2 mb-2">
                  <NavLink to="/states" className="btn btn-primary">
                    Add/Edit State
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="content-header">
              <div className="container-fluid">
                <div className="add_btn mt-2 mb-2">
                  <NavLink to="/cities" className="btn btn-primary">
                    Add/Edit City
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
