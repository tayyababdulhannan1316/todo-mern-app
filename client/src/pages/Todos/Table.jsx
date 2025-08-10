import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, Space, Spin, Popconfirm, Card } from "antd";


function Index() {
  const [loading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
 
  const URL = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${URL}/readTodos`)
      .then((res) => {
        setDocuments(res.data);
        setFilteredDocuments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching todos", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setFilteredDocuments(
      documents.filter((doc) =>
        doc.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleEdit = (todo) => {
    axios
      .post(`${URL}/updateTodo`, todo)
      .then((res) => {
        setDocuments((prev) =>
          prev.map((t) => (t._id === todo._id ? res.data : t))
        );
      })
      .catch((err) => {
        console.error("Error editing todo", err);
      });
  };

  const handleDelete = (todo) => {
    axios
      .post(`${URL}/deleteTodo`, todo)
      .then(() => {
        setDocuments((prev) => prev.filter((t) => t._id !== todo._id));
        setFilteredDocuments((prev) => prev.filter((t) => t._id !== todo._id));
      })
      .catch((err) => {
        console.error("Error deleting todo", err);
      });
  };

const columns = [
  {
    title: "#",
    render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
  },
  { title: "Title", dataIndex: "title" },
  { title: "Location", dataIndex: "location" },
  { title: "Description", dataIndex: "description" },
  {
    title: "Action",
    render: (_, record) => (
      <Space>
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => handleDelete(record)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todos</h1>
      <Input.Search
        placeholder="Search todos by title..."
        allowClear
        onSearch={handleSearch}
        className="todo-search"
      />
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "2rem auto" }} />
      ) : (
        <Card className="todo-card">
      <Table
          className="todo-table"
          dataSource={filteredDocuments}
          columns={columns}
          rowKey="_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
            />

        </Card>
      )}
    </div>
  );
}

export default Index;
