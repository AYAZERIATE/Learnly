
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth";

function Login() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await loginUser(Email, Password);

            if (!result.success) {
                setError(result.message);
                return;
            }

            navigate("/dashboard");

        } catch (error) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <h1>Welcome back to Learnly</h1>

            <div className="auth-card">

                <form onSubmit={handleSubmit}>

                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {Error && <p className="error">{Error}</p>}

                    <button type="submit" disabled={Loading}>
                        {Loading ? "Loading..." : "Login"}
                    </button>

                    <button
                        type="button"
                        className="google-button"
                        disabled
                    >
                        Google
                    </button>

                    <p className="auth-link">
                        Don't have an account?
                        {" "}
                        <Link to="/signup">Sign Up</Link>
                    </p>

                </form>

            </div>
        </div>
    );
}

export default Login;
