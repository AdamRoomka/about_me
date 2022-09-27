import React from "react";
import { useEffect } from "react";
import { decodeToken } from "../../api/lib/UsersApi";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Admin({ currentUser, setcurrentUser, setRender }) {
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
  }, []);
  function logOut() {
    document.cookie = `c_user=`;
    window.location("/");
    setRender(true);
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
            </ul>
          </nav>
        </div>
      )}
      <div>
        <div className="container">
          <div className="row">
            <div className="col-3 border text-center p-3 m-2 rounded shadow">
              <h3>
                <Link className="hover_orange" to="/admin/categories">
                  Categories
                </Link>
              </h3>
            </div>
            <div className="col-3 border text-center p-3 m-2 rounded shadow">
              <h3>
                <Link className="hover_orange" to="/admin/history">
                  History
                </Link>
              </h3>
            </div>
            <div className="col-3 border text-center p-3 m-2 rounded shadow">
              <h3>
                <Link className="hover_orange" to="/admin/users">
                  Users
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
