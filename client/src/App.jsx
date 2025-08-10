import React from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.scss";
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css'; // Ant Design styles



import Todos  from "./pages/Todos";
function App() {
  return (
   
     <Todos />
   
  );
}

export default App;
