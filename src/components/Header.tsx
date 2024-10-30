import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import { AuthContextValues } from "~/types";
import { ProfileButton } from "./ProfileButton";
import { OrderButton } from "./OrderButton";
import { Button } from "./ui/button";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";

const productLinks = [
  "Hoodies",
  "Shirts",
  "Trousers",
  "Accessories",
  "Add_Item",
];

const Header = () => {
  const { isAuthed } = useAuth() as AuthContextValues;

  return (
    <nav className="flex justify-between items-center bg-warning py-6 px-5 fixed top-0 w-full z-50">
      <Link to="/" data-cy="headerlink_homepage">
        <img
          src="/src/images/logo.png"
          style={{ width: "140px", height: "70px" }}
        />
      </Link>
      <ul className="flex">
        {productLinks.map((link) => (
          <HoverCard>
            <HoverCardTrigger asChild>
              <li
                className="text-dark uppercase mx-3 fw-bold fst-italic fs-4"
                key={link}
              >
                <Link to={`/${link}`} data-cy={`headerlink_${link}_page`}>
                  {link}
                </Link>
              </li>
            </HoverCardTrigger>
          </HoverCard>
        ))}
      </ul>
      <ul className="flex text-decoration-solid text-secondary">
        {isAuthed ? (
          <li className="nav-item my-2 mx-sm-3 my-sm-0">
            <div className="fs-4 mr-4">
              <ProfileButton data-cy="profileButton" />
            </div>
          </li>
        ) : (
          <li className="mx-3">
            <Link
              className="fs-4 mr-4"
              to="/login"
              data-cy="headerlink_loginpage"
            >
              <Button className="bg-dark text-warning uppercase rounded">
                {"Login"}
              </Button>
            </Link>
          </li>
        )}
        <li className="mx-3">
          <OrderButton />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
