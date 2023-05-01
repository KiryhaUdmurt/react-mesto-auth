import { NavLink, useLocation } from "react-router-dom";
import pageLogo from "../images/logo.svg";

export default function Header({isLoggedIn}) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={pageLogo} alt="Логотип Место" />
      {!isLoggedIn && (
        <nav>
          {location.pathname === "/sign-up" && (
            <NavLink className="header__navlink" to="/sign-in">
              Войти
            </NavLink>
          )}
          {location.pathname === "/sign-in" && (
            <NavLink className="header__navlink" to="/sign-up">
              Зарегистрироваться
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}
