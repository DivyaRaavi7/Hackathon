import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AddBusiness from "./pages/AddBusiness";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
    const role = localStorage.getItem("role");
    const isLoggedIn = Boolean(role);
    const location = useLocation(); // ✅ Track the current route

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    // ✅ Conditionally render Navbar only if NOT on /login or /register
    const hideNavbarRoutes = ["/login", "/register"];

    return (
        <>
            {!hideNavbarRoutes.includes(location.pathname) && (
                <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            )}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Role-based Protected Routes */}
                <Route
                    path="/services"
                    element={role === "user" ? <ServicesPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/add-business"
                    element={role === "businessOwner" ? <AddBusiness /> : <Navigate to="/login" />}
                />
            </Routes>
        </>
    );
}

export default App;
