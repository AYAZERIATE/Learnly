function Footer({ theme = "beige" }) {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer,
        .footer[data-theme="beige"] {
          --ft-bg-top: #f7f1e6;
          --ft-bg-bottom: #e9dfcd;
          --ft-border: #d9cdb7;
          --ft-text: #6f6354;
          --ft-strong: #3f352a;
          --ft-accent: #866c37;
          --ft-shadow: rgba(90, 70, 40, 0.18);
        }
        .footer[data-theme="sand"] {
          --ft-bg-top: #eadfca;
          --ft-bg-bottom: #d8c9ac;
          --ft-border: #c8b898;
          --ft-text: #5f5446;
          --ft-strong: #2f271e;
          --ft-accent: #6f592c;
          --ft-shadow: rgba(70, 50, 20, 0.25);
        }
        .footer[data-theme="light"] {
          --ft-bg-top: #fffdf9;
          --ft-bg-bottom: #f4eee3;
          --ft-border: #e6dccd;
          --ft-text: #8a7f72;
          --ft-strong: #5c4f3f;
          --ft-accent: #866c37;
          --ft-shadow: rgba(120, 100, 70, 0.14);
        }

        .footer {
          position: relative;
          display: grid;
          grid-template-columns: 1.4fr repeat(3, 1fr);
          gap: 32px;
          padding: 36px 32px 32px;
          background: linear-gradient(180deg, var(--ft-bg-top), var(--ft-bg-bottom));
          border-top: 1px solid var(--ft-border);
          /* effet 3D: lumière en haut + ombre qui monte */
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 -8px 24px var(--ft-shadow);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: var(--ft-text);
          -webkit-font-smoothing: antialiased;
          box-sizing: border-box;
        }
        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--ft-accent), transparent);
          opacity: 0.7;
        }
        .footer .footer-copy {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 0;
        }
        .footer .footer-brand {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: var(--ft-strong);
          /* texte en relief */
          text-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9),
            0 2px 4px var(--ft-shadow);
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
          border-bottom: 2px solid var(--ft-accent);
          width: fit-content;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ft-strong);
        }
        .footer p { margin: 0; }
        .footer .Information p,
        .footer .Helpful p {
          width: fit-content;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease, text-shadow 0.2s ease;
        }
        .footer .Information p:hover,
        .footer .Helpful p:hover {
          color: var(--ft-accent);
          transform: translateY(-2px);
          text-shadow: 0 3px 6px var(--ft-shadow);
        }

        @media (max-width: 900px) {
          .footer { grid-template-columns: 1fr 1fr; }
          .footer .footer-copy { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .footer { grid-template-columns: 1fr; padding: 28px 20px; text-align: center; }
          .footer .footer-copy { align-items: center; }
          .footer .Information,
          .footer .Helpful,
          .footer .Contact { align-items: center; }
        }
      `}</style>

      <footer className="footer" data-theme={theme}>
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