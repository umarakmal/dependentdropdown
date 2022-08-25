import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Footer from "../../Footer";
import Header from "../../Header";
import Menu from "../../Menu";
import { ToastContainer, toast } from "react-toastify";

const AddState = () => {
  const history = useHistory();
  const [getStates, setStates] = useState({
    regionId: "",
    state: "",
  });

  //For State
  const setdata1 = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setStates((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  //To add a new State
  const addState = async (e) => {
    e.preventDefault();

    const { state, regionId } = getStates;

    const res2 = await fetch(`/api/states`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        state,
        regionId,
      }),
    });

    const data = await res2.json();
    console.log(data);

    if (res2.status === 422 || !data) {
      toast.error("Error Occured");
    } else {
      history.push("/states");
      toast.success("User added successfully");
    }
  };

  //Binding Region with state
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  useEffect(() => {
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
    getdata();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />

      <div className="container">
        <center>
          <h2>Add State</h2>
        </center>
        <center>
          <form className="mt-4">
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="exampleInputName1">State</label>
                <input
                  style={{ width: "50%" }}
                  type="text"
                  value={getStates.state}
                  onChange={setdata1}
                  name="state"
                  className="form-control"
                  id="exampleInputName1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleForm1">Region</label>
                <select
                  style={{ width: "50%" }}
                  name="regionId"
                  // value={inpval.role}
                  onChange={setdata1}
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
                onClick={addState}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </center>

        <hr></hr>
      </div>
      <Footer />
    </>
  );
};
export default AddState;
