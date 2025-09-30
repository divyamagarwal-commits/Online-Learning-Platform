-- Insert sample learners
INSERT INTO users (name, email, password, mobile, role, target_exam, preferred_language, current_level)
VALUES
('John Doe', 'john@example.com', 'hashed_pw1', '+919876543210', 'learner', 'UPSC', 'English', 'Beginner'),
('Asha Verma', 'asha@example.com', 'hashed_pw2', '+919812345678', 'learner', 'NEET', 'Hindi', 'Intermediate');

-- Insert sample educators
INSERT INTO users (name, email, password, mobile, role, subjects, qualification, experience, bio, verified)
VALUES
('Dr. Sarah Kumar', 'sarah@example.com', 'hashed_pw3', '+919876543211', 'educator',
 '["Mathematics", "Physics"]', 'PhD in Physics, IIT Delhi', 8, '8+ years of teaching experience...', TRUE),
('Prof. Ramesh Gupta', 'ramesh@example.com', 'hashed_pw4', '+919899112233', 'educator',
 '["Chemistry"]', 'M.Sc. Chemistry, DU', 5, 'Specialized in organic chemistry', TRUE);

-- Insert courses
INSERT INTO courses (title, description, target_exam, duration_weeks, price, discount, type, educator_id)
VALUES
('UPSC Foundation Course', 'Comprehensive UPSC preparation', 'UPSC', 24, 19999, 10, 'recorded', 3),
('NEET Physics Crash Course', 'Intensive Physics prep for NEET', 'NEET', 12, 9999, 5, 'live', 3);

-- Insert lessons
INSERT INTO lessons (course_id, title, video_url, duration_minutes, lesson_order)
VALUES
(1, 'Introduction to UPSC Preparation', 'https://videos.example.com/upsc1.mp4', 45, 1),
(1, 'Polity Basics', 'https://videos.example.com/upsc2.mp4', 60, 2),
(2, 'Mechanics Overview', 'https://videos.example.com/neet1.mp4', 50, 1);

-- Insert live class
INSERT INTO live_classes (course_id, educator_id, title, schedule_time, max_students)
VALUES
(2, 3, 'Live Physics Problem Solving', '2024-10-05 18:00:00', 100);

-- Insert enrollments
INSERT INTO enrollments (user_id, course_id, expiry_date, progress)
VALUES
(1, 1, '2025-03-01', 15.5),
(2, 2, '2024-12-01', 5.0);

-- Insert tests
INSERT INTO tests (course_id, title, description, duration_minutes, total_marks)
VALUES
(1, 'UPSC Mock Test 1', 'General Studies Paper 1', 120, 200),
(2, 'NEET Physics Practice Test', 'Mechanics & Thermodynamics', 90, 100);

-- Insert test attempts
INSERT INTO test_attempts (test_id, user_id, score, time_taken_minutes, answers)
VALUES
(1, 1, 150, 115, '{"Q1":"A","Q2":"C"}'),
(2, 2, 80, 85, '{"Q1":"B","Q2":"D"}');

-- Insert subscriptions
INSERT INTO subscriptions (name, features, price, duration_months)
VALUES
('Plus', '{"live_classes":true,"download_materials":true}', 4999, 6),
('Iconic', '{"mentor_support":true,"priority_support":true}', 9999, 12);

-- Assign user subscriptions
INSERT INTO user_subscriptions (user_id, subscription_id, end_date)
VALUES
(1, 1, '2025-03-01'),
(2, 2, '2025-09-01');

-- Insert doubt sessions
INSERT INTO doubt_sessions (user_id, educator_id, question, response, resolved)
VALUES
(1, 3, 'How to start UPSC Polity?', 'Begin with NCERTs, then Laxmikant.', TRUE);

-- Insert study materials
INSERT INTO study_materials (course_id, title, file_url)
VALUES
(1, 'UPSC Polity Notes', 'https://files.example.com/upsc-polity.pdf'),
(2, 'NEET Physics Formula Sheet', 'https://files.example.com/neet-physics.pdf');
