import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Card, Form } from "antd";


const { TextArea } = Input;

const initialState = {
  title: "",
  location: "",
  description: "",
};

function Add() {
  const [state, setState] = useState(initialState);
  const URL = "http://localhost:8000";

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    let { title, location, description } = state;
    title = title.trim();
    location = location.trim();
    description = description.trim();

    if (!title || !location || !description) {
      alert("Please fill all fields");
      return;
    }

    const todo = { title, location, description };

    axios
      .post(`${URL}/createTodo`, todo)
      .then(() => {
        setState(initialState);
      })
      .catch((err) => {
        console.error("Error adding todo", err);
      });
  };

  return (
    <div className="todo-container">
      <Card title="Add Todo" className="todo-card" style={{ maxWidth: 600, margin: "0 auto" }}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Title">
            <Input
              name="title"
              value={state.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </Form.Item>
          <Form.Item label="Location">
            <Input
              name="location"
              value={state.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              rows={4}
              name="description"
              value={state.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Todo
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Add;
