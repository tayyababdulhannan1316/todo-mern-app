import React, { useEffect, useState } from "react";
import axios from "axios";

function Index() {
  const [loading , setIsLoading] = useState(true);
  const [documents , setDocuments] = useState([]);
  const URL = "http://localhost:8000"
  
    useEffect(() => {
      // This effect runs only once when the component mounts
      axios.get(`${URL}/readTodos`) 
        .then((res) => {
          // console.log("Todos fetched successfully", res.data);
          setDocuments(res.data); // Store fetched todos in state
        })
        .catch((err) => {
          console.error("Error fetching todos", err);
        }) 
        .finally(() => {
          setIsLoading(false); // Set loading to false after fetching
        });      
    },[])
  
    const handleEdit = (todo) => {
      // Logic to handle editing a todo
      console.log("Edit todo", todo);
        axios.post(`${URL}/updateTodo`, todo)
            .then((res) => {
              console.log("res", res);
              setDocuments((prev) => prev.map(t => t._id === todo._id ? res.data : t)); // Update the todo in state
            })
            .catch((err) => {
              console.error("Error adding todo", err);
            });
    }
    const handleDelete = (todo) => {
      // Logic to handle deleting a todo
      console.log("Delete todo", todo);
      axios.post(`${URL}/deleteTodo`, todo)
        .then((res) => {
          console.log("res", res);
          setDocuments((prev) => prev.filter(t => t._id !== todo._id)); // Remove the todo from state
        })
        .catch((err) => {
          console.error("Error deleting todo", err);
        });
    }
  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <h1 className="text-center mb-0"> Todos</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {!loading
            ? 
            <table className="table-primary table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Location</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {/* Map through documents to display todos */}
    {documents.map((todo, index) => {
      return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{todo.title}</td>
        <td>{todo.location}</td>
        <td>{todo.description}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(todo)}>Delete</button>
          <button className="btn btn-primary btn-sm ms-2" onClick={()=>handleEdit(todo)}>Edit</button>
      </td>
      </tr>)
    })}    
  </tbody>
</table>
:<div className="d-flex justify-content-center align-items-center"><span className="spinner spinner-border"></span></div>
            }

          </div>
        </div>
          
      </div>
    </div>
  );
}

export default Index;
