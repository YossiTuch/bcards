import { Route, Routes } from "react-router-dom";
// import Footer from "./layout/Footer";
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
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import LogoutModal from "./components/LogoutModal";

function App() {
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

        {/* Footer */}
        <Footer container>
          <FooterCopyright by="Yossi Tuchband" />
          <FooterLinkGroup>
            <FooterLink href="/about">About</FooterLink>
          </FooterLinkGroup>
        </Footer>
      </div>
    </>
  );
}
export default App;
