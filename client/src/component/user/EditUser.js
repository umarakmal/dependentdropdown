import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const EditUser = () => {
  const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const history = useHistory("");

  const [inpval, setINP] = useState({
    name: "",
    employeeid: "",
    email: "",
    role: "",
    password: "",
  });

  //To join Address dependent dropdown
  const [getRegions, setRegions] = useState([]);
  const [getStates, setStates] = useState([]);
  const [regionId, setRegionid] = useState("");
  const [stateId, setStateid] = useState("");
  const [city, setCity] = useState([]);
  const [getcityid, setCityid] = useState([]);

  //To fetch all Regions
  const getData = async (e) => {
    const res = await fetch("/api/getall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setRegions(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRegion = (e) => {
    const getregionid = e.target.value;
    console.log(getregionid);
    setRegionid(getregionid);
  };

  //To fetch states according to country
  useEffect(() => {
    const getstate = async () => {
      const res = await fetch(`/api/getstate/${regionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setStates(await data);
    };
    getstate();
  }, [regionId]);

  const handleState = (e) => {
    const getstateid = e.target.value;
    console.log(getstateid);
    setStateid(getstateid);
  };

  const handleCity = (e) => {
    const getcityid = e.target.value;
    setCityid(getcityid);
  };
  //To fetch city according to states
  useEffect(() => {
    const getcity = async () => {
      const rescity = await fetch(`/api/getcity/${stateId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await rescity.json();
      setCity(await data);
    };
    getcity();
  }, [stateId]);

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/api/user/${id}`, {
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
      setINP(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, employeeid, email, role, password } = inpval;
    const region = regionId;
    const state = stateId;
    const city = getcityid;
    const res2 = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        employeeid,
        email,
        role,
        region,
        state,
        city,
        password,
      }),
    });

    const data = await res2.json();
    console.log(data);

    if (res2.status === 422 || !data) {
      alert("fill the data");
      toast.error("Error Occured");
    } else {
      history.push("/users");
      toast.success("User updated successfully");
    }
  };

  const [currentRolesssss, setCurrentRolesssss] = useState([]);
  useEffect(() => {
    axios.get(`/api/role/findall`).then((response) => {
      setCurrentRolesssss(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <NavLink to="/users">User Management</NavLink>
      <div className="container">
        <form className="mt-4">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12 form-group">
              <label htmlFor="exampleInputName">Name</label>
              <input
                type="text"
                value={inpval.name}
                onChange={setdata}
                name="name"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 form-group">
              <label htmlFor="exampleInputEmp">Employee ID</label>
              <input
                type="text"
                value={inpval.employeeid}
                onChange={setdata}
                name="employeeid"
                className="form-control"
                id="exampleInputEmp"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12 form-group">
              <label htmlFor="exampleInputEmail">Email</label>
              <input
                type="email"
                value={inpval.email}
                onChange={setdata}
                name="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="col-md-4 col-sm-12 col-xs-12 form-group">
              <label htmlFor="exampleFormControlSelect1">Role</label>
              <select
                name="role"
                value={inpval.role._id}
                onChange={setdata}
                className="form-control"
                id="exampleFormControlSelect1"
                aria-label=".form-select-lg example"
              >
                <option defaultValue="">Select</option>

                {currentRolesssss.map((rol) => (
                  <option key={rol._id} value={rol._id}>
                    {rol.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12 form-group">
              <label htmlFor="exampleInputPass">Password</label>
              <input
                type="password"
                // value={inpval.password}
                onChange={setdata}
                name="password"
                className="form-control"
                id="exampleInputPass"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 form-group">
              <label htmlFor="inputState">Region</label>
              <select
                id="inputState"
                name="region"
                // value={inpval.region._id ?? ""}
                onChange={(e) => handleRegion(e)}
                className="form-control"
              >
                <option defaultValue="">Select</option>
                {getRegions.map((element) => (
                  <option key={element._id} value={element._id} defaultValue="">
                    {element.region}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12 form-group">
              <label htmlFor="inputState1">States</label>
              <select
                id="inputState1"
                name="state"
                // value={inpval.state._id ?? ""}
                onChange={(e) => handleState(e)}
                className="form-control"
              >
                <option defaultValue="">Select</option>
                {getStates.map((element) => (
                  <option key={element._id} value={element._id} defaultValue="">
                    {element.state}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 form-group">
              <label htmlFor="inputState2">City</label>
              <select
                id="inputState2"
                name="city"
                // value={inpval.city._id ?? ""}
                onChange={(e) => handleCity(e)}
                className="form-control"
              >
                <option defaultValue="">Select</option>
                {city.map((element) => (
                  <option key={element._id} value={element._id} defaultValue="">
                    {element.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            onClick={updateuser}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditUser;
