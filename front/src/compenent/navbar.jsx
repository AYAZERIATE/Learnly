import { Search, Bell, MessageSquare } from "lucide-react";
import { useState } from "react";

// theme: "brown" (default) | "charcoal" | "beige"
function Navbar({ theme = "brown" }) {
  const [searchValue, setSearchValue] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  return (
    <>
      <style>{`
        .navbar,
        .navbar[data-theme="brown"] {
          --nv-bg-top: #94793f;
          --nv-bg-bottom: #7a6130;
          --nv-border: rgba(0, 0, 0, 0.18);
          --nv-text: #ffffff;
          --nv-hover: rgba(255, 255, 255, 0.16);
          --nv-badge-ring: #7a6130;
          --nv-shadow: rgba(60, 45, 20, 0.28);
        }
        .navbar[data-theme="charcoal"] {
          --nv-bg-top: #33363b;
          --nv-bg-bottom: #2b2d31;
          --nv-border: rgba(0, 0, 0, 0.35);
          --nv-text: #f3f4f6;
          --nv-hover: rgba(255, 255, 255, 0.1);
          --nv-badge-ring: #2b2d31;
          --nv-shadow: rgba(0, 0, 0, 0.35);
        }
        .navbar[data-theme="beige"] {
          --nv-bg-top: #fbf6ec;
          --nv-bg-bottom: #efe6d6;
          --nv-border: #e0d5c4;
          --nv-text: #4a3f33;
          --nv-hover: rgba(134, 108, 55, 0.12);
          --nv-badge-ring: #efe6d6;
          --nv-shadow: rgba(120, 100, 70, 0.16);
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          height: 64px;
          padding: 0 24px;
          background: linear-gradient(180deg, var(--nv-bg-top), var(--nv-bg-bottom));
          border-bottom: 1px solid var(--nv-border);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            0 4px 14px var(--nv-shadow);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
          color: var(--nv-text);
          -webkit-font-smoothing: antialiased;
          box-sizing: border-box;
        }
        .navbar .search {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          max-width: 420px;
          height: 40px;
          padding: 0 14px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid transparent;
          border-radius: 10px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .navbar .search:focus-within {
          border-color: #e6dccd;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.28);
        }
        .navbar .search svg { color: #7a6e62; flex-shrink: 0; }
        .navbar .search input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: 14px;
          color: #3b332b;
        }
        .navbar .search input::placeholder { color: #9a8d7d; }
        .navbar .actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .navbar .notification,
        .navbar .messages {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: var(--nv-text);
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .navbar .notification:hover,
        .navbar .messages:hover {
          background: var(--nv-hover);
          transform: translateY(-1px);
        }
        .navbar .notification:focus-visible,
        .navbar .messages:focus-visible {
          outline: 2px solid var(--nv-text);
          outline-offset: 2px;
        }
        .navbar .badge {
          position: absolute;
          top: 3px;
          right: 3px;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          background: #a14a3b;
          color: #ffffff;
          border: 2px solid var(--nv-badge-ring);
          border-radius: 9px;
          font-size: 10px;
          font-weight: 600;
          line-height: 14px;
          text-align: center;
          box-sizing: border-box;
        }
        @media (max-width: 600px) {
          .navbar { padding: 0 14px; }
        }
      `}</style>

      <div className="navbar" data-theme={theme}>
        <div className="search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="actions">
          <button className="notification" aria-label="Notifications">
            <Bell size={20} />
            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
          </button>
          <button className="messages" aria-label="Messages">
            <MessageSquare size={20} />
            {messageCount > 0 && <span className="badge">{messageCount}</span>}
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;