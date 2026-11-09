
import { useState } from "react";

import heroImage from "../assets/dashboard.jpg";
import python from "../assets/Python.jpg";
import uxui from "../assets/Uxui.jpg";
import machineLearning from "../assets/Machinelearning.jpg";
import student1 from "../assets/student1.jpg";
import student2 from "../assets/student2.jpg";
import student3 from "../assets/student3.jpg";


const courses = [
    {
        title: "UI/UX Basics",
        hours: 12,
        lessons: 5,
        image: uxui,
        category: "Design",
        level: "Beginner",
        format: "Online courses",
    },
    {
        title: "Machine Learning",
        hours: 52,
        lessons: 15,
        image: machineLearning,
        category: "Programming",
        level: "Advanced",
        format: "Online courses",
    },
    {
        title: "Python Course",
        hours: 22,
        lessons: 7,
        image: python,
        category: "Programming",
        level: "Beginner",
        format: "Online courses",
    },
];


const reviews = [
    {
        fullname: "Aya Mohammed",
        country: "Morocco",
        comment:
            "The courses are clear and well organized. I finished my first project in two weeks.",
        image: student2,
    },
    {
        fullname: "Aliya Allami",
        country: "Morocco",
        comment:
            "Learning at my own pace made it easy to balance the courses with my studies.",
        image: student3,
    },
    {
        fullname: "Moha Yassir",
        country: "Morocco",
        comment:
            "The practical lessons gave me the confidence to apply for my first internship.",
        image: student1,
    },
];

