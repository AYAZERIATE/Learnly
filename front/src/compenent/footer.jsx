function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px 48px;
          padding: 24px 32px;
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
          flex-direction: column;
          gap: 4px;
          margin: 0;
        }
        .footer .footer-brand {
          font-size: 16px;
          font-weight: 600;
          color: #5c4f3f;
          letter-spacing: 0.01em;
        }
        .footer .Information,
        .footer .Helpful,
        .footer .Contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer h4 {
          margin: 0 0 4px;
          font-size: 13px;
          font-weight: 600;
          color: #5c4f3f;
        }
        .footer .Information p,
        .footer .Helpful p,
        .footer .Contact p {
          margin: 0;
          color: #8a7f72;
          cursor: pointer;
          transition: color 0.15s ease;
        }
        .footer .Information p:hover,
        .footer .Helpful p:hover {
          color: #866c37;
        }
        .footer .Contact p { cursor: default; }
        @media (max-width: 600px) {
          .footer { padding: 20px; text-align: center; justify-content: center; }
          .footer .footer-copy { align-items: center; }
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