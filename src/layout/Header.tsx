import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { DarkModeButton } from "../components/DarkModeButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { searchActions } from "../store/searchSlice";
import { ModalActions } from "../store/modalSlice";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();

  const HeaderNavLink = ({
    to,
    children,
    onClick,
  }: {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <Link
      to={to}
      className="text-lg hover:text-green-700 dark:hover:text-green-400"
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <div>
      <Navbar fluid className="bg-green-200 shadow-md dark:bg-slate-700">
        <NavbarBrand className="flex items-center gap-2">
          <HeaderNavLink to="/home">
            <span className="text-xl font-bold whitespace-nowrap hover:text-green-700 dark:hover:text-green-400">
              My Business Cards
            </span>
          </HeaderNavLink>
        </NavbarBrand>

        <NavbarCollapse className="font-semibold max-md:order-2">
          <div className="flex items-center gap-6 max-md:flex-col">
            <div className="flex items-center gap-6 max-md:flex-col">
              {isAuthenticated && user && (
                <>
                  <HeaderNavLink to="/favorites">Favorites</HeaderNavLink>
                  {user.isBusiness && (
                    <HeaderNavLink to="/my-cards">My Cards</HeaderNavLink>
                  )}
                </>
              )}

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

            <div className="flex items-center gap-6 max-md:flex-col">
              {!isAuthenticated ? (
                <>
                  <HeaderNavLink to="/login">Sign In</HeaderNavLink>
                  <HeaderNavLink to="/register">Register</HeaderNavLink>
                </>
              ) : (
                <>
                  <HeaderNavLink to="/profile">Profile</HeaderNavLink>
                  <HeaderNavLink
                    to="#"
                    onClick={() => dispatch(ModalActions.openModal())}
                  >
                    Logout
                  </HeaderNavLink>
                </>
              )}

              <HeaderNavLink to="/about">About</HeaderNavLink>
            </div>
          </div>
        </NavbarCollapse>

        <div className="flex items-center gap-2">
          <DarkModeButton />
          <NavbarToggle />
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
