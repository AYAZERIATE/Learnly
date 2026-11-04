import { Sidebar } from "lucide-react";

function MainLayout (){


    return(
        <div>
           <div className="App-layout" >
            <Navbar />
            <div className="app-body">
                <Sidebar />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
            <Footer />
           </div>
        </div>
    )
}export default MainLayout;