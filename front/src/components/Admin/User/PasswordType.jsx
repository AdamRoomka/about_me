import React from "react";
import { useState } from "react";
import { findUserAndUpdatePassword } from "../../../api/lib/UsersApi";

function PasswordType({ setRender, render, closeSetPass, userId }) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");

  const saveChanges = async (e) => {
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
    let data = {
      password: password,
    };
    if (user === "") {
      window.location.assign("/signup");
    }
    if (password === passwordConfirm) {
      findUserAndUpdatePassword(user, userId, data);
      setRender(!render);
    } else {
      console.log("err");
    }
  };
  return (
    <>
      <form className="page" onSubmit={saveChanges}>
        <div className="field field_v1">
          <label htmlFor="name" className="ha-screen-reader">
            Password
          </label>
          <input
          type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="field__input"
            placeholder="Type password"
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Password</span>
          </span>
        </div>
        <div className="field field_v2">
          <label htmlFor="category" className="ha-screen-reader">
            Confirm Password
          </label>
          <input
          type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            className="field__input"
            placeholder="Confirm password"
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Confirm Password</span>
          </span>
        </div>
        <input type="submit" value="Create" />
        <input type="button" value="Close" onClick={closeSetPass} />
      </form>
    </>
  );
}

export default PasswordType;
