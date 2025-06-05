import {
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { searchActions } from "../store/searchSlice";
import { ModalActions } from "../store/modalSlice";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="sticky top-0 z-50">
      <Navbar fluid className="bg-green-200 shadow-md dark:bg-slate-700">
        {/* Logo Section */}
        <NavbarBrand as={Link} to="/home" className="flex items-center gap-2">
          <span className="text-xl font-bold whitespace-nowrap hover:text-green-700 dark:hover:text-green-400">
            My Business Cards
          </span>
        </NavbarBrand>

        {/* Main Navigation */}
        <NavbarCollapse className="font-semibold max-md:order-2">
          <div className="flex items-center gap-6 max-md:flex-col">
            {/* User Navigation Links */}
            <div className="flex items-center gap-6 max-md:flex-col">
              {isAuthenticated && user && (
                <>
                  <NavbarLink
                    className="text-lg hover:text-green-700 dark:hover:text-green-400"
                    as={Link}
                    to="/favorites"
                  >
                    Favorites
                  </NavbarLink>
                  {user.isBusiness && (
                    <NavbarLink
                      as={Link}
                      to="/my-cards"
                      className="text-lg hover:text-green-700 dark:hover:text-green-400"
                    >
                      My Cards
                    </NavbarLink>
                  )}
                </>
              )}

              {/* Search Bar */}
              <div className="min-w-[200px]">
                <TextInput
                  onChange={(e) =>
                    dispatch(searchActions.setSearchWord(e.target.value))
                  }
                  rightIcon={IoSearchSharp}
                  placeholder="Search cards..."
                  className="max-w-md"
                />
              </div>
            </div>

            {/* Auth Links */}
            <div className="flex items-center gap-6 max-md:flex-col">
              {!isAuthenticated ? (
                <>
                  <NavbarLink
                    className="text-lg hover:text-green-700 dark:hover:text-green-400"
                    as={Link}
                    to="/login"
                  >
                    Sign In
                  </NavbarLink>
                  <NavbarLink
                    className="text-lg hover:text-green-700 dark:hover:text-green-400"
                    as={Link}
                    to="/register"
                  >
                    Register
                  </NavbarLink>
                </>
              ) : (
                <>
                  <NavbarLink
                    className="text-lg hover:text-green-700 dark:hover:text-green-400"
                    as={Link}
                    to="/profile"
                  >
                    Profile
                  </NavbarLink>
                  <NavbarLink
                    className="text-lg hover:text-green-700 dark:hover:text-green-400"
                    as={Link}
                    onClick={() => dispatch(ModalActions.openModal())}
                  >
                    Logout
                  </NavbarLink>
                </>
              )}

              <NavbarLink
                as={Link}
                to="/about"
                className="text-lg hover:text-green-700 dark:hover:text-green-400"
              >
                About
              </NavbarLink>
            </div>
          </div>
        </NavbarCollapse>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <DarkThemeToggle />
          <NavbarToggle />
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
