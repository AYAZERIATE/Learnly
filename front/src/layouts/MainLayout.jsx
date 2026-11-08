import { Outlet } from "react-router-dom";
import Navbar from "../compenent/navbar";
import Sidebar from "../compenent/sidebar";
import Footer from "../compenent/footer";

function MainLayout() {
    return (
        <>
            <style>{`
                html, body, #root { margin: 0; min-height: 100%; }
                *, *::before, *::after { box-sizing: border-box; }

                .app-layout {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                .app-body {
                    display: flex;
                    flex: 1;
                    align-items: flex-start;
                }
                .main-content {
                    flex: 1;
                    min-width: 0;
                    padding: 32px 24px;
                }

                @media (max-width: 600px) {
                    .main-content { padding: 24px 16px 84px; }
                }
            `}</style>

            <div className="app-layout">
                <Navbar />
                <div className="app-body">
                    <Sidebar />
                    <main className="main-content">
                        <Outlet />
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default MainLayout;