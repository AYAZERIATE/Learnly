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
          gap: 12px 24px;
          min-height: 60px;
          padding: 14px 32px;
          background: #faf7f2;
          border-top: 1px solid #ebe3d5;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
          font-size: 13px;
          line-height: 1.5;
          color: #8a7f72;
          -webkit-font-smoothing: antialiased;
          box-sizing: border-box;
        }
        .footer .footer-copy {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }
        .footer .footer-brand {
          font-weight: 600;
          color: #5c4f3f;
          letter-spacing: 0.01em;
        }
        .footer .footer-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .footer a {
          color: #8a7f72;
          font-weight: 400;
          text-decoration: none;
          text-underline-offset: 4px;
          transition: color 0.15s ease;
        }
        .footer a:hover {
          color: #5c4f3f;
          text-decoration: underline;
        }
        .footer a:focus-visible {
          outline: 2px solid #b08968;
          outline-offset: 3px;
          border-radius: 4px;
        }
        @media (max-width: 600px) {
          .footer { padding: 16px 20px; justify-content: center; text-align: center; }
        }
      `}</style>

      <footer className="footer">
        <p className="footer-copy">
          <span className="footer-brand">Learny</span>
          <span>© {year}. All rights reserved.</span>
        </p>
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