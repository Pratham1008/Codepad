-- Drop old tables if they exist (for clean migration approach)
DROP TABLE IF EXISTS test_case_results CASCADE;
DROP TABLE IF EXISTS submission_results CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS test_cases CASCADE;
DROP TABLE IF EXISTS problems CASCADE;

-- Core user tables (managed by Hibernate/JPA via @Entity User)
-- Note: The 'users' table is auto-managed by Hibernate ddl-auto=update
-- but we define it here for Flyway to create on first run.
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Spring Security WebAuthn tables
-- These are managed by JdbcPublicKeyCredentialUserEntityRepository
-- and JdbcUserCredentialRepository (Spring Security 7.1.0)
CREATE TABLE IF NOT EXISTS user_entities (
    id VARCHAR(1000) NOT NULL PRIMARY KEY,
    name VARCHAR(1000) NOT NULL,
    display_name VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_credentials (
    credential_id VARCHAR(1000) NOT NULL PRIMARY KEY,
    user_entity_user_id VARCHAR(1000) NOT NULL,
    public_key BYTEA NOT NULL,
    signature_count BIGINT NOT NULL DEFAULT 0,
    uv_initialized BOOLEAN NOT NULL DEFAULT FALSE,
    backup_eligible BOOLEAN NOT NULL DEFAULT FALSE,
    authenticator_transports VARCHAR(1000),
    public_key_credential_type VARCHAR(100),
    backup_state BOOLEAN NOT NULL DEFAULT FALSE,
    attestation_object BYTEA,
    attestation_client_data_json BYTEA,
    created TIMESTAMP,
    last_used TIMESTAMP,
    label VARCHAR(1000) NOT NULL DEFAULT '',
    FOREIGN KEY (user_entity_user_id) REFERENCES user_entities(id) ON DELETE CASCADE
);

-- Code snippet history
CREATE TABLE IF NOT EXISTS code_snippets (
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

CREATE INDEX IF NOT EXISTS idx_code_snippets_user_id ON code_snippets(user_id);
CREATE INDEX IF NOT EXISTS idx_code_snippets_created_at ON code_snippets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_code_snippets_language ON code_snippets(language);
