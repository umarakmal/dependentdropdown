import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Footer from "../../Footer";
import Header from "../../Header";
import Menu from "../../Menu";
import { ToastContainer, toast } from "react-toastify";

const AddCity = () => {
  const history = useHistory();
  const [getCity, setCity] = useState({
    city: "",
    stateId: "",
  });

  //For City
  const setdata2 = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setCity((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  //To Add a new city
  const addCity = async (e) => {
    e.preventDefault();

    const { city, stateId } = getCity;

    const res3 = await fetch(`/api/cities`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        city,
        stateId,
      }),
    });

    const data = await res3.json();
    console.log(data);

    if (res3.status === 422 || !data) {
      toast.error("Error Occured");
    } else {
      history.push("/cities");
      toast.success("City added successfully");
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
      <ToastContainer />

      <div className="container">
        <div className="form-group">
          <center>
            <h2>Add City</h2>
          </center>
          <center>
            <form key={3} className="mt-4">
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="exampleInputName3">City</label>
                  <input
                    style={{ width: "50%" }}
                    type="text"
                    value={getCity.city}
                    onChange={setdata2}
                    name="city"
                    className="form-control"
                    id="exampleInputName3"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleForm3">State</label>
                  <select
                    style={{ width: "50%" }}
                    name="stateId"
                    // value={inpval.role}
                    onChange={setdata2}
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
                  onClick={addCity}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </center>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AddCity;
