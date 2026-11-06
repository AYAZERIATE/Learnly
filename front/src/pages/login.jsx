import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, googleLogin } from "../services/auth";

function Login() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
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

            if (result.data?.access_token) {
                localStorage.setItem("token", result.data.access_token);
            }

            navigate("/dashboard");

        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <h1>Welcome back to Learny</h1>

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

                    {error && <p className="error">{error}</p>}

                    <button type="submit" disabled={Loading}>
                        {Loading ? "Loading..." : "Login"}
                    </button>

                    <button
                        type="button"
                        className="google-button"
                        onClick={googleLogin}
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