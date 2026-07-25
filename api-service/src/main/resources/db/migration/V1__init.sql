-- Schema initialization
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    firebase_uid VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    language VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);

CREATE TABLE code_snippets (
    snippet_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL,
    source_code TEXT NOT NULL,
    stdin TEXT,
    stdout TEXT,
    stderr TEXT,
    exit_code INTEGER,
    execution_time_ms INTEGER,
    memory_usage_kb INTEGER,
    title VARCHAR(200),
    notes TEXT,
    tags VARCHAR(500),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_code_snippets_user_id ON code_snippets(user_id);
CREATE INDEX idx_code_snippets_created_at ON code_snippets(created_at DESC);
CREATE INDEX idx_code_snippets_language ON code_snippets(language);

CREATE TABLE problems (
    problem_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(10) NOT NULL,
    time_limit_ms INTEGER NOT NULL DEFAULT 2000,
    memory_limit_kb INTEGER NOT NULL DEFAULT 262144,
    starter_code JSONB,
    solution_code JSONB,
    solution_markdown TEXT,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);



CREATE TABLE problem_tags (
    problem_id UUID REFERENCES problems(problem_id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (problem_id, tag)
);

CREATE TABLE test_cases (
    test_case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID NOT NULL REFERENCES problems(problem_id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample BOOLEAN NOT NULL DEFAULT FALSE,
    explanation TEXT,
    order_index INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_test_cases_problem ON test_cases(problem_id);

CREATE TABLE submissions (
    submission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES problems(problem_id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL,
    source_code TEXT NOT NULL,
    verdict VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    compile_error TEXT,
    passed_count INTEGER DEFAULT 0,
    total_count INTEGER DEFAULT 0,
    max_time_ms INTEGER,
    max_memory_kb INTEGER,
    submitted_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_submissions_user_problem ON submissions(user_id, problem_id);
CREATE INDEX idx_submissions_verdict ON submissions(verdict);
CREATE INDEX idx_submissions_user_problem_verdict ON submissions(user_id, problem_id, verdict);

CREATE TABLE submission_test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(submission_id) ON DELETE CASCADE,
    test_case_id UUID NOT NULL REFERENCES test_cases(test_case_id),
    verdict VARCHAR(20) NOT NULL,
    time_ms INTEGER,
    memory_kb INTEGER,
    actual_output TEXT
);

CREATE TABLE event_publication (
    id UUID NOT NULL,
    listener_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    serialized_event TEXT NOT NULL,
    publication_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completion_date TIMESTAMP WITH TIME ZONE,
    completion_attempts INTEGER,
    last_resubmission_date TIMESTAMP WITH TIME ZONE,
    status TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS diagnostic_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL,
    container_id VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    started_at TIMESTAMP DEFAULT now(),
    last_activity_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_diag_sessions_project ON diagnostic_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_diag_sessions_status ON diagnostic_sessions(status);

CREATE OR REPLACE FUNCTION validate_problem_test_cases() RETURNS TRIGGER AS $$
DECLARE
    sample_count INT;
    hidden_count INT;
BEGIN
    IF NEW.is_published = TRUE THEN
        SELECT COUNT(*) INTO sample_count FROM test_cases WHERE problem_id = NEW.problem_id AND is_sample = TRUE;
        SELECT COUNT(*) INTO hidden_count FROM test_cases WHERE problem_id = NEW.problem_id AND is_sample = FALSE;
        IF sample_count != 3 THEN
            RAISE EXCEPTION 'Cannot publish: exactly 3 sample test cases required, found %', sample_count;
        END IF;
        IF hidden_count < 10 OR hidden_count > 27 THEN
            RAISE EXCEPTION 'Cannot publish: hidden test cases must be 10-27, found %', hidden_count;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_problem_test_cases
BEFORE INSERT OR UPDATE ON problems
FOR EACH ROW EXECUTE FUNCTION validate_problem_test_cases();
