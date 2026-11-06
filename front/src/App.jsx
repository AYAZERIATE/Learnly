import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard';
import Settings from './pages/Settings';
import Schedule from './pages/Schedule';
import Course from './pages/Course';
import MainLayout from './layouts/MainLayout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<MainLayout />}>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Schedule" element={<Schedule />} />
                    <Route path="/Course" element={<Course />} />
                    <Route path="/Settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;