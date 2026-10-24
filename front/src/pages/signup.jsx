import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupUser } from "./auth"; // adjust the path

function Signup() {
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Role, setRole] = useState("Student");
    const [Error, setError] = useState("");
    const [Loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (Password !== ConfirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = SignupUser({ FullName, email: Email, password: Password, role: Role });
        if (!result.success) {
            setError(result.message);
            return;
        }
        setloading(true);
        setTimeout(() => {
            setloading(false);
            navigate("/");
        }, 5000);
    };

    return (
        <>
            <style>{`
                .signup-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    background: #f5efe6;
                    font-family: "Segoe UI", Arial, sans-serif;
                    color: #3b332b;
                    box-sizing: border-box;
                }
                .signup-page h1 {
                    margin: 0 0 8px;
                    font-size: 28px;
                    font-weight: 600;
                }
                .subtitle {
                    margin: 0 0 24px;
                    color: #7a6e62;
                    font-size: 14px;
                    text-align: center;
                }
                .signup-card {
                    width: 100%;
                    max-width: 400px;
                    padding: 32px;
                    background: #fffdf9;
                    border: 1px solid #e6dccd;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(120, 100, 70, 0.08);
                    box-sizing: border-box;
                }
                .signup-card br { display: none; }
                .signup-card label {
                    display: block;
                    margin-bottom: 6px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .signup-card input,
                .signup-card select {
                    width: 100%;
                    padding: 10px 12px;
                    margin-bottom: 16px;
                    background: #ffffff;
                    border: 1px solid #e0d5c4;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #3b332b;
                    box-sizing: border-box;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .signup-card input:focus,
                .signup-card select:focus {
                    outline: none;
                    border-color: #b08968;
                    box-shadow: 0 0 0 3px rgba(176, 137, 104, 0.2);
                }
                .signup-card .error {
                    margin: 0 0 16px;
                    padding: 10px 12px;
                    background: #fbeeea;
                    border: 1px solid #efcfc7;
                    border-radius: 8px;
                    color: #a14a3b;
                    font-size: 13px;
                }
                .btn button,
                .btn-google button {
                    width: 100%;
                    padding: 11px;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .btn button {
                    background: #b08968;
                    color: #ffffff;
                    border: none;
                }
                .btn button:hover:not(:disabled) { background: #9c7656; }
                .btn button:disabled { opacity: 0.6; cursor: not-allowed; }
                .btn-google { margin-top: 12px; }
                .btn-google button {
                    background: #ffffff;
                    color: #3b332b;
                    border: 1px solid #e0d5c4;
                }
                .btn-google button:hover { background: #f5efe6; }
            `}</style>

            <div className="signup-page">
                <h1>Create an account</h1>
                <p className="subtitle">Access your lessons, and keep following them in one place</p>
                <div className="signup-card">
                    <form onSubmit={handleSubmit}>
                        <label>Full Name:</label>
                        <input type="text" placeholder="FullName" value={FullName} onChange={(e) => setFullName(e.target.value)} />
                        <br />
                        <label>Email :</label>
                        <input type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label>Password</label>
                        <input type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <label>Confirm Password:</label>
                        <input type="password" placeholder="Password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <br />

                        <label>Role:</label>
                        <section>
                            <select value={Role} onChange={(e) => setRole(e.target.value)}>
                                <option>Student</option>
                                <option>Professor</option>
                            </select>
                        </section>

                        {Error && <p className="error">{Error}</p>}

                        <div className="btn">
                            <button type="submit" disabled={Loading}>
                                {Loading ? "Loading..." : "Sign up"}
                            </button>
                        </div>
                        <div className="btn-google">
                            <button type="button">Google</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Signup;