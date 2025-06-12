import { Footer, FooterLinkGroup } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MyFooter = () => {
  const { user, isAuthenticated } = useAuth();

  const FooterNavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <Link to={to} className="hover:text-green-700 dark:hover:text-green-400">
      {children}
    </Link>
  );

  return (
    <Footer container className="mt-5 bg-green-200 py-5 dark:bg-slate-800">
      <div className="w-full">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} My Business Cards™ by Yossi Tuchband
          </span>

          <FooterLinkGroup className="flex flex-wrap justify-center gap-4 font-semibold sm:gap-10">
            <FooterNavLink to="/home">Home</FooterNavLink>
            {isAuthenticated && user && (
              <>
                <FooterNavLink to="/favorites">Favorites</FooterNavLink>
                {user.isBusiness && (
                  <FooterNavLink to="/my-cards">My Cards</FooterNavLink>
                )}
              </>
            )}
            <FooterNavLink to="/about">About</FooterNavLink>
          </FooterLinkGroup>
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;
