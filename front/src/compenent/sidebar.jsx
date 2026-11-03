import { LayoutDashboard, BookOpen, Calendar, Settings } from "lucide-react";
import { useState } from "react";

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
  const [activeItem, setActiveItem] = useState("Home");

  const items = [
    { text: "Home", icon: <LayoutDashboard size={20} /> },
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
          gap: 6px;
          width: 220px;
          min-height: 100vh;
          padding: 16px;
          background: #fffdf9;
          border-right: 1px solid #e6dccd;
          font-family: "Segoe UI", Arial, sans-serif;
          color: #3b332b;
          box-sizing: border-box;
        }
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #7a6e62;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s, color 0.2s;
        }
        .sidebar-item:hover { background: #f5efe6; }
        .sidebar-item.active {
          background: #b08968;
          color: #ffffff;
        }
      `}</style>

      <aside className="sidebar">
        {items.map((item) => (
          <SidebarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            active={activeItem === item.text}
            onClick={() => setActiveItem(item.text)}
          />
        ))}
      </aside>
    </>
  );
}

export default Sidebar;