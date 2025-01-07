import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <Link to="/">10 Man Stats</Link>
        </li>
        <li>
          <Link to="/tdm">TDM Stats</Link>
        </li>
        <li>
          <Link to="/recent_matches">Recent Matches</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
