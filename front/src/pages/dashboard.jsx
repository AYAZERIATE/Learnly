import { useState } from "react";

const courses = [
    { title: "UI/UX Basics", hours: 12, lessons: 5 },
    { title: "Machine Learning", hours: 52, lessons: 15 },
    { title: "Python Course", hours: 22, lessons: 7 },
];

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

                /* ===== Featured courses ===== */
                .dashboard-page .featured-courses { margin-top: 32px; }
                .dashboard-page .featured-courses h2 {
                    margin: 0 0 16px;
                    font-size: 20px;
                    font-weight: 600;
                    color: #3b332b;
                }
                .dashboard-page .course-list {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 16px;
                }
                .dashboard-page .course {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    padding: 24px 16px;
                    background: #fffdf9;
                    border: 1px solid #ebe3d5;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(120, 100, 70, 0.06);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .dashboard-page .course:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(120, 100, 70, 0.14);
                }
                .dashboard-page .course .course-title {
                    margin: 0 0 6px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #3b332b;
                }
                .dashboard-page .course .course-meta {
                    margin: 0;
                    font-size: 13px;
                    color: #7a6e62;
                }
                .dashboard-page .course button {
                    margin-top: 12px;
                    height: 40px;
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
                .dashboard-page .course button:hover { background: #6f592c; }
                .dashboard-page .course button:focus-visible {
                    outline: 2px solid #b08968;
                    outline-offset: 2px;
                }

                @media (max-width: 900px) {
                    .dashboard-page .course-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                @media (max-width: 800px) {
                    .dashboard-page .filters { grid-template-columns: minmax(0, 320px); }
                }
                @media (max-width: 600px) {
                    .dashboard-page .course-list { grid-template-columns: minmax(0, 1fr); }
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

                <div className="featured-courses">
                    <h2>Featured Courses</h2>
                    <div className="course-list">
                        {courses.map((course) => (
                            <div className="course" key={course.title}>
                                <p className="course-title">{course.title}</p>
                                <p className="course-meta">{course.hours} Hours</p>
                                <p className="course-meta">{course.lessons} lessons</p>
                                <button type="button">buy this Course</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;