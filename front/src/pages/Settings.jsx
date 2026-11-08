import { useState, useRef, useEffect } from "react";

function Setting() {
    const [Password, setPassword] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Gender, setGender] = useState("Female");
    const [BirthDate, setBirthDate] = useState("");
    const [PhotoFile, setPhotoFile] = useState(null);
    const [PhotoPreview, setPhotoPreview] = useState("");
    const [PhotoError, setPhotoError] = useState("");
    const photoInputRef = useRef(null);

    // nettoyage dyal l'URL dyal preview
    useEffect(() => {
        return () => {
            if (PhotoPreview) URL.revokeObjectURL(PhotoPreview);
        };
    }, [PhotoPreview]);

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setPhotoError("Please choose an image file");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setPhotoError("Image must be smaller than 2 MB");
            return;
        }

        setPhotoError("");
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleRemovePhoto = () => {
        setPhotoFile(null);
        setPhotoPreview("");
        setPhotoError("");
        if (photoInputRef.current) photoInputRef.current.value = "";
    };

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

                /* ===== Photo ===== */
                .settings-page .photo-row {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-top: 4px;
                }
                .settings-page .avatar {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    width: 88px;
                    height: 88px;
                    overflow: hidden;
                    background: #f1e6d6;
                    border: 2px solid #ebe3d5;
                    border-radius: 50%;
                    font-size: 28px;
                    font-weight: 600;
                    color: #866c37;
                }
                .settings-page .avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .settings-page .photo-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .settings-page .photo-actions button { margin-top: 0; }
                .settings-page .photo-actions .secondary {
                    background: transparent;
                    border: 1px solid #e0d5c4;
                    color: #7a6e62;
                }
                .settings-page .photo-actions .secondary:hover { background: #f5efe6; }
                .settings-page .photo-input { display: none; }
                .settings-page .photo-hint {
                    margin: 4px 0 0;
                    font-size: 12px;
                    color: #9a8d7d;
                }
                .settings-page .photo-error {
                    margin: 4px 0 0;
                    font-size: 12px;
                    color: #a14a3b;
                }
            `}</style>

            <div className="settings-page">
                <h1>Profile Setting</h1>
                <div className="login">
                    <h3> Account Information</h3>

                    <p className="label">Profile photo</p>
                    <div className="photo-row">
                        <div className="avatar">
                            {PhotoPreview ? (
                                <img src={PhotoPreview} alt="Profile preview" />
                            ) : (
                                <span>{(FirstName || "?").charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <div className="photo-actions">
                            <input
                                ref={photoInputRef}
                                className="photo-input"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                            <button
                                type="button"
                                onClick={() => photoInputRef.current?.click()}
                            >
                                Choose photo
                            </button>
                            {PhotoPreview && (
                                <button
                                    type="button"
                                    className="secondary"
                                    onClick={handleRemovePhoto}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                    {PhotoError ? (
                        <p className="photo-error">{PhotoError}</p>
                    ) : (
                        <p className="photo-hint">JPG or PNG, max 2 MB</p>
                    )}

                    <p className="label">First Name :</p>
                    <p className="value">  {FirstName}  </p>
                    <p className="label">Last Name :</p>
                    <p className="value">  {LastName}  </p>
                    <p className="label">Email :</p>
                    <p className="value">{Email}</p>
                    
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
                    <h2>Personnel Information</h2>
                   
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