function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer {
          display: grid;
          grid-template-columns: 1.4fr repeat(3, 1fr);
          gap: 32px;
          padding: 36px 32px 32px;
          background: #ffffff;
          border-top: 1px solid #ebe3d5;
          box-shadow: 0 -1px 3px rgba(120, 100, 70, 0.06);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #7a6e62;
          -webkit-font-smoothing: antialiased;
          box-sizing: border-box;
        }
        .footer .footer-copy {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 0;
        }
        .footer .footer-brand {
          font-size: 20px;
          font-weight: 700;
          color: #3b332b;
        }
        .footer .Information,
        .footer .Helpful,
        .footer .Contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer h4 {
          margin: 0 0 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebe3d5;
          width: fit-content;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #3b332b;
        }
        .footer p { margin: 0; }
        .footer .Information p,
        .footer .Helpful p {
          width: fit-content;
          cursor: pointer;
          transition: color 0.2s;
        }
        .footer .Information p:hover,
        .footer .Helpful p:hover {
          color: #866c37;
        }

        @media (max-width: 900px) {
          .footer { grid-template-columns: 1fr 1fr; }
          .footer .footer-copy { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .footer { grid-template-columns: 1fr; padding: 28px 20px 84px; text-align: center; }
          .footer .footer-copy { align-items: center; }
          .footer .Information,
          .footer .Helpful,
          .footer .Contact { align-items: center; }
        }
      `}</style>

      <footer className="footer">
        <p className="footer-copy">
          <span className="footer-brand">Learnly</span>
          <span>© {year}. All rights reserved.</span>
        </p>
        <div className="Information">
          <h4>Information</h4>
          <p>About Us</p>
          <p>Blog</p>
          <p>Events</p>
          <p>More Search</p>
        </div>
        <div className="Helpful">
          <h4>Helpful Links</h4>
          <p>Services</p>
          <p>Supports</p>
          <p>Privacy Policy</p>
        </div>
        <div className="Contact">
          <h4>Contact Us</h4>
          <p>learnly.com</p>
          <p>065757575</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;