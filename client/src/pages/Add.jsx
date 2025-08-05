import React, { useEffect, useState } from "react";
import axios from "axios";
const initialState = {
  title: "",
  location: "",
  description: "",
};

function Add() {
  const [state, setState] = useState(initialState);
  const URL = "http://localhost:8000"
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    let {title, location, description} = state;
    title = title.trim();
    location = location.trim();
    description = description.trim();
    if (!title || !location || !description) {
      alert("Please fill all fields");
      return;
    }
    let todo = {title,location,description,
      /* status: "active", // Assuming status is a required field
      // // You can set default values for createdAt and updatedAt
      // createdAt: new Date().toISOString(),
      // updatedAt: new Date().toISOString()*/
    };


    
    axios.post(`${URL}/createTodo`, todo)
      .then((res) => {
        console.log("res", res);
        setState(initialState); // Reset the form after submission
      })
      .catch((err) => {
        console.error("Error adding todo", err);
      });
  };
  return (
    <div className="py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <h1 className="text-center mb-0"> Add Todo</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            className="card p-3 p-md-4 "
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  name="location"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12  mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-12 col-md-6 offset-md-3 ">
                <button type="submit" className="btn btn-primary w-100">
                  Add Todo
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
