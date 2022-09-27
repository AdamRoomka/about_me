import React from "react";
import { useEffect } from "react";
import { decodeToken } from "../api/lib/UsersApi";
import { Link } from "react-router-dom";
import laptop from "./IMG/laptop.jpg";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "./css/main.css";
import "./css/bootstrap.css";
import "./css/nav.css";

//App
function Home({ currentUser, setcurrentUser, render, setRender }) {
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
  }, [render]);

  function logOut() {
    document.cookie = `c_user=; path=/;`;
    window.location("/");
    setRender(true);
  }

  return (
    <>
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

      <div className="container-fluid p-5 pt-4">
        <div className="row">
          <div className="col-6 p-0">
            <img src={laptop} alt="laptop" className="main_img" />
          </div>

          <div className="col-6 bg-color-orange text-light d-flex align-items-center">
            <div className="px-4">
              <h3 className="fs-1">
                Hello{" "}
                {currentUser.role === undefined ? <></> : currentUser.name}
              </h3>
              <p className="fs-4">
                On this page it shows my skills in react node.js programming,
                it's not 100% done, but it will be ready soon! You can register
                now, or if you have an account, log in, after that enter (my
                abilities).
              </p>
              <button className="btn btn-light fw-bold">LEARN MORE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
