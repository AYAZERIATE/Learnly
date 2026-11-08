import { LayoutDashboard, BookOpen, Calendar, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const items = [
    { text: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { text: "Course", icon: <BookOpen size={20} /> },
    { text: "Schedule", icon: <Calendar size={20} /> },
    { text: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 240px;
          flex-shrink: 0;
          min-height: 100vh;
          padding: 20px 12px;
          background: #fffdf9;
          border-right: 1px solid #e6dccd;
          font-family: "Segoe UI", Arial, sans-serif;
          color: #3b332b;
          box-sizing: border-box;
        }
        .sidebar-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          height: 42px;
          padding: 0 14px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: #7a6e62;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s, color 0.2s;
        }
        .sidebar-item svg { flex-shrink: 0; }
        .sidebar-item:hover {
          background: #f5efe6;
          color: #3b332b;
        }
        .sidebar-item:focus-visible {
          outline: 2px solid #b08968;
          outline-offset: 2px;
        }
        .sidebar-item.active {
          background: #f1e6d6;
          color: #866c37;
          font-weight: 600;
        }
        .sidebar-item.active::before {
          content: "";
          position: absolute;
          left: -12px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          background: #866c37;
          border-radius: 0 3px 3px 0;
        }
      `}</style>

      <aside className="sidebar">
        {items.map((item) => (
          <SidebarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            active={activeItem === item.text}
            onClick={() => {
              setActiveItem(item.text);
              navigate(`/${item.text}`);
            }}
          />
        ))}
      </aside>
    </>
  );
}

export default Sidebar;