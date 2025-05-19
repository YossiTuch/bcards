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
import { useDispatch, useSelector } from "react-redux";
import type { TRootState } from "../store/store";
import { IoSearchSharp } from "react-icons/io5";
import { searchActions } from "../store/searchSlice";
import { ModalActions } from "../store/modalSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <div className="sticky top-0 z-50">
      <Navbar fluid className="bg-green-200 dark:bg-slate-800">
        <NavbarBrand as={Link} to="/home">
          <span className="text-xl font-bold whitespace-nowrap">
            My Business Cards
          </span>
        </NavbarBrand>
        <NavbarCollapse className="font-semibold max-md:order-2 max-md:text-center">
          <div className="flex gap-10 max-md:flex-col max-md:gap-0">
            {user && (
              <NavbarLink className="text-xl" as={Link} to="/favorites">
                Favorites
              </NavbarLink>
            )}
            {user && user.isBusiness && (
              <NavbarLink as={Link} to="/my-cards" className="text-xl">
                My Cards
              </NavbarLink>
            )}

            <TextInput
              onChange={(e) =>
                dispatch(searchActions.setSearchWord(e.target.value))
              }
              rightIcon={IoSearchSharp}
            />
            {/* <SearchBar /> */}
            {!user && (
              <>
                <NavbarLink className="text-xl" as={Link} to="/login">
                  Sign In
                </NavbarLink>
                <NavbarLink className="text-xl" as={Link} to="/register">
                  Register
                </NavbarLink>
              </>
            )}
            {user && (
              <>
                <NavbarLink className="text-xl" as={Link} to="/profile">
                  Profile
                </NavbarLink>
                <NavbarLink
                  className="text-xl"
                  as={Link}
                  onClick={() => dispatch(ModalActions.openModal())}
                >
                  Logout
                </NavbarLink>
              </>
            )}
            <NavbarLink as={Link} to="/about" className="text-xl">
              About
            </NavbarLink>
          </div>
        </NavbarCollapse>

        <DarkThemeToggle />
        <NavbarToggle />
      </Navbar>
    </div>
  );
};
export default Header;
