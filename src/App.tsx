import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RouteGuard from "./components/RouteGuard";
import MyCards from "./pages/MyCards";
import Favorites from "./pages/Favorites";
import CardDetails from "./pages/CardDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { TToken } from "./types/TToken";
import MyFooter from "./layout/MyFooter";
import LogoutModal from "./components/LogoutModal";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check both storages for token
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (token) {
        try {
          const parsedToken = jwtDecode(token) as TToken;
          axios.defaults.headers.common["x-auth-token"] = token;

          const res = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
              parsedToken._id,
          );

          dispatch(userActions.login(res.data));
        } catch (error) {
          console.error("Token validation failed", error);
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          delete axios.defaults.headers.common["x-auth-token"];
          navigate("/login");
        }
      }
    };

    initializeAuth();
  }, [dispatch, navigate]);

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white">
        <Header />
        <LogoutModal />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route
            path="/profile"
            element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            }
          />
          <Route
            path="/my-cards"
            element={
              <RouteGuard>
                <MyCards />
              </RouteGuard>
            }
          />
          <Route
            path="/favorites"
            element={
              <RouteGuard>
                <Favorites />
              </RouteGuard>
            }
          />
          <Route path="/*" element={<Error />} />
        </Routes>

        <MyFooter />
      </div>
    </>
  );
}

export default App;
