import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../Api";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    Api.get("/user/checkAuth")
      .then(res => setAuth(res.data.success))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <h4>Loading...</h4>;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
