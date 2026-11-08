import { useState } from "react";

function Setting() {
    const [Password, setPassword] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Gender, setGender] = useState("Female");
    const [BirthDate, setBirthDate] = useState("");

    return (
        <>
            <style>{`
                .app-layout {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                .app-body {
                    display: flex;
                    flex: 1;
                }
                .main-content {
                    flex: 1;
                    min-width: 0;
                    padding: 32px 24px;
                }

                .settings-page {
                    max-width: 640px;
                    margin: 0 auto;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
                    color: #3b332b;
                    -webkit-font-smoothing: antialiased;
                }
                .settings-page h1 {
                    margin: 0 0 20px;
                    font-size: 24px;
                    font-weight: 600;
                    color: #3b332b;
                }
                .settings-page .login,
                .settings-page .details {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 24px;
                    background: #fffdf9;
                    border: 1px solid #ebe3d5;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(120, 100, 70, 0.06);
                }
                .settings-page .details { margin-top: 24px; }
                .settings-page .login h3,
                .settings-page .details h2 {
                    margin: 0 0 8px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #ebe3d5;
                    font-size: 16px;
                    font-weight: 600;
                }
                .settings-page .login p,
                .settings-page .details .label {
                    margin: 8px 0 0;
                    font-size: 13px;
                    font-weight: 500;
                    color: #7a6e62;
                }
                .settings-page .details .value {
                    margin: 0;
                    font-size: 15px;
                    color: #3b332b;
                }
                .settings-page input,
                .settings-page select {
                    width: 100%;
                    height: 40px;
                    padding: 0 12px;
                    background: #ffffff;
                    border: 1px solid #e0d5c4;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 14px;
                    color: #3b332b;
                    box-sizing: border-box;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .settings-page input::placeholder { color: #9a8d7d; }
                .settings-page input:focus,
                .settings-page select:focus {
                    border-color: #b08968;
                    box-shadow: 0 0 0 3px rgba(176, 137, 104, 0.18);
                }
                .settings-page button {
                    align-self: flex-start;
                    height: 40px;
                    margin-top: 4px;
                    padding: 0 18px;
                    background: #866c37;
                    border: none;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 500;
                    color: #ffffff;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .settings-page button:hover { background: #6f592c; }
                .settings-page button:focus-visible {
                    outline: 2px solid #b08968;
                    outline-offset: 2px;
                }
            `}</style>

            <div className="settings-page">
                <h1>Profile Setting</h1>
                <div className="login">
                    <h3>Login details</h3>

                    <p>current password</p>
                    <input
                        type="password"
                        placeholder="enter your password "
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button">update password</button>

                    <p>update role</p>
                    <select>
                        <option>student</option>
                        <option>teacher</option>
                    </select>
                    <button type="button">update Role</button>
                </div>

                <div className="details">
                    <h2>Your personnel details</h2>
                    <p className="label">Your Full Name:</p>
                    <p className="value">{FirstName} {LastName}</p>
                    <p className="label">Your Email:</p>
                    <p className="value">{Email}</p>
                    <p className="label">Gender</p>
                    <div className="value">
                        <select
                            value={Gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option>Female</option>
                            <option>Male</option>
                        </select>
                    </div>
                    <p className="label">date of birth</p>
                    <div className="value">
                        <input
                            type="date"
                            value={BirthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    <button type="button">Update</button>
                </div>
            </div>
        </>
    );
}

export default Setting;