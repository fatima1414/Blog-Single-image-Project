import React from "react";
import { useForm } from "react-hook-form";
import Api from "../Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function Add(data) {
    try {
      const res = await Api.post("/user/login", data); // your existing API
      if (res.data.success) {
        alert(res.data.message);
        navigate("/"); // go to blog page after login
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Login failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit(Add)}>
              <input
                {...register("u_email")}
                className="form-control mb-3"
                placeholder="Enter email"
              />
              <input
                {...register("u_password")}
                type="password"
                className="form-control mb-3"
                placeholder="Enter password"
              />
              <button className="btn btn-success w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
