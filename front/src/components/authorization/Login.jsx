import React from "react";
import { useForm } from "react-hook-form";
import { doLogin } from "../../api/lib/UsersApi";
import { Link } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import swal from "sweetalert";
import "./auth.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    doLogin(data)
      .then((res) => {
        swal({
          text: "Login successfully!",
          icon: "success",
          button: "Next",
          timer: 5000,
        });
        if (res.status === 200) {
          setTimeout(() => {
            document.cookie = `c_user=${res.data.token}`;
            window.location.assign("/");
          }, 1000);
        }
      })
      .catch((error) => {
        swal({
          text: "The contact details are incorrect, please try again!",
          icon: "error",
          button: "Ok",
          timer: 2000,
        });
      });
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
          <h2 className="fs-title">Log in</h2>
          <br />
          <input
            type="email"
            className="home-input"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "email is obligatory",
              maxLength: {
                value: 30,
                message: "No more than 50 symbols",
              },
            })}
          />
          <div className="error text-danger fw-light m-2">
            {errors.login?.message}
          </div>
          <input
            className="home-input"
            type="password"
            name="password"
            placeholder="password"
            {...register("password", {
              required: "Has??o obowi??zkowe",
              minLength: {
                value: 7,
                message: "Has??o musi zawiera?? co najmniej 7 symbol",
              },
              maxLength: {
                value: 50,
                message: "Nie wi??cej ni?? 50 symbol??w",
              },
            })}
          />
          <div className="error text-danger fw-light m-2">
            {errors.password?.message}
          </div>
          <button
            type="submit"
            name="next"
            className="next action-button"
            value="Next"
          >
            Log in
          </button>
          <Link to="/signup" name="next" className="ms-4" value="Next">
            Register
          </Link>
        </fieldset>
      </form>
    </>
  );
}

export default Login;
