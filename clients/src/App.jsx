import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { userContext } from "./context/AuthContext";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";

const App = () => {
  const { user } = useContext(userContext);
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/signup" element={user && user ? <Home /> : <Signup />} />
        <Route path="/login" element={user && user ? <Home /> : <Login />} />
        <Route path="/createblog" element={<CreateBlog />} />
        {/* <Route path="/profile" element={<Profile />}>
          <Route path=":userId" element={<Profile />} />
        </Route> */}
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
