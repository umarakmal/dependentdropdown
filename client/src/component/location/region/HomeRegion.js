import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../../css/home.css";
import Header from "../../Header";
import Menu from "../../Menu";
import Footer from "../../Footer";
import { toast, ToastContainer } from "react-toastify";

const HomeRegion = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const getdata = async () => {
    const res = await fetch("/api/getall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/api/region/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("Region deleted");
      toast.success("Deleted Successfully!");
      getdata();
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <h1 style={{ textAlign: "center" }}>Region Management</h1>
      <div className="mt-5">
        <div className="container ">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/addregion" className="btn btn-primary">
              Add data
            </NavLink>
          </div>

          <table className="table">
            <thead className="thead-dark">
              <tr style={{ color: "black" }} className="table table-dark">
                <th scope="col">#</th>
                <th scope="col">Region</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr key={id}>
                      <th scope="row">{id + 1}</th>
                      <td>{element.region}</td>
                      <td className="d-flex ">
                        <NavLink to={`edit/region/${element._id}`}>
                          {" "}
                          <button className="btn btn-primary">
                            <i className="nav-icon fas fa-edit" />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element._id)}
                        >
                          <i className="nav-icon fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeRegion;
