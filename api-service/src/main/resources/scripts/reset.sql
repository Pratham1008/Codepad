-- Database reset script. Do not run this using Flyway.
DROP TABLE IF EXISTS submission_test_results CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS test_cases CASCADE;
DROP TABLE IF EXISTS problem_tags CASCADE;
DROP TABLE IF EXISTS problems CASCADE;
DROP TABLE IF EXISTS workspace_sessions CASCADE;
DROP TABLE IF EXISTS code_snippets CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS event_publication CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS diagnostic_sessions CASCADE;
