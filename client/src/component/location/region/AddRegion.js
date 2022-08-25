import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Footer from "../../Footer";
import Header from "../../Header";
import Menu from "../../Menu";
import { ToastContainer, toast } from "react-toastify";

const AddRegion = () => {
  const history = useHistory();
  const [getRegion, setRegion] = useState({
    region: "",
  });

  //For Region
  const setdata = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setRegion((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  //To add a New Region
  const addinpdata = async (e) => {
    e.preventDefault();

    const { region } = getRegion;

    const res = await fetch(`/api/inputform`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        region,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      toast.error("Error Occured");
    } else {
      history.push("/region");
      toast.success("Region added successfully");
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="container">
        <center>
          <h2>Add Region</h2>
        </center>
        <center>
          <form className="mt-4">
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="exampleInputName">Region</label>
                <input
                  style={{ width: "50%" }}
                  type="text"
                  value={getRegion.region}
                  onChange={setdata}
                  name="region"
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="emailHelp"
                />
              </div>

              <button
                type="submit"
                onClick={addinpdata}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </center>
      </div>
      <hr></hr>

      <Footer />
    </>
  );
};
export default AddRegion;
