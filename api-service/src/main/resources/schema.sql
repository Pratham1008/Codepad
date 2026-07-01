-- Spring Security WebAuthn tables
-- Required by JdbcPublicKeyCredentialUserEntityRepository and JdbcUserCredentialRepository
-- Schema extracted from Spring Security 7.1.0 bytecode

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
    label VARCHAR(1000) NOT NULL DEFAULT ''
);