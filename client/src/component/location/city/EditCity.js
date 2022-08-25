import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Footer from "../../Footer";
import Header from "../../Header";
import Menu from "../../Menu";

const EditCity = () => {
  const history = useHistory("");

  const [inpval, setINP] = useState({
    city: "",
    state: "",
  });

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
    const res = await fetch(`/api/cities/${id}`, {
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
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { city, stateId } = inpval;

    const res2 = await fetch(`/api/cities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city,
        stateId,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      history.push("/cities");
    }
  };

  //Binding State with City
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  useEffect(() => {
    const getdata = async () => {
      const res = await fetch("/api/stateall", {
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
    getdata();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <NavLink to="/cities">City Management</NavLink>
        <form className="mt-4">
          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="exampleForm1">City</label>
              <input
                style={{ width: "50%" }}
                type="text"
                value={inpval.city}
                onChange={setdata}
                name="city"
                className="form-control"
                id="exampleForm1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleForm1">State</label>
              <select
                style={{ width: "50%" }}
                name="stateId"
                value={inpval.state._id ?? ""}
                onChange={setdata}
                className="form-control"
                id="exampleForm1"
                aria-label=".form-select-lg example"
              >
                <option selected>Select</option>

                {getuserdata.map((element) => (
                  <option key={element._id} value={element._id}>
                    {element.state}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              onClick={updateuser}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditCity;
