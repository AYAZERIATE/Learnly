import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return <p>Signing you in...</p>;
}

export default GoogleCallback;