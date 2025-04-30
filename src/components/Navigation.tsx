import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

const Navigation: FunctionComponent = () => {
  return (
    <nav>
      <ul>
        <li className="bg-gray-100 p-3 rounded mb-2">
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li className="bg-gray-100 p-3 rounded mb-2">
          <NavLink to="/favorites">
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
