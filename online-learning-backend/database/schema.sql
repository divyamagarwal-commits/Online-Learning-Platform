-- Users Table (Learners & Educators)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('learner', 'educator')) NOT NULL,
    target_exam VARCHAR(50),
    preferred_language VARCHAR(50),
    current_level VARCHAR(50),
    subjects JSONB,
    qualification VARCHAR(255),
    experience INT,
    bio TEXT,
    rating DECIMAL(3,2) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    target_exam VARCHAR(50),
    duration_weeks INT,
    price DECIMAL(10,2),
    discount DECIMAL(5,2) DEFAULT 0,
    type VARCHAR(20) CHECK (type IN ('recorded', 'live')),
    educator_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons Table
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    video_url VARCHAR(255),
    duration_minutes INT,
    lesson_order INT,
    resources JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live Classes Table
CREATE TABLE live_classes (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    educator_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    schedule_time TIMESTAMP NOT NULL,
    max_students INT,
    recording_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments Table
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP,
    progress DECIMAL(5,2) DEFAULT 0.0
);

-- Watch History Table
CREATE TABLE watch_history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
    last_watched TIMESTAMP,
    completion_status BOOLEAN DEFAULT FALSE
);

-- Tests Table
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    duration_minutes INT,
    total_marks INT
);

-- Test Attempts Table
CREATE TABLE test_attempts (
    id SERIAL PRIMARY KEY,
    test_id INT REFERENCES tests(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    score INT,
    time_taken_minutes INT,
    answers JSONB,
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions Table
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    features JSONB,
    price DECIMAL(10,2),
    duration_months INT
);

-- User Subscriptions Table
CREATE TABLE user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    subscription_id INT REFERENCES subscriptions(id) ON DELETE CASCADE,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP
);

-- Doubt Sessions Table
CREATE TABLE doubt_sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    educator_id INT REFERENCES users(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved BOOLEAN DEFAULT FALSE
);

-- Study Materials Table
CREATE TABLE study_materials (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(150),
    file_url VARCHAR(255),
    downloadable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
