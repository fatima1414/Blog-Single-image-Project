import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BlogApp from "./pages/BlogApp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected blog page */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<BlogApp />} />
      </Route>
    </Routes>
  );
}

export default App;
