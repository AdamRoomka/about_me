import React from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { createUser } from "../../api/lib/UsersApi";
import { Link } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "./auth.css";

function Registracja() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    createUser(data)
      .then((res) => {
        swal({
          text: "Registration successful, now you can log in",
          icon: "success",
          button: "ok",
          timer: 2000,
        });
        document.cookie = `c_user=${res.data.token}`;
        window.location.assign("/");
      }, 1000)
      .catch((error) => {
        swal({
          text: "This user already exists",
          icon: "error",
          button: "ok",
          timer: 5000,
        });
      });
    reset();
  }
  let password = watch("password");

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
        </ul>
      </nav>
      <form id="msform" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <h2 className="fs-title">CREATE YOUR PROFILE</h2>
          <br />

          <div className="text-danger fw-light m-2">
            {errors.name?.type === "pattern" &&
              "There may be additional characters"}
            {errors.name?.type === "required" &&
              "You have not entered your username"}
            {errors.name?.type === "minLength" &&
              "There must be at least 2 symbols"}
            {errors.name?.type === "maxLength" &&
              "Username must be entered in up to 30 symbols"}
          </div>

          <input
            type="text"
            name="name"
            placeholder="Username"
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 30,
              pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]*$/i,
            })}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />

          <div className="text-danger fw-light m-2">
            {errors?.password?.type === "required" && "Password is obligatory"}
            {errors?.password?.type === "minLength" &&
              "Password must contain at least 7 symbols"}
            {errors?.password?.type === "maxLength" &&
              "No more than 50 symbols"}
          </div>

          <input
            type="password"
            name="pass"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 7,
              maxLength: 50,
            })}
          />

          <div className="text-danger fw-light m-2">
            {errors.passwordRepeat?.type === "required" &&
              "Password is obligatory"}
            {errors.passwordRepeat?.type === "passwordMatch" &&
              "The password must match"}
          </div>

          <input
            type="password"
            name="cpass"
            placeholder="Confirm Password"
            {...register("passwordRepeat", {
              required: true,
              validate: { passwordMatch: (value) => value === password },
            })}
          />

          <input
            type="submit"
            name="next"
            className="next action-button"
            value="Register"
          />
          <Link to="/Login" className="ms-4">
            Log in
          </Link>
        </fieldset>
      </form>
    </>
  );
}

export default Registracja;
