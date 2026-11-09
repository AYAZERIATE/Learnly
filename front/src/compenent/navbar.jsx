import {
  Search,
  Bell,
  MessageSquare,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  // Items that used to live in the sidebar (Messages stays in the actions area)
  const items = [
    { text: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { text: "Course", icon: <BookOpen size={20} /> },
    { text: "Schedule", icon: <Calendar size={20} /> },
    { text: "Settings", icon: <Settings size={20} /> },
  ];

  const isActive = (text) =>
    pathname.toLowerCase() === `/${text.toLowerCase()}` ||
    (text === "Dashboard" && pathname === "/");

  const handleLogout = () => {
    // Clear the saved session (adjust the key if your login stores it differently)
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

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
          background: #ffffff;
          border-bottom: 1px solid #ebe3d5;
          box-shadow: 0 1px 3px rgba(120, 100, 70, 0.06);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
          color: #3b332b;
          -webkit-font-smoothing: antialiased;
          box-sizing: border-box;
        }
        .navbar .search {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          max-width: 360px;
          height: 40px;
          padding: 0 14px;
          background: #faf7f1;
          border: 1px solid #e0d5c4;
          border-radius: 8px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .navbar .search:focus-within {
          border-color: #b08968;
          box-shadow: 0 0 0 3px rgba(176, 137, 104, 0.18);
        }
        .navbar .search svg { color: #9a8d7d; flex-shrink: 0; }
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

        /* ===== Navigation links (moved from the sidebar) ===== */
        .navbar .nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          flex: 1;
        }
        .navbar .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 40px;
          padding: 0 14px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: #7a6e62;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s;
        }
        .navbar .nav-item svg { flex-shrink: 0; }
        .navbar .nav-item:hover {
          background: #f5efe6;
          color: #3b332b;
        }
        .navbar .nav-item:focus-visible {
          outline: 2px solid #b08968;
          outline-offset: 2px;
        }
        .navbar .nav-item.active {
          background: #f5efe6;
          color: #866c37;
          font-weight: 600;
        }

        .navbar .actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .navbar .notification,
        .navbar .messages,
        .navbar .logout {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: #7a6e62;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .navbar .notification:hover,
        .navbar .messages:hover,
        .navbar .logout:hover {
          background: #f5efe6;
          color: #3b332b;
        }
        .navbar .messages.active {
          background: #f5efe6;
          color: #866c37;
        }
        .navbar .notification:focus-visible,
        .navbar .messages:focus-visible,
        .navbar .logout:focus-visible {
          outline: 2px solid #b08968;
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
          border: 2px solid #ffffff;
          border-radius: 9px;
          font-size: 10px;
          font-weight: 600;
          line-height: 14px;
          text-align: center;
          box-sizing: border-box;
        }

        /* Tablet: icons only */
        @media (max-width: 900px) {
          .navbar .nav-item { padding: 0 11px; }
          .navbar .nav-item span { display: none; }
        }

        /* Mobile: navigation moves to a bottom bar */
        @media (max-width: 600px) {
          .navbar { padding: 0 14px; }
          .navbar .nav-links {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            justify-content: space-around;
            height: 60px;
            padding: 8px;
            background: #ffffff;
            border-top: 1px solid #ebe3d5;
            box-shadow: 0 -1px 3px rgba(120, 100, 70, 0.06);
            box-sizing: border-box;
          }
          .navbar .nav-item { flex: 1; justify-content: center; height: 44px; }
        }
      `}</style>

      <div className="navbar">
        <div className="search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          {items.map((item) => (
            <button
              key={item.text}
              type="button"
              className={`nav-item ${isActive(item.text) ? "active" : ""}`}
              title={item.text}
              aria-current={isActive(item.text) ? "page" : undefined}
              onClick={() => navigate(`/${item.text}`)}
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          ))}
        </nav>

        <div className="actions">
          <button className="notification" aria-label="Notifications">
            <Bell size={20} />
            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
          </button>
          <button
            className={`messages ${isActive("Messages") ? "active" : ""}`}
            aria-label="Messages"
            aria-current={isActive("Messages") ? "page" : undefined}
            onClick={() => navigate("/Messages")}
          >
            <MessageSquare size={20} />
            {messageCount > 0 && <span className="badge">{messageCount}</span>}
          </button>
          <button
            className="logout"
            type="button"
            title="Log out"
            aria-label="Log out"
            onClick={handleLogout}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;