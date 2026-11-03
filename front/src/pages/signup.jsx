
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SignupUser } from "../services/auth";

function Signup() {
    const navigate = useNavigate();

    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Role, setRole] = useState("Student");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (Password !== ConfirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (Password.length < 6) {
            setError("Password must contain at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const result = await SignupUser({
                FullName,
                email: Email,
                password: Password
            });

            if (!result.success) {
                setError(result.message);
                return;
            }

            navigate("/login");

        } catch (error) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <h1>Create an account</h1>

            <p className="subtitle">
                Access your lessons, and keep following them in one place
            </p>

            <div className="auth-card">
                <form onSubmit={handleSubmit}>

                    <label>Full Name:</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={FullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

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

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <label>Role:</label>
                    <select
                        value={Role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Student">Student</option>
                        <option value="Professor">Professor</option>
                    </select>

                    {Error && <p className="error">{Error}</p>}

                    <button type="submit" disabled={Loading}>
                        {Loading ? "Loading..." : "Sign up"}
                    </button>

                    <button
                        type="button"
                        className="google-button"
                        disabled
                    >
                        Google
                    </button>

                    <p className="auth-link">
                        Already have an account?
                        {" "}
                        <Link to="/login">Login</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Signup;
