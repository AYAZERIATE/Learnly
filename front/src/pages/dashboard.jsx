import { useState } from "react";
import heroImage from "../assets/dashboard.jpg";
import python from "../assets/Python.jpg";
import uxui from "../assets/Uxui.jpg";
import machineLearning from "../assets/Machinelearning.jpg";
import student1 from "../assets/student1.jpg";
import student2 from "../assets/student2.jpg";
import student3 from "../assets/student3.jpg";

const courses = [
    { title: "UI/UX Basics", hours: 12, lessons: 5, image: uxui },
    { title: "Machine Learning", hours: 52, lessons: 15, image: machineLearning },
    { title: "Python Course", hours: 22, lessons: 7, image: python },
];

// Sample testimonials: replace the text, names and countries with real ones
const reviews = [
    {
        fullname: "Aya mohammed",
        country: "Morocco",
        comment: "The courses are clear and well organized. I finished my first project in two weeks.",
        image: student2,
    },
    {
        fullname: "Aliya allami",
        country: "Morocco",
        comment: "Learning at my own pace made it easy to balance the courses with my studies.",
        image: student3,
    },
    {
        fullname: "moha yassir",
        country: "Morocco",
        comment: "The practical lessons gave me the confidence to apply for my first internship.",
        image: student1,
    },
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

                /* ===== Hero (image + title + search) ===== */
                .dashboard-page .hero {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 440px;
                    /* full-bleed: cancel the page padding and max-width */
                    margin: -32px calc(50% - 50vw) 24px;
                    padding: 40px 24px;
                    overflow: hidden;
                    background-color: #866c37;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .dashboard-page .hero::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(40, 30, 15, 0.5), rgba(40, 30, 15, 0.65));
                }
                .dashboard-page .hero-content {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                }
                .dashboard-page .hero h1 {
                    margin: 0 0 16px;
                    font-size: 48px;
                    line-height: 1.15;
                    color: #ffffff;
                }
                .dashboard-page .hero .search { margin: 0; }
                .dashboard-page .hero .search h2 {
                    margin: 0 0 28px;
                    font-size: 21px;
                    line-height: 1.4;
                    color: rgba(255, 255, 255, 0.92);
                }
                .dashboard-page .hero .search input {
                    max-width: 700px;
                    height: 58px;
                    padding: 0 22px;
                    border-radius: 8px;
                    font-size: 17px;
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
                .dashboard-page .filters-action button,
                .dashboard-page .course button,
                .dashboard-page .main-button button {
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
                .dashboard-page .filters-action button:hover,
                .dashboard-page .course button:hover,
                .dashboard-page .main-button button:hover { background: #6f592c; }
                .dashboard-page .filters-action button:focus-visible,
                .dashboard-page .course button:focus-visible,
                .dashboard-page .main-button button:focus-visible {
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
                .dashboard-page .featured-courses { margin-top: 56px; }
                .dashboard-page .featured-courses h2,
                .dashboard-page .review h2 {
                    position: relative;
                    margin: 0 0 48px;
                    padding-bottom: 18px;
                    font-size: 36px;
                    font-weight: 700;
                    line-height: 1.15;
                    color: #3b332b;
                }
                .dashboard-page .featured-courses h2::after,
                .dashboard-page .review h2::after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    width: 56px;
                    height: 3px;
                    transform: translateX(-50%);
                    background: #866c37;
                    border-radius: 2px;
                }
                .dashboard-page .empty-state {
                    margin: 0;
                    font-size: 14px;
                    color: #9a8d7d;
                }
                .dashboard-page .course-list {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 40px 32px;
                }
                .dashboard-page .course {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    padding: 0 0 24px;
                    overflow: hidden;
                    background: #fffdf9;
                    border: 1px solid #ebe3d5;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(120, 100, 70, 0.06);
                    transition: box-shadow 0.2s;
                }
                .dashboard-page .course:hover {
                    box-shadow: 0 4px 12px rgba(120, 100, 70, 0.14);
                }
                .dashboard-page .course .course-image {
                    display: block;
                    width: 100%;
                    height: 160px;
                    margin-bottom: 14px;
                    object-fit: cover;
                }
                .dashboard-page .course .course-title,
                .dashboard-page .course .course-meta { padding: 0 16px; }
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
                .dashboard-page .course button { margin-top: 12px; }

                .dashboard-page .main-button { margin-top: 40px; }

                /* ===== Learner opinions ===== */
                .dashboard-page .review { margin-top: 72px; }
                .dashboard-page .review h2 { margin-bottom: 20px; }
                .dashboard-page .review .review-subtitle {
                    margin: 0 0 48px;
                    font-size: 16px;
                    color: #7a6e62;
                }
                .dashboard-page .review-list {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 32px;
                }
                .dashboard-page .review-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 14px;
                    margin: 0;
                    padding: 28px 20px;
                    background: #fffdf9;
                    border: 1px solid #ebe3d5;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(120, 100, 70, 0.06);
                    transition: box-shadow 0.2s;
                }
                .dashboard-page .review-card:hover {
                    box-shadow: 0 4px 12px rgba(120, 100, 70, 0.14);
                }
                .dashboard-page .review-avatar {
                    width: 72px;
                    height: 72px;
                    border: 2px solid #ebe3d5;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .dashboard-page .review-text {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #7a6e62;
                }
                .dashboard-page .review-card figcaption {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .dashboard-page .review-name {
                    font-size: 15px;
                    font-weight: 600;
                    color: #3b332b;
                }
                .dashboard-page .review-country {
                    font-size: 13px;
                    color: #9a8d7d;
                }

                @media (max-width: 900px) {
                    .dashboard-page .review-list { grid-template-columns: minmax(0, 420px); justify-content: center; }
                    .dashboard-page .course-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                @media (max-width: 800px) {
                    .dashboard-page .filters { grid-template-columns: minmax(0, 320px); }
                }
                @media (max-width: 600px) {
                    .dashboard-page .hero { min-height: 340px; margin-top: -24px; padding: 32px 16px; }
                    .dashboard-page .hero h1 { font-size: 32px; }
                    .dashboard-page .hero .search h2 { font-size: 17px; margin-bottom: 20px; }
                    .dashboard-page .hero .search input { height: 52px; font-size: 16px; }
                    .dashboard-page .featured-courses h2,
                    .dashboard-page .review h2 { font-size: 28px; }
                    .dashboard-page .featured-courses h2 { margin-bottom: 36px; }
                    .dashboard-page .review h2 { margin-bottom: 16px; }
                    .dashboard-page .review .review-subtitle { margin-bottom: 36px; }
                    .dashboard-page .course-list { grid-template-columns: minmax(0, 1fr); gap: 32px; }
                }
                    
/* Smooth transitions */
.dashboard-page * {
    transition:
        color 0.25s ease,
        background-color 0.25s ease,
        box-shadow 0.3s ease,
        transform 0.3s ease,
        border-color 0.25s ease;
}

/* Fade animation */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Slide up */
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(25px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Hero */
.dashboard-page .hero-content {
    animation: slideUp 0.9s ease both;
}

/* Filters */
.dashboard-page .filters {
    animation: fadeIn 1s ease both;
}

/* Course cards */
.dashboard-page .course {
    animation: slideUp 0.7s ease both;
}

.dashboard-page .course:nth-child(2) {
    animation-delay: 0.15s;
}

.dashboard-page .course:nth-child(3) {
    animation-delay: 0.3s;
}

/* Course hover */
.dashboard-page .course:hover {
    transform: translateY(-7px);
    box-shadow: 0 12px 25px rgba(120, 100, 70, 0.13);
}

.dashboard-page .course:hover .course-image {
    transform: scale(1.04);
}

/* Testimonials */
.dashboard-page .review-card {
    animation: slideUp 0.8s ease both;
}

.dashboard-page .review-card:hover {
    transform: translateY(-5px);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .dashboard-page *,
    .dashboard-page *::before,
    .dashboard-page *::after {
        animation: none !important;
        transition: none !important;
    }
}


/* ===== Course Cards ===== */

.dashboard-page .course-list {
    gap: 30px;
}

.dashboard-page .course {
    position: relative;
    border: 1px solid #eee5d8;
    border-radius: 18px;
    background: #ffffff;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(80, 60, 30, 0.05);

    opacity: 0;
    animation: cardEntrance 0.7s ease forwards;
}

.dashboard-page .course:nth-child(2) {
    animation-delay: 0.15s;
}

.dashboard-page .course:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes cardEntrance {
    from {
        opacity: 0;
        transform: translateY(25px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dashboard-page .course:hover {
    transform: translateY(-9px);
    box-shadow: 0 15px 35px rgba(80, 60, 30, 0.12);
    border-color: #c6a66b;
}

.dashboard-page .course .course-image {
    height: 190px;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.dashboard-page .course:hover .course-image {
    transform: scale(1.06);
}

.dashboard-page .course .course-title {
    font-size: 17px;
    font-weight: 650;
    margin-top: 5px;
    color: #3b332b;
}

.dashboard-page .course .course-meta {
    line-height: 1.7;
}

.dashboard-page .course button {
    border-radius: 25px;
    padding: 0 24px;
    transition: all 0.3s ease;
}

.dashboard-page .course button:hover {
    background: #6f592c;
    transform: scale(1.04);
}

/* ===== Testimonials ===== */

.dashboard-page .review-list {
    gap: 28px;
}

.dashboard-page .review-card {
    position: relative;
    padding: 32px 24px;
    border-radius: 18px;
    background: #fffdf9;
    border: 1px solid #eee5d8;
    box-shadow: 0 4px 15px rgba(80, 60, 30, 0.05);

    opacity: 0;
    animation: testimonialEntrance 0.8s ease forwards;
}

.dashboard-page .review-card:nth-child(2) {
    animation-delay: 0.2s;
}

.dashboard-page .review-card:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes testimonialEntrance {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dashboard-page .review-card:hover {
    transform: translateY(-7px);
    box-shadow: 0 15px 30px rgba(80, 60, 30, 0.1);
    border-color: #c6a66b;
}

.dashboard-page .review-avatar {
    width: 82px;
    height: 82px;
    border: 3px solid #e8d8b9;
    transition: transform 0.4s ease;
}

.dashboard-page .review-card:hover .review-avatar {
    transform: scale(1.08);
}

.dashboard-page .review-text {
    font-size: 14px;
    line-height: 1.8;
    color: #766b5e;
}

.dashboard-page .review-name {
    font-size: 15px;
    font-weight: 650;
    color: #4a3c2b;
}

.dashboard-page .review-country {
    color: #a18c70;
}
 
@media (prefers-reduced-motion: reduce) {
    .dashboard-page .course,
    .dashboard-page .review-card {
        animation: none;
        opacity: 1;
        transform: none;
    }

    .dashboard-page .course *,
    .dashboard-page .review-card * {
        transition: none !important;
    }
}

            `}</style>

            <div className="dashboard-page">
                <section
                    className="hero"
                    style={{ backgroundImage: `url(${heroImage})` }}
                >
                    <div className="hero-content">
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
                    </div>
                </section>

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
                                    <img className="course-image" src={course.image} alt={course.title} />
                                    <p className="course-title">{course.title}</p>
                                    <p className="course-meta">{course.hours} hours</p>
                                    <p className="course-meta">{course.lessons} lessons</p>
                                    <button type="button">View course</button>
                                </div>
                            ))}
                        </div>
                    )}
                    {visibleCourses.length > 0 && (
                        <div className="main-button">
                            <button type="button">More courses</button>
                        </div>
                    )}
                </div>

                <div className="review">
                    <h2>Learner opinions</h2>
                    <p className="review-subtitle">Real impact and inspiring experiences</p>
                    <div className="review-list">
                        {reviews.map((review) => (
                            <figure className="review-card" key={review.fullname}>
                                <img className="review-avatar" src={review.image} alt={review.fullname} />
                                <blockquote className="review-text">“{review.comment}”</blockquote>
                                <figcaption>
                                    <span className="review-name">{review.fullname}</span>
                                    <span className="review-country">{review.country}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;