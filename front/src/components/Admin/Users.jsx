import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllUsers,
  findUserAndDelete,
  decodeToken,
} from "../../api/lib/UsersApi";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import CurrentUser from "./User/CurrentUser";
import PasswordType from "./User/PasswordType";

function Users({ setcurrentUser, currentUser, setRender, render }) {
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);
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
    if (user !== "") {
      decodeToken(user).then((res) => {
        if (res.data.results === "fail") {
          document.cookie = `c_user=`;
          window.location.assign("/");
        } else {
          setcurrentUser(res.data.results);
        }
      });
    }
    getAllUsers(user).then((res) => {
      setAllUsers(res.data.data.Users);
    });
  }, [render]);

  function deleteUser(e, userId) {
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
    findUserAndDelete(user, userId);
    setRender(!render);
  }
  function changePassword(e, userId) {
    setOpen(true);
    setId(userId);
  }
  function close() {
    setOpen(false);
  }
  return (
    <>
      {currentUser && currentUser.role !== "admin" ? (
        <>
          <h1>Error</h1>
          <h1>
            <Link to="/"> Go Back</Link>
          </h1>
        </>
      ) : (
        <>
          {currentUser && currentUser.role !== "admin" ? (
            <>
              <h1>Error</h1>
              <h1>
                <Link to="/"> Go Back</Link>
              </h1>
            </>
          ) : (
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
                          <Link
                            className="none p-3 fs-5"
                            to="/admin/categories"
                          >
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
                </ul>
                <div className="text-end">
                  <Link className="none p-3 fs-5" to="/admin/categories">
                    Categories
                  </Link>
                  <Link className="none p-3 fs-5" to="/admin/history">
                    History
                  </Link>
                  <Link className="none p-3 fs-5" to="/admin/users">
                    Users
                  </Link>
                </div>
              </nav>
            </div>
          )}
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Set</th>
              </tr>
              {allUsers.map((user) => (
                <CurrentUser
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  currentUser={currentUser}
                  changePassword={changePassword}
                  deleteUser={deleteUser}
                />
              ))}
            </tbody>
          </table>
          {open && (
            <PasswordType
              userId={id}
              setRender={setRender}
              render={render}
              closeSetPass={close}
            />
          )}
        </>
      )}
    </>
  );
}

export default Users;
