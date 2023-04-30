import pageLogo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={pageLogo} alt="Логотип Место" />
    </header>
  );
}
