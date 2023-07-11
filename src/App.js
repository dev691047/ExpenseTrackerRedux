import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Authentication/Signup";
import { Home } from "./pages/Home";
import Login from "./pages/Authentication/Login";
import UpdateProfile from "./pages/UpdateProfile";
import ResetPassword from "./pages/Authentication/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
