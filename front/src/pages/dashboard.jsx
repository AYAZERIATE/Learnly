import { useState } from "react";

function Dashboard() {
    const [LearningFormats, setLearningFormats] = useState("In-Person Courses");
    const [Level, setLevel] = useState("Beginner");
    const [Categories, setCategories] = useState("Business");

    return (
        <>
            <style>{`
                .dashboard-page {
                    max-width: 960px;
                    margin: 0 auto;
                    text-align: center;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
                    color: #3b332b;
                    -webkit-font-smoothing: antialiased;
                }
                .dashboard-page h1 {
                    margin: 0 0 20px;
                    font-size: 24px;
                    font-weight: 600;
                    color: #3b332b;
                }
                .dashboard-page .filters {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 260px));
                    justify-content: center;
                    gap: 16px;
                    padding: 24px;
                    background: #fffdf9;
                    border: 1px solid #ebe3d5;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(120, 100, 70, 0.06);
                }
                .dashboard-page .filter {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                .dashboard-page .label {
                    margin: 0;
                    font-size: 13px;
                    font-weight: 500;
                    color: #7a6e62;
                }
                .dashboard-page select {
                    width: 100%;
                    height: 40px;
                    padding: 0 12px;
                    background: #ffffff;
                    border: 1px solid #e0d5c4;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 14px;
                    color: #3b332b;
                    text-align: center;
                    text-align-last: center;
                    box-sizing: border-box;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .dashboard-page select:focus {
                    border-color: #b08968;
                    box-shadow: 0 0 0 3px rgba(176, 137, 104, 0.18);
                }
                @media (max-width: 800px) {
                    .dashboard-page .filters { grid-template-columns: minmax(0, 320px); }
                }
            `}</style>

            <div className="dashboard-page">
                <h1>welcome to learnly</h1>
                <div className="filters">
                    <div className="filter learning-formats">
                        <p className="label">Learning Formats</p>
                        <select
                            value={LearningFormats}
                            onChange={(e) => setLearningFormats(e.target.value)}
                        >
                            <option>In-Person Courses</option>
                            <option>Online Courses</option>
                            <option>Live Online Courses</option>
                        </select>
                    </div>

                    <div className="filter level">
                        <p className="label">level</p>
                        <select
                            value={Level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>Expert</option>
                        </select>
                    </div>

                    <div className="filter categories">
                        <p className="label">Categories</p>
                        <select
                            value={Categories}
                            onChange={(e) => setCategories(e.target.value)}
                        >
                            <option>Business</option>
                            <option>Programming</option>
                            <option>Management</option>
                            <option>Computer Science</option>
                            <option>Mathematics</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;