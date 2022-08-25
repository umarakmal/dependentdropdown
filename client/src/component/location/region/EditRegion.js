import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Footer from "../../Footer";
import Header from "../../Header";
import Menu from "../../Menu";

const EditRegion = () => {
  const history = useHistory("");

  const [inpval, setINP] = useState({
    region: "",
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
    const res = await fetch(`/api/region/${id}`, {
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

    const { region } = inpval;

    const res2 = await fetch(`/api/region/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      history.push("/region");
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <NavLink to="/region">Region Management</NavLink>
        <form className="mt-4">
          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="exampleForm1">Region</label>
              <input
                style={{ width: "50%" }}
                type="text"
                value={inpval.region}
                onChange={setdata}
                name="region"
                className="form-control"
                id="exampleForm1"
                aria-describedby="emailHelp"
              />
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

export default EditRegion;
