import { useState } from "react";

const courses = [
    { title: "UI/UX Basics", hours: 12, lessons: 5 },
    { title: "Machine Learning", hours: 52, lessons: 15 },
    { title: "Python Course", hours: 22, lessons: 7 },
];

function Dashboard() {
    const [learningFormat, setLearningFormat] = useState("In-person courses");
    const [level, setLevel] = useState("Beginner");
    const [category, setCategory] = useState("Business");
    const [search, setSearch] = useState("");

    const visibleCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(search.trim().toLowerCase())
    );

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

                /* ===== Search ===== */
                .dashboard-page .search {
                    margin: 0 0 24px;
                }
                .dashboard-page .search h2 {
                    margin: 0 0 12px;
                    font-size: 15px;
                    font-weight: 500;
                    color: #7a6e62;
                }
                .dashboard-page .search input {
                    width: 100%;
                    max-width: 520px;
                    height: 44px;
                    padding: 0 14px;
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
                .dashboard-page .search input::placeholder { color: #9a8d7d; }
                .dashboard-page .search input:focus {
                    border-color: #b08968;
                    box-shadow: 0 0 0 3px rgba(176, 137, 104, 0.18);
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
                .dashboard-page .filters-action { grid-column: 1 / -1; }
                .dashboard-page .filters-action button {
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
                .dashboard-page .filters-action button:hover { background: #6f592c; }
                .dashboard-page .filters-action button:focus-visible {
                    outline: 2px solid #b08968;
                    outline-offset: 2px;
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
                .dashboard-page .empty-state {
                    margin: 0;
                    font-size: 14px;
                    color: #9a8d7d;
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
                <h1>Welcome to Learnly</h1>

                <div className="search">
                    <h2>Discover over 300 free training courses on the platform</h2>
                    <input
                        type="search"
                        placeholder="What do you want to learn today?"
                        aria-label="Search courses"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="filters">
                    <div className="filter learning-formats">
                        <label className="label" htmlFor="learning-format">
                            Learning format
                        </label>
                        <select
                            id="learning-format"
                            value={learningFormat}
                            onChange={(e) => setLearningFormat(e.target.value)}
                        >
                            <option>In-person courses</option>
                            <option>Online courses</option>
                            <option>Live online courses</option>
                        </select>
                    </div>

                    <div className="filter level">
                        <label className="label" htmlFor="level">Level</label>
                        <select
                            id="level"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>Expert</option>
                        </select>
                    </div>

                    <div className="filter categories">
                        <label className="label" htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Business</option>
                            <option>Programming</option>
                            <option>Management</option>
                            <option>Computer science</option>
                            <option>Mathematics</option>
                        </select>
                    </div>

                    <div className="filters-action">
                        <button type="button">Apply filters</button>
                    </div>
                </div>

                <div className="featured-courses">
                    <h2>Featured courses</h2>
                    {visibleCourses.length === 0 ? (
                        <p className="empty-state">
                            No course matches "{search}". Try a different keyword.
                        </p>
                    ) : (
                        <div className="course-list">
                            {visibleCourses.map((course) => (
                                <div className="course" key={course.title}>
                                    <p className="course-title">{course.title}</p>
                                    <p className="course-meta">{course.hours} hours</p>
                                    <p className="course-meta">{course.lessons} lessons</p>
                                    <button type="button">View course</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;