function Dashboard() {
    

    const [search, setSearch] = useState("");


    const [learningFormat, setLearningFormat] = useState("All formats");
    const [level, setLevel] = useState("All levels");
    const [category, setCategory] = useState("All categories");

    const [appliedFilters, setAppliedFilters] = useState({
        format: "All formats",
        level: "All levels",
        category: "All categories",
    });


    const handleApplyFilters = () => {
        setAppliedFilters({
            format: learningFormat,
            level: level,
            category: category,
        });
    };

    // ===== Filter Courses =====

    const visibleCourses = courses.filter((course) => {
        const matchesSearch = course.title
            .toLowerCase()
            .includes(search.trim().toLowerCase());

        const matchesFormat =
            appliedFilters.format === "All formats" ||
            course.format === appliedFilters.format;

        const matchesLevel =
            appliedFilters.level === "All levels" ||
            course.level === appliedFilters.level;

        const matchesCategory =
            appliedFilters.category === "All categories" ||
            course.category === appliedFilters.category;

        return (
            matchesSearch &&
            matchesFormat &&
            matchesLevel &&
            matchesCategory
        );
    });

    return (
        <>
            <style>{`

              

                .dashboard-page {
                    max-width: 960px;
                    margin: 0 auto;
                    text-align: center;
                    font-family: -apple-system, BlinkMacSystemFont,
                    "Segoe UI", Inter, Roboto, Arial, sans-serif;
                    color: #3b332b;
                    -webkit-font-smoothing: antialiased;
                }

                .dashboard-page * {
                    box-sizing: border-box;
                }

                .dashboard-page button,
                .dashboard-page input,
                .dashboard-page select {
                    font-family: inherit;
                }

              

                .dashboard-page .hero {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    min-height: 440px;

                    margin: -32px calc(50% - 50vw) 24px;
                    padding: 40px 24px;

                    overflow: hidden;

                    background-color: #866c37;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;

                    opacity: 0;
                    animation: heroEntrance 1.2s ease forwards;
                }

                .dashboard-page .hero::after {
                    content: "";
                    position: absolute;
                    inset: 0;

                    background: linear-gradient(
                        180deg,
                        rgba(40, 30, 15, 0.45),
                        rgba(40, 30, 15, 0.68)
                    );
                }

                .dashboard-page .hero-content {
                    position: relative;
                    z-index: 1;
                    width: 100%;

                    opacity: 0;
                    animation: heroContentEntrance 1s ease forwards;
                    animation-delay: 0.35s;
                }

                .dashboard-page .hero h1 {
                    margin: 0 0 16px;

                    font-size: 48px;
                    font-weight: 700;
                    line-height: 1.15;

                    color: #ffffff;
                }

                .dashboard-page .hero .search {
                    margin: 0;
                }

                .dashboard-page .hero .search h2 {
                    margin: 0 0 28px;

                    font-size: 21px;
                    font-weight: 400;
                    line-height: 1.5;

                    color: rgba(255, 255, 255, 0.92);
                }

                /* Hero Search */

                .dashboard-page .hero .search input {
                    width: 100%;
                    max-width: 700px;
                    height: 58px;

                    padding: 0 22px;

                    border: none;
                    border-radius: 10px;

                    background: #ffffff;

                    font-size: 16px;
                    color: #3b332b;

                    outline: none;

                    transition: box-shadow 0.3s ease;
                }

                .dashboard-page .hero .search input:focus {
                    box-shadow: 0 0 0 4px rgba(198, 166, 107, 0.35);
                }

                .dashboard-page .hero .search input::placeholder {
                    color: #9a8d7d;
                }

                /* =================================
                   ANIMATIONS
                ================================= */

                @keyframes heroEntrance {
                    from {
                        opacity: 0;
                        transform: scale(1.04);
                    }

                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes heroContentEntrance {
                    from {
                        opacity: 0;
                        transform: translateY(35px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes sectionEntrance {
                    from {
                        opacity: 0;
                        transform: translateY(35px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
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

                

                .dashboard-page .filters {
                    display: grid;

                    grid-template-columns: repeat(3, minmax(0, 260px));
                    justify-content: center;

                    gap: 16px;
                    padding: 24px;

                    background: #fffdf9;

                    border: 1px solid #ebe3d5;
                    border-radius: 14px;

                    box-shadow: 0 4px 15px rgba(80, 60, 30, 0.05);

                    opacity: 0;
                    animation: sectionEntrance 0.9s ease 1.5s forwards;
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
                    font-weight: 600;

                    color: #7a6e62;
                }

                .dashboard-page select {
                    width: 100%;
                    height: 42px;

                    padding: 0 12px;

                    border: 1px solid #e0d5c4;
                    border-radius: 8px;

                    background: #ffffff;

                    font-size: 14px;
                    color: #3b332b;

                    text-align: center;
                    text-align-last: center;

                    outline: none;

                    transition: border-color 0.3s, box-shadow 0.3s;
                }

                .dashboard-page select:focus {
                    border-color: #b08968;
                    box-shadow: 0 0 0 3px rgba(176, 137, 104, 0.15);
                }

                .dashboard-page .filters-action {
                    grid-column: 1 / -1;
                }


                .dashboard-page button {
                    height: 42px;

                    padding: 0 24px;

                    border: none;
                    border-radius: 25px;

                    background: #866c37;

                    font-size: 14px;
                    font-weight: 600;

                    color: #ffffff;

                    cursor: pointer;

                    transition:
                        background 0.3s ease,
                        transform 0.3s ease,
                        box-shadow 0.3s ease;
                }

                .dashboard-page button:hover {
                    background: #6f592c;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(80, 60, 30, 0.15);
                }

                .dashboard-page button:focus-visible {
                    outline: 2px solid #b08968;
                    outline-offset: 3px;
                }

                

                .dashboard-page .featured-courses {
                    margin-top: 56px;

                    opacity: 0;
                    animation: sectionEntrance 0.9s ease 1.9s forwards;
                }

                .dashboard-page .featured-courses h2,
                .dashboard-page .review h2 {
                    position: relative;

                    margin: 0 0 48px;
                    padding-bottom: 18px;

                    font-size: 36px;
                    font-weight: 700;
                    line-height: 1.2;

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

                /* Course Grid */

                .dashboard-page .course-list {
                    display: grid;

                    grid-template-columns: repeat(3, minmax(0, 1fr));

                    gap: 30px;
                }

                /* Course Card */

                .dashboard-page .course {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    gap: 7px;
                    padding: 0 0 24px;

                    position: relative;
                    overflow: hidden;

                    background: #ffffff;

                    border: 1px solid #eee5d8;
                    border-radius: 18px;

                    box-shadow: 0 4px 15px rgba(80, 60, 30, 0.05);

                    opacity: 0;
                    animation: cardEntrance 0.7s ease forwards;

                    transition:
                        transform 0.35s ease,
                        box-shadow 0.35s ease,
                        border-color 0.35s ease;
                }

                .dashboard-page .course:nth-child(2) {
                    animation-delay: 0.15s;
                }

                .dashboard-page .course:nth-child(3) {
                    animation-delay: 0.3s;
                }

                .dashboard-page .course:hover {
                    transform: translateY(-9px);

                    border-color: #c6a66b;

                    box-shadow: 0 15px 35px rgba(80, 60, 30, 0.12);
                }

                .dashboard-page .course .course-image {
                    display: block;

                    width: 100%;
                    height: 190px;

                    margin-bottom: 12px;

                    object-fit: cover;

                    transition: transform 0.6s ease;
                }

                .dashboard-page .course:hover .course-image {
                    transform: scale(1.06);
                }

                .dashboard-page .course .course-title {
                    margin: 5px 0;

                    padding: 0 16px;

                    font-size: 17px;
                    font-weight: 650;

                    color: #3b332b;
                }

                .dashboard-page .course .course-meta {
                    margin: 0;

                    padding: 0 16px;

                    font-size: 13px;
                    line-height: 1.7;

                    color: #7a6e62;
                }

                .dashboard-page .course button {
                    margin-top: 12px;
                }

                /* Empty Search Result */

                .dashboard-page .empty-state {
                    margin: 20px 0;

                    font-size: 14px;
                    color: #9a8d7d;
                }

                /* More Courses */

                .dashboard-page .main-button {
                    margin-top: 40px;
                }

                /* =================================
                   TESTIMONIALS
                ================================= */

                .dashboard-page .review {
                    margin-top: 72px;

                    opacity: 0;
                    animation: sectionEntrance 0.9s ease 2.3s forwards;
                }

                .dashboard-page .review h2 {
                    margin-bottom: 20px;
                }

                .dashboard-page .review .review-subtitle {
                    margin: 0 0 48px;

                    font-size: 16px;
                    color: #7a6e62;
                }

                .dashboard-page .review-list {
                    display: grid;

                    grid-template-columns: repeat(3, minmax(0, 1fr));

                    gap: 28px;
                }

                .dashboard-page .review-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    gap: 14px;

                    margin: 0;
                    padding: 32px 24px;

                    background: #fffdf9;

                    border: 1px solid #eee5d8;
                    border-radius: 18px;

                    box-shadow: 0 4px 15px rgba(80, 60, 30, 0.05);

                    opacity: 0;
                    animation: cardEntrance 0.8s ease forwards;

                    transition:
                        transform 0.35s ease,
                        box-shadow 0.35s ease,
                        border-color 0.35s ease;
                }

                .dashboard-page .review-card:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .dashboard-page .review-card:nth-child(3) {
                    animation-delay: 0.4s;
                }

                .dashboard-page .review-card:hover {
                    transform: translateY(-7px);

                    border-color: #c6a66b;

                    box-shadow: 0 15px 30px rgba(80, 60, 30, 0.1);
                }

                /* Student Avatar */

                .dashboard-page .review-avatar {
                    width: 82px;
                    height: 82px;

                    border: 3px solid #e8d8b9;
                    border-radius: 50%;

                    object-fit: cover;

                    transition: transform 0.4s ease;
                }

                .dashboard-page .review-card:hover .review-avatar {
                    transform: scale(1.08);
                }

                /* Review Text */

                .dashboard-page .review-text {
                    margin: 0;

                    font-size: 14px;
                    line-height: 1.8;

                    color: #766b5e;
                }

                .dashboard-page .review-card figcaption {
                    display: flex;
                    flex-direction: column;

                    gap: 3px;
                }

                .dashboard-page .review-name {
                    font-size: 15px;
                    font-weight: 650;

                    color: #4a3c2b;
                }

                .dashboard-page .review-country {
                    font-size: 13px;
                    color: #a18c70;
                }

                /* =================================
                   RESPONSIVE DESIGN
                ================================= */

                @media (max-width: 900px) {

                    .dashboard-page .course-list,
                    .dashboard-page .review-list {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                }

                @media (max-width: 800px) {

                    .dashboard-page .filters {
                        grid-template-columns: minmax(0, 320px);
                    }

                }

                @media (max-width: 600px) {

                    .dashboard-page .hero {
                        min-height: 340px;

                        margin-top: -24px;
                        padding: 32px 16px;
                    }

                    .dashboard-page .hero h1 {
                        font-size: 32px;
                    }

                    .dashboard-page .hero .search h2 {
                        font-size: 17px;
                        margin-bottom: 20px;
                    }

                    .dashboard-page .hero .search input {
                        height: 52px;
                        font-size: 15px;
                    }

                    .dashboard-page .filters {
                        padding: 20px;
                    }

                    .dashboard-page .featured-courses h2,
                    .dashboard-page .review h2 {
                        font-size: 28px;
                    }

                    .dashboard-page .course-list,
                    .dashboard-page .review-list {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .dashboard-page .course-list {
                        gap: 25px;
                    }

                    .dashboard-page .review-list {
                        gap: 20px;
                    }

                    .dashboard-page .featured-courses h2 {
                        margin-bottom: 36px;
                    }

                    .dashboard-page .review .review-subtitle {
                        margin-bottom: 36px;
                    }

                }

                /* =================================
                   ACCESSIBILITY
                ================================= */

                @media (prefers-reduced-motion: reduce) {

                    .dashboard-page .hero,
                    .dashboard-page .hero-content,
                    .dashboard-page .filters,
                    .dashboard-page .featured-courses,
                    .dashboard-page .review,
                    .dashboard-page .course,
                    .dashboard-page .review-card {

                        animation: none !important;

                        opacity: 1 !important;

                        transform: none !important;
                    }

                    .dashboard-page * {
                        transition: none !important;
                    }

                }

            `}</style>

            <div className="dashboard-page">

              

                <section
                    className="hero"
                    style={{
                        backgroundImage: `url(${heroImage})`,
                    }}
                >

                    <div className="hero-content">

                        <h1>Welcome to Learnly</h1>

                        <div className="search">

                            <h2>
                                Discover over 300 free training courses on the platform
                            </h2>

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

               

                <section className="filters">


                    <div className="filter">

                        <label
                            className="label"
                            htmlFor="learning-format"
                        >
                            Learning format
                        </label>

                        <select
                            id="learning-format"
                            value={learningFormat}
                            onChange={(e) =>
                                setLearningFormat(e.target.value)
                            }
                        >

                            <option>All formats</option>
                            <option>In-person courses</option>
                            <option>Online courses</option>
                            <option>Live online courses</option>

                        </select>

                    </div>

                    {/* Level */}

                    <div className="filter">

                        <label
                            className="label"
                            htmlFor="level"
                        >
                            Level
                        </label>

                        <select
                            id="level"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >

                            <option>All levels</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>Expert</option>

                        </select>

                    </div>

                    {/* Category */}

                    <div className="filter">

                        <label
                            className="label"
                            htmlFor="category"
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            <option>All categories</option>
                            <option>Design</option>
                            <option>Programming</option>
                            <option>Business</option>
                            <option>Management</option>
                            <option>Computer science</option>
                            <option>Mathematics</option>

                        </select>

                    </div>

                    {/* Apply Button */}

                    <div className="filters-action">

                        <button
                            type="button"
                            onClick={handleApplyFilters}
                        >
                            Apply filters
                        </button>

                    </div>

                </section>

              

                <section className="featured-courses">

                    <h2>Featured courses</h2>

                    {visibleCourses.length === 0 ? (

                        <p className="empty-state">
                            No courses found. Try a different search or filter.
                        </p>

                    ) : (

                        <div className="course-list">

                            {visibleCourses.map((course) => (

                                <article
                                    className="course"
                                    key={course.title}
                                >

                                    <img
                                        className="course-image"
                                        src={course.image}
                                        alt={course.title}
                                    />

                                    <p className="course-title">
                                        {course.title}
                                    </p>

                                    <p className="course-meta">
                                        {course.hours} hours
                                    </p>

                                    <p className="course-meta">
                                        {course.lessons} lessons
                                    </p>

                                    <button type="button">
                                        View course
                                    </button>

                                </article>

                            ))}

                        </div>

                    )}

                    {visibleCourses.length > 0 && (

                        <div className="main-button">

                            <button type="button">
                                More courses
                            </button>

                        </div>

                    )}

                </section>

                

                <section className="review">

                    <h2>Learner opinions</h2>

                    <p className="review-subtitle">
                        Real impact and inspiring experiences
                    </p>

                    <div className="review-list">

                        {reviews.map((review) => (

                            <figure
                                className="review-card"
                                key={review.fullname}
                            >

                                <img
                                    className="review-avatar"
                                    src={review.image}
                                    alt={review.fullname}
                                />

                                <blockquote className="review-text">
                                    “{review.comment}”
                                </blockquote>

                                <figcaption>

                                    <span className="review-name">
                                        {review.fullname}
                                    </span>

                                    <span className="review-country">
                                        {review.country}
                                    </span>

                                </figcaption>

                            </figure>

                        ))}

                    </div>

                </section>

            </div>

        </>
    );
}

export default Dashboard;
