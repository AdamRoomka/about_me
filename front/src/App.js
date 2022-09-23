import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import My_abilities from "./components/My_abilities";
import My_CV from "./components/My_CV";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import Admin from "./components/Admin/Admin";
import Categories from "./components/Admin/Categories";
import History from "./components/Admin/History";
import Users from "./components/Admin/Users";
import about_me from './JSON/about_me.json';
import "./App.css";

function App() {

  const [ currentUser, setcurrentUser ] = useState([]);
  const [ render, setRender ] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} setcurrentUser={setcurrentUser} render={render} setRender={setRender} />} />
        <Route path="/my_abilities" element={<My_abilities render={render} setRender={setRender} currentUser={currentUser} setcurrentUser={setcurrentUser} />} />
        <Route path="/my_cv" element={about_me.map(about => (<My_CV key={about} about={about} setRender={setRender} currentUser={currentUser} setcurrentUser={setcurrentUser} />))} />
        <Route path="/login" element={<Login render={render} setRender={setRender} />} />
        <Route path="/signup" element={<Register render={render} setRender={setRender} />} />
        <Route path="/admin" element={<Admin currentUser={currentUser} setcurrentUser={setcurrentUser} setRender={setRender} />} />
        <Route path="/admin/categories" element={<Categories currentUser={currentUser} setcurrentUser={setcurrentUser} />} />
        <Route path="/admin/history" element={<History currentUser={currentUser} setcurrentUser={setcurrentUser} />} />
        <Route path="/admin/users" element={<Users currentUser={currentUser} setcurrentUser={setcurrentUser} setRender={setRender} render={render} />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
