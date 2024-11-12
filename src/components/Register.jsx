import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./Provider/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  // access data by useContext
  const { createUser } = useContext(authContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    console.log(email, password, name);

    // create user
    createUser(email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message, "user Error");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered"
                required
              />
            </div>
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
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Registration</button>
            </div>
          </form>
          <p className="text-center p-6 mb-8">
            Already Have An Account?{" "}
            <Link to="/login">
              <span className="text-primary font-bold">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
