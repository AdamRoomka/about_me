import React from "react";
import { useState } from "react";
import "../css/label.css";

function CreateItems({ close, createUserItems, setRender, render }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const createItems = async (e) => {
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
      name: name,
      category: category,
      date: date,
    };
    if(user === ''){
      window.location.assign("/signup");
    }
    createUserItems(user, data);
    setRender(!render);
  };

  return (
    <>
      <form className="page" onSubmit={createItems}>
        <div className="field field_v1">
          <label htmlFor="name" className="ha-screen-reader">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="field__input"
            placeholder="Stanislaw"
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Name</span>
          </span>
        </div>
        <div className="field field_v2">
          <label htmlFor="category" className="ha-screen-reader">
            Category
          </label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            className="field__input"
            placeholder="Player"
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Category</span>
          </span>
        </div>
        <div className="field field_v3">
          <label htmlFor="data" className="ha-screen-reader">
            Data
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            id="data"
            className="field__input"
            placeholder="2022-02-21"
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Data</span>
          </span>
        </div>
        <input type="submit" value="Create" />
        <input type="button" value="Close" onClick={close} />
      </form>
    </>
  );
}

export default CreateItems;
