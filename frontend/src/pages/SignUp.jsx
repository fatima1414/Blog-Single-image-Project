import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Api from "../Api";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  async function addData(data) {
    try {
      const res = await Api.post("/user/signUp", data); // your existing API
      alert(res.data.message || "Signup successful!");
      reset();
      navigate("/login"); // go to login after signup
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Sign Up</h3>
            <form onSubmit={handleSubmit(addData)}>
          
              <input
                {...register("u_email")}
                className="form-control mb-2"
                placeholder="Email"
              />
              <input
                {...register("u_mobile")}
                className="form-control mb-2"
                placeholder="Mobile"
              />
              <input
                {...register("u_password")}
                type="password"
                className="form-control mb-2"
                placeholder="Password"
              />
              <button className="btn btn-primary w-100">Sign Up</button>
            </form>
            <p className="text-center mt-2">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
