import { Search, Bell, MessageSquare } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  return (
    <>
      <style>{`
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
          background: #866c37;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          box-shadow: 0 2px 8px rgba(60, 45, 20, 0.15);
          font-family: "Segoe UI", Arial, sans-serif;
          color: #ffffff;
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
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid transparent;
          border-radius: 10px;
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
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s;
        }
        .navbar .notification:hover,
        .navbar .messages:hover { background: rgba(255, 255, 255, 0.16); }
        .navbar .notification:focus-visible,
        .navbar .messages:focus-visible {
          outline: 2px solid #ffffff;
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
          border: 2px solid #866c37;
          border-radius: 9px;
          font-size: 10px;
          font-weight: 600;
          line-height: 14px;
          text-align: center;
          box-sizing: border-box;
        }
      `}</style>

      <div className="navbar">
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