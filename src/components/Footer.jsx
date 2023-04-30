
export default function Footer() {
  const currentYear = new Date();
  return (
    <footer className="footer">
      <p className="footer__copyright">© {currentYear.getFullYear()} Калинин Кирилл</p>
    </footer>
  );
}
