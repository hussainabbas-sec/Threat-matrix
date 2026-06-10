import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FrontPage from "./pages/FrontPage";
import Explore from "./pages/Explore"; // 🔥 ADD

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("front");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");

    if (pageParam === "signup") setPage("signup");
    else if (pageParam === "forgot") setPage("forgot");
    else if (pageParam === "reset") setPage("reset");
    else if (pageParam === "login") setPage("login");
    else if (pageParam === "dashboard") setPage("dashboard");
    else if (pageParam === "explore") setPage("explore");
    else setPage("front"); // 🔥 FINAL FIX

    if (token) {
      setIsLoggedIn(true);
      setPage("dashboard");
    }

    window.onpopstate = (e) => {
      if (e.state?.page) {
        setPage(e.state.page);
      }
    };
  }, []);

  const navigate = (newPage) => {
    window.history.pushState({ page: newPage }, "", `?page=${newPage}`);
    setPage(newPage);
  };

  if (isLoggedIn && page === "dashboard") return <Dashboard />;
  if (page === "signup") return <Signup />;
  if (page === "forgot") return <ForgotPassword />;
  if (page === "reset") return <ResetPassword />;

  if (page === "login") {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem("token", "true");
          setIsLoggedIn(true);
          navigate("dashboard");
        }}
      />
    );
  }

  if (page === "explore") {
    return <Explore navigate={navigate} />; // 🔥 ADD
  }

  if (page === "front") {
    return <FrontPage navigate={navigate} />;
  }

  return null;
}

export default App;