import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  MessageSquare,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
      title={text}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

// theme: "beige" (default) | "brown" | "charcoal"
function Sidebar({ theme = "beige" }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { text: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { text: "Course", icon: <BookOpen size={20} /> },
    { text: "Schedule", icon: <Calendar size={20} /> },
    { text: "Messages", icon: <MessageSquare size={20} /> },
    { text: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      <style>{`
        .sidebar,
        .sidebar[data-theme="beige"] {
          --sb-bg-top: #fbf6ec;
          --sb-bg-bottom: #efe6d6;
          --sb-border: #e0d5c4;
          --sb-text: #7a6e62;
          --sb-text-strong: #3b332b;
          --sb-hover: rgba(134, 108, 55, 0.1);
          --sb-active-bg: #ffffff;
          --sb-accent: #866c37;
          --sb-shadow: rgba(120, 100, 70, 0.16);
        }
        .sidebar[data-theme="brown"] {
          --sb-bg-top: #94793f;
          --sb-bg-bottom: #7a6130;
          --sb-border: rgba(0, 0, 0, 0.18);
          --sb-text: rgba(255, 255, 255, 0.75);
          --sb-text-strong: #ffffff;
          --sb-hover: rgba(255, 255, 255, 0.14);
          --sb-active-bg: rgba(255, 255, 255, 0.2);
          --sb-accent: #ffffff;
          --sb-shadow: rgba(60, 45, 20, 0.28);
        }
        .sidebar[data-theme="charcoal"] {
          --sb-bg-top: #33363b;
          --sb-bg-bottom: #2b2d31;
          --sb-border: rgba(0, 0, 0, 0.35);
          --sb-text: #a1a5ab;
          --sb-text-strong: #f3f4f6;
          --sb-hover: rgba(255, 255, 255, 0.08);
          --sb-active-bg: #404449;
          --sb-accent: #d6b98c;
          --sb-shadow: rgba(0, 0, 0, 0.35);
        }

        .sidebar {
          --sb-width: 240px;

          position: sticky;
          top: 64px;
          align-self: flex-start;
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: var(--sb-width);
          flex-shrink: 0;
          height: calc(100vh - 64px);
          padding: 20px 12px;
          overflow-y: auto;
          background: linear-gradient(180deg, var(--sb-bg-top), var(--sb-bg-bottom));
          border-right: 1px solid var(--sb-border);
          box-shadow:
            inset -1px 0 0 rgba(255, 255, 255, 0.15),
            4px 0 14px var(--sb-shadow);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
          color: var(--sb-text-strong);
          -webkit-font-smoothing: antialiased;
          box-sizing: border-box;
          transition: width 0.2s ease;
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
          color: var(--sb-text);
          cursor: pointer;
          text-align: left;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .sidebar-item svg { flex-shrink: 0; }
        .sidebar-item:hover {
          background: var(--sb-hover);
          color: var(--sb-text-strong);
          transform: translateX(2px);
        }
        .sidebar-item:focus-visible {
          outline: 2px solid var(--sb-accent);
          outline-offset: 2px;
        }
        .sidebar-item.active {
          background: var(--sb-active-bg);
          color: var(--sb-accent);
          font-weight: 600;
          box-shadow: 0 2px 8px var(--sb-shadow);
        }
        .sidebar-item.active::before {
          content: "";
          position: absolute;
          left: -12px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          background: var(--sb-accent);
          border-radius: 0 3px 3px 0;
        }

        /* Toggle: kayban f l'te7t */
        .sidebar-toggle {
          margin-top: auto;
          border-top: 1px solid var(--sb-border);
          border-radius: 0 0 10px 10px;
          height: 46px;
        }

        /* Sidebar msedda: icônes bohdhom */
        .sidebar.collapsed { --sb-width: 72px; padding: 20px 10px; }
        .sidebar.collapsed .sidebar-item { justify-content: center; padding: 0; }
        .sidebar.collapsed .sidebar-item span { display: none; }
        .sidebar.collapsed .sidebar-item.active::before { left: -10px; }

        /* Tablette: icônes bohdhom (toggle makaynch) */
        @media (max-width: 900px) {
          .sidebar { --sb-width: 72px; padding: 20px 10px; }
          .sidebar-item { justify-content: center; padding: 0; }
          .sidebar-item span { display: none; }
          .sidebar-toggle { display: none; }
        }

        /* Mobile: barre l t7t */
        @media (max-width: 600px) {
          .sidebar {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
            height: 60px;
            padding: 8px;
            overflow: visible;
            border-right: none;
            border-top: 1px solid var(--sb-border);
            box-shadow: 0 -4px 14px var(--sb-shadow);
          }
          .sidebar-item { width: auto; flex: 1; height: 44px; }
          .sidebar-item:hover { transform: none; }
          .sidebar-item.active::before {
            left: 20%;
            right: 20%;
            top: -9px;
            bottom: auto;
            width: auto;
            height: 3px;
            border-radius: 0 0 3px 3px;
          }
        }
      `}</style>

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""}`}
        data-theme={theme}
      >
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

        <button
          className="sidebar-item sidebar-toggle"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Open sidebar" : "Close sidebar"}
          aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          <span>Collapse</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;