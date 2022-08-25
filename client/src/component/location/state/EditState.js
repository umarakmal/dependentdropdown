import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Footer from "../../Footer";
import Header from "../../Header";
import Menu from "../../Menu";

const EditState = () => {
  const history = useHistory("");

  const [inpval, setINP] = useState({
    state: "",
    regionId: "",
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
    const res = await fetch(`/api/states/${id}`, {
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

    const { state, regionId } = inpval;

    const res2 = await fetch(`/api/states/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state,
        regionId,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      history.push("/states");
    }
  };

  //Binding Region with state
  const [getuserdata, setUserdata] = useState([]);

  useEffect(() => {
    const getdata = async () => {
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
        setUserdata(data);
        console.log("get data");
      }
    };
    getdata();
  }, []);
  console.log(inpval.regionId._id);
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <NavLink to="/states">State Management</NavLink>
        <form className="mt-4">
          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="exampleForm1">State</label>
              <input
                style={{ width: "50%" }}
                type="text"
                value={inpval.state}
                onChange={setdata}
                name="state"
                className="form-control"
                id="exampleForm1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleForm1">Region</label>
              <select
                style={{ width: "50%" }}
                name="regionId"
                value={inpval.regionId._id ?? ""}
                onChange={setdata}
                className="form-control"
                id="exampleForm1"
                aria-label=".form-select-lg example"
              >
                <option selected>Select</option>

                {getuserdata.map((element) => (
                  <option key={element._id} value={element._id}>
                    {element.region}
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

export default EditState;
