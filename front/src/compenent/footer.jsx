import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 16px 24px;
          background: #fffdf9;
          border-top: 1px solid #e6dccd;
          font-family: "Segoe UI", Arial, sans-serif;
          font-size: 14px;
          color: #7a6e62;
          box-sizing: border-box;
        }
        .footer .footer-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .footer a {
          color: #9c7656;
          font-weight: 500;
          text-decoration: none;
        }
        .footer a:hover { text-decoration: underline; }
      `}</style>

      <footer className="footer">
        <p style={{ margin: 0 }}>© {year} Learny. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;