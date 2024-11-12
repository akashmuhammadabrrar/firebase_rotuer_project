import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./Provider/AuthProvider";
import { Result } from "postcss";

const Login = () => {
  // login with email and password
  const { singInUser, signInWithGoogle } = useContext(authContext);
  const navigate = useNavigate();
  const handleWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  // login for create user
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    singInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log("email and password", error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p>
              <button onClick={handleWithGoogle} className="btn btn-accent">
                Google Sign In
              </button>
            </p>
          </form>
          <p className="text-center p-6 mb-8">
            New To This Website? Please{" "}
            <Link to="/registration">
              <span className="text-primary font-bold">Registration</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
