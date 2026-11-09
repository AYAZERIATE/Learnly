import { useState, useRef, useEffect } from "react";

function Setting() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [role, setRole] = useState("student");
    const [firstName] = useState("");
    const [lastName] = useState("");
    const [email] = useState("");
    const [gender, setGender] = useState("Female");
    const [birthDate, setBirthDate] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [interest, setInterest] = useState("");
    const [courseLanguage, setCourseLanguage] = useState("French");
    const [courseReminders, setCourseReminders] = useState(true);
    const [enrolledCourses] = useState(0);
    const [memberSince] = useState("");
    const [photoPreview, setPhotoPreview] = useState("");
    const [photoError, setPhotoError] = useState("");
    const photoInputRef = useRef(null);

    // Release the preview URL when it changes or the component unmounts
    useEffect(() => {
        return () => {
            if (photoPreview) URL.revokeObjectURL(photoPreview);
        };
    }, [photoPreview]);

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            setPhotoError("Choose a JPG or PNG image.");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setPhotoError("The image must be smaller than 2 MB.");
            return;
        }

        setPhotoError("");
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleRemovePhoto = () => {
        setPhotoPreview("");
        setPhotoError("");
        if (photoInputRef.current) photoInputRef.current.value = "";
    };

    const displayName = `${firstName} ${lastName}`.trim();

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
                .settings-page .login h2,
                .settings-page .details h2 {
                    margin: 0 0 8px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #ebe3d5;
                    font-size: 16px;
                    font-weight: 600;
                }
                .settings-page .label {
                    display: block;
                    margin: 8px 0 0;
                    font-size: 13px;
                    font-weight: 500;
                    color: #7a6e62;
                }
                .settings-page .value {
                    margin: 0;
                    font-size: 15px;
                    color: #3b332b;
                }
                .settings-page .value.empty { color: #9a8d7d; }
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
                .settings-page .checkbox-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 8px;
                    font-size: 14px;
                    color: #3b332b;
                }
                .settings-page .checkbox-row input {
                    width: 16px;
                    height: 16px;
                    padding: 0;
                    accent-color: #866c37;
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
                .settings-page button:disabled {
                    background: #d9cdb8;
                    cursor: not-allowed;
                }
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
                <h1>Profile settings</h1>
                <div className="login">
                    <h2>Account information</h2>

                    <span className="label">Profile photo</span>
                    <div className="photo-row">
                        <div className="avatar">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Profile preview" />
                            ) : (
                                <span aria-hidden="true">
                                    {(firstName || "?").charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="photo-actions">
                            <input
                                ref={photoInputRef}
                                className="photo-input"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handlePhotoChange}
                                aria-label="Upload profile photo"
                            />
                            <button
                                type="button"
                                onClick={() => photoInputRef.current?.click()}
                            >
                                {photoPreview ? "Change photo" : "Upload photo"}
                            </button>
                            {photoPreview && (
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
                    {photoError ? (
                        <p className="photo-error" role="alert">{photoError}</p>
                    ) : (
                        <p className="photo-hint">JPG or PNG, up to 2 MB.</p>
                    )}

                    <span className="label">Full name</span>
                    <p className={`value${displayName ? "" : " empty"}`}>
                        {displayName || "Not provided"}
                    </p>
                    <span className="label">Email address</span>
                    <p className={`value${email ? "" : " empty"}`}>
                        {email || "Not provided"}
                    </p>
                    <span className="label">
                        {role === "teacher" ? "Published courses" : "Enrolled courses"}
                    </span>
                    <p className="value">{enrolledCourses}</p>
                    <span className="label">Member since</span>
                    <p className={`value${memberSince ? "" : " empty"}`}>
                        {memberSince || "Not available"}
                    </p>

                    <label className="label" htmlFor="current-password">
                        Current password
                    </label>
                    <input
                        id="current-password"
                        type="password"
                        placeholder="Enter your current password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="label" htmlFor="new-password">
                        New password
                    </label>
                    <input
                        id="new-password"
                        type="password"
                        placeholder="Enter a new password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        disabled={!password || !newPassword}
                    >
                        Update password
                    </button>

                    <label className="label" htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <button type="button">Update role</button>
                </div>

                <div className="details">
                    <h2>Personal information</h2>

                    <label className="label" htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option>Female</option>
                        <option>Male</option>
                    </select>

                    <label className="label" htmlFor="birth-date">
                        Date of birth
                    </label>
                    <input
                        id="birth-date"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />

                    <label className="label" htmlFor="education-level">
                        Education level
                    </label>
                    <select
                        id="education-level"
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                    >
                        <option value="">Select your level</option>
                        <option>High school</option>
                        <option>Bachelor's degree</option>
                        <option>Master's degree</option>
                        <option>Professional training</option>
                    </select>

                    <label className="label" htmlFor="interest">
                        Field of interest
                    </label>
                    <select
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                    >
                        <option value="">Select a field</option>
                        <option>Web development</option>
                        <option>Data and AI</option>
                        <option>Design</option>
                        <option>Languages</option>
                        <option>Business</option>
                    </select>

                    <label className="label" htmlFor="course-language">
                        Preferred course language
                    </label>
                    <select
                        id="course-language"
                        value={courseLanguage}
                        onChange={(e) => setCourseLanguage(e.target.value)}
                    >
                        <option>French</option>
                        <option>English</option>
                        <option>Arabic</option>
                    </select>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            checked={courseReminders}
                            onChange={(e) => setCourseReminders(e.target.checked)}
                        />
                        Email me about new lessons and deadlines
                    </label>
                    <button type="button">Save changes</button>
                </div>
            </div>
        </>
    );
}

export default Setting;