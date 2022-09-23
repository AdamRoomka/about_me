import React from "react";
import { useForm } from "react-hook-form";
import { doLogin } from "../../api/lib/UsersApi";
import { Link } from 'react-router-dom';
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
    <Link to="/">Go back</Link>
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
            required: "Hasło obowiązkowe",
            minLength: {
              value: 7,
              message: "Hasło musi zawierać co najmniej 7 symbol",
            },
            maxLength: {
              value: 50,
              message: "Nie więcej niż 50 symbolów",
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
