import React from "react";
import { useEffect, useState } from "react";
import {
  getAllUserItems,
  createUserItems,
  findItemAndUpdate,
  findItemAndDelete,
} from "../api/lib/UsersApi";
import { Link } from "react-router-dom";
import Table from "./my_abilities/Table";
import CreateItems from "./my_abilities/CreateItems";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "./css/table.css";
import EditTable from "./my_abilities/EditTable";

function My_abilities({ render, setRender, currentUser }) {
  const [currentItems, setcurrentItems] = useState([]);
  const [editId, setEditId] = useState([]);
  const [open, setOpen] = useState(false);
  var number = 1;

  useEffect(() => {
    var user = null;
    if (typeof window !== "undefined") {
      user = getCookie("c_user");
      function getCookie(c_user) {
        let user = c_user + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === " ") {
            c = c.substring(1);
          }
          if (c.indexOf(user) === 0) {
            return c.substring(user.length, c.length);
          }
        }
        return "";
      }
    }
    getAllUserItems(user).then((res) => {
      setcurrentItems(res.data.data.items);
    });
  }, [render]);

  function create() {
    setOpen(true);
  }
  function close() {
    setOpen(false);
  }
  function deleteItems(e, subId) {
    e.preventDefault();
    let user = getCookie("c_user");
    function getCookie(c_user) {
      let user = c_user + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(user) === 0) {
          return c.substring(user.length, c.length);
        }
      }
      return "";
    }
    findItemAndDelete(user, subId);
    setRender(!render);
  }
  function editItems(e, subId) {
    e.preventDefault();
    setEditId(subId);
  }
  const submitEdit = async (subId, data) => {
    let user = getCookie("c_user");
    function getCookie(c_user) {
      let user = c_user + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(user) === 0) {
          return c.substring(user.length, c.length);
        }
      }
      return "";
    }
    findItemAndUpdate(user, subId, data);
    setRender(!render);
    setEditId();
  };
  function cancelEdit() {
    setEditId("");
  }
  function logOut() {
    document.cookie = `c_user=`;
    window.location("/");
    setRender(true);
  }

  return (
    <div>
      <nav className="menu p-4">
        <ul className="d-flex justify-content-end fs-4">
          <li>
            <Link className="none" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="none" to="/my_abilities">
              My abilities
            </Link>
          </li>
          <li>
            <Link className="none" to="/my_cv">
              My CV
            </Link>
          </li>
          {currentUser.role === "admin" ? (
            <li>
              <Dropdown as={ButtonGroup}>
                <Link to="/admin" className="none me-1 my-0 pb-2">
                  Admin
                </Link>
                <Dropdown.Toggle
                  split
                  variant="none"
                  className="none me-3 pb-2"
                />
                <Dropdown.Menu>
                  <Link className="none p-3 fs-5" to="/admin/categories">
                    Categories
                  </Link>
                  <Link className="none p-3 fs-5" to="/admin/history">
                    History
                  </Link>
                  <Link className="none p-3 fs-5" to="/admin/users">
                    Users
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            ""
          )}
          {currentUser.role === undefined ? (
            <>
              <li>
                <Link className="none" to="/signup">
                  Register
                </Link>
              </li>
              <li>
                <Link className="none" to="/login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="none" onClick={logOut}>
                  Log Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Data</th>
            <th>
              <button onClick={create}>Create</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((items) =>
            editId === items._id ? (
              <EditTable
                key={items._id}
                number={number++}
                subId={items._id}
                defaultData={items}
                category={items.category}
                date={items.date}
                name={items.name}
                onCancel={cancelEdit}
                onSubmit={submitEdit}
              />
            ) : (
              <Table
                key={items._id}
                subId={items._id}
                number={number++}
                category={items.category}
                date={items.date}
                name={items.name}
                deleteItems={deleteItems}
                editItems={editItems}
              />
            )
          )}
        </tbody>
      </table>
      {open && (
        <CreateItems
          close={close}
          createUserItems={createUserItems}
          render={render}
          setRender={setRender}
        />
      )}
    </div>
  );
}

export default My_abilities;
