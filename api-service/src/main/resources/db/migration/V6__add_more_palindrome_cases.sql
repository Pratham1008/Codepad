-- V6__add_more_palindrome_cases.sql
-- Add 7 more hidden test cases for Valid Palindrome (problem ID: 54321098-7654-3210-fedc-ba9876543210) to bring the total up to 20

DO $$ 
DECLARE
    p_id UUID := '22222222-2222-2222-2222-222222222222'::uuid;
BEGIN
    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES 
        (gen_random_uuid(), p_id, 'Zeus was deified, saw Suez.', 'true', FALSE, 13),
        (gen_random_uuid(), p_id, 'A Toyota! Race fast, safe car: a Toyota.', 'true', FALSE, 14),
        (gen_random_uuid(), p_id, 'This is definitely not a palindrome at all', 'false', FALSE, 15),
        (gen_random_uuid(), p_id, '1234321', 'true', FALSE, 16),
        (gen_random_uuid(), p_id, '123456', 'false', FALSE, 17),
        (gen_random_uuid(), p_id, 'Are we not pure? "No, sir!" Panama''s moody Noriega brags. "It is garbage!" Irony dooms a man--a prisoner up to new era.', 'true', FALSE, 18),
        (gen_random_uuid(), p_id, 'A man, a plan, a canal, Panama!', 'true', FALSE, 19);
END $$;
