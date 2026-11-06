import { Outlet } from "react-router-dom";
import Navbar from "../compenent/navbar";
import Sidebar from "../compenent/sidebar";
import Footer from "../compenent/footer";

function MainLayout() {
    return (
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
    );
}

export default MainLayout;