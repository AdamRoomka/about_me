import React from "react";
import { useEffect } from "react";
import { decodeToken } from "../../api/lib/UsersApi";
import { Link } from "react-router-dom";

function Categories({ currentUser, setcurrentUser, setRender }) {
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
                <Link className="none" to="/admin/categories">
                  Categories
                </Link>
              </li>
              <li>
                <Link className="none" to="/admin/history">
                  History
                </Link>
              </li>
              <li>
                <Link className="none" to="/admin/users">
                  Users
                </Link>
              </li>
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
        </div>
      )}
      <div className="d-flex justify-content-center">
        <h2>Categories not ended!</h2>
      </div>
    </>
  );
}

export default Categories;
