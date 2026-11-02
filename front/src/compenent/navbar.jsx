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
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px 24px;
          background: #fffdf9;
          border-bottom: 1px solid #e6dccd;
          box-shadow: 0 4px 16px rgba(120, 100, 70, 0.08);
          font-family: "Segoe UI", Arial, sans-serif;
          color: #3b332b;
          box-sizing: border-box;
        }
        .navbar .search {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          max-width: 400px;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e0d5c4;
          border-radius: 8px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .navbar .search:focus-within {
          border-color: #b08968;
          box-shadow: 0 0 0 3px rgba(176, 137, 104, 0.2);
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
        .navbar .actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .navbar .notification,
        .navbar .messages {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          background: #ffffff;
          border: 1px solid #e0d5c4;
          border-radius: 8px;
          color: #3b332b;
          cursor: pointer;
          transition: background 0.2s;
        }
        .navbar .notification:hover,
        .navbar .messages:hover { background: #f5efe6; }
        .navbar .badge {
          position: absolute;
          top: -6px;
          right: -6px;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          background: #a14a3b;
          color: #ffffff;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 500;
          line-height: 18px;
          text-align: center;
          box-sizing: border-box;
        }
      `}</style>

      <div className="navbar">
        <div className="search">
          <Search size={26} />
          <input
            type="text"
            placeholder="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="actions">
          <button className="notification" aria-label="Notifications">
            <Bell size={26} />
            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
          </button>
          <button className="messages" aria-label="Messages">
            <MessageSquare size={26} />
            {messageCount > 0 && <span className="badge">{messageCount}</span>}
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;