DO $$
    DECLARE
        admin_id UUID;
        p4_id UUID := '44444444-4444-4444-4444-444444444444';
        p5_id UUID := '55555555-5555-5555-5555-555555555555';
        p6_id UUID := '66666666-6666-6666-6666-666666666666';
        p7_id UUID := '77777777-7777-7777-7777-777777777777';
        p8_id UUID := '88888888-8888-8888-8888-888888888888';
        p9_id UUID := '99999999-9999-9999-9999-999999999999';
        p10_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    BEGIN
        SELECT user_id INTO admin_id FROM users WHERE email = 'prathamesh10082004@gmail.com';
        DELETE FROM problems WHERE problem_id IN (p4_id, p5_id, p6_id, p7_id, p8_id, p9_id, p10_id);
        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p4_id, 'valid-parentheses', 'Valid Parentheses', 'Given a string `s` containing just the characters `''(''`, `'')''`, `''{''`, `''}''`, `''[''` and `'']''`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA":"class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}","PYTHON":"class Solution:\n    def isValid(self, s):\n        pass","CPP":"#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};","C":"int isValid(char* s) {\n    \n}","JAVASCRIPT":"class Solution {\n    isValid(s) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    isValid(s: string): boolean {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn is_valid(s: String) -> bool {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun isValid(s: String): Boolean {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        System.out.println(new Solution().isValid(s));\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    line = sys.stdin.readline()\n    s = line.rstrip(''\\n'')\n    res = Solution().isValid(s)\n    print(''true'' if res else ''false'')","CPP":"#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s;\n    getline(cin, s);\n    Solution sol;\n    cout << (sol.isValid(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}","C":"#include <stdio.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char buf[10005];\n    buf[0] = 0;\n    if (fgets(buf, sizeof(buf), stdin)) {\n        buf[strcspn(buf, \"\\n\")] = 0;\n    }\n    printf(isValid(buf) ? \"true\\n\" : \"false\\n\");\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst s = fs.readFileSync(0, ''utf-8'').replace(/\\r?\\n+$/, '''');\nconsole.log(new Solution().isValid(s) ? \"true\" : \"false\");","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst s: string = fs.readFileSync(0, ''utf-8'').replace(/\\r?\\n+$/, '''');\nconsole.log(new Solution().isValid(s) ? \"true\" : \"false\");","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let s = input.trim_end_matches(''\\n'').to_string();\n    println!(\"{}\", Solution::is_valid(s));\n}","KOTLIN":"import java.io.BufferedReader\nimport java.io.InputStreamReader\n\n{{USER_CODE}}\n\nfun main() {\n    val br = BufferedReader(InputStreamReader(System.`in`))\n    val s = br.readLine() ?: \"\"\n    println(Solution().isValid(s))\n}"}'::jsonb
        WHERE problem_id = p4_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '()', 'true', TRUE, 0);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '()[]{}', 'true', TRUE, 1);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '(]', 'false', TRUE, 2);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '([)]', 'false', FALSE, 3);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '{[]}', 'true', FALSE, 4);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '', 'true', FALSE, 5);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '(', 'false', FALSE, 6);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, ')', 'false', FALSE, 7);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '(((((((())))))))', 'true', FALSE, 8);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '(((((((()))))))', 'false', FALSE, 9);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '{[()()]}', 'true', FALSE, 10);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '{[(])}', 'false', FALSE, 11);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, ']', 'false', FALSE, 12);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '[', 'false', FALSE, 13);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '()()()()', 'true', FALSE, 14);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '((()))', 'true', FALSE, 15);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '((())', 'false', FALSE, 16);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '{{{{}}}}', 'true', FALSE, 17);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '{{{{}}}}}', 'false', FALSE, 18);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p4_id, '[{()}]', 'true', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p4_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p5_id, 'maximum-subarray', 'Maximum Subarray', 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.

A **subarray** is a contiguous non-empty sequence of elements within an array.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA":"class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}","PYTHON":"class Solution:\n    def maxSubArray(self, nums):\n        pass","CPP":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};","C":"int maxSubArray(int* nums, int numsSize) {\n    \n}","JAVASCRIPT":"class Solution {\n    maxSubArray(nums) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    maxSubArray(nums: number[]): number {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn max_sub_array(nums: Vec<i32>) -> i32 {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun maxSubArray(nums: IntArray): Int {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().maxSubArray(nums));\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(Solution().maxSubArray(nums))","CPP":"#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << sol.maxSubArray(nums) << endl;\n    return 0;\n}","C":"#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", maxSubArray(nums, sz));\n    free(nums);\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().maxSubArray(nums));","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().maxSubArray(nums));","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::max_sub_array(nums));\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().maxSubArray(nums))\n}"}'::jsonb
        WHERE problem_id = p5_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '-2 1 -3 4 -1 2 1 -5 4', '6', TRUE, 0);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '1', '1', TRUE, 1);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '5 4 -1 7 8', '23', TRUE, 2);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '-1', '-1', FALSE, 3);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '-2 -1', '-1', FALSE, 4);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '-1 -2 -3 -4', '-1', FALSE, 5);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '1 2 3 4 5', '15', FALSE, 6);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '0 0 0 0', '0', FALSE, 7);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '-5 -4 -3 -2 -1', '-1', FALSE, 8);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '3 -2 5 -1', '6', FALSE, 9);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '2 -1 2 3 -9 4', '6', FALSE, 10);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '8 -19 5 -4 20', '21', FALSE, 11);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '100', '100', FALSE, 12);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '-100', '-100', FALSE, 13);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '1 -1 1 -1 1', '1', FALSE, 14);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '10 -5 10 -5 10', '20', FALSE, 15);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '-3 -2 -1 -4', '-1', FALSE, 16);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '4 -1 2 1', '6', FALSE, 17);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '-8 3 -1 4 -2 5', '9', FALSE, 18);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p5_id, '1 2 -1 2 -1 2', '5', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p5_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p6_id, 'best-time-to-buy-and-sell-stock', 'Best Time to Buy and Sell Stock', 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA":"class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}","PYTHON":"class Solution:\n    def maxProfit(self, prices):\n        pass","CPP":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};","C":"int maxProfit(int* prices, int pricesSize) {\n    \n}","JAVASCRIPT":"class Solution {\n    maxProfit(prices) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    maxProfit(prices: number[]): number {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn max_profit(prices: Vec<i32>) -> i32 {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun maxProfit(prices: IntArray): Int {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().maxProfit(nums));\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(Solution().maxProfit(nums))","CPP":"#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << sol.maxProfit(nums) << endl;\n    return 0;\n}","C":"#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", maxProfit(nums, sz));\n    free(nums);\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().maxProfit(nums));","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().maxProfit(nums));","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::max_profit(nums));\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().maxProfit(nums))\n}"}'::jsonb
        WHERE problem_id = p6_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '7 1 5 3 6 4', '5', TRUE, 0);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '7 6 4 3 1', '0', TRUE, 1);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '1 2', '1', TRUE, 2);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '2 1', '0', FALSE, 3);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '3 3 5 0 0 3 1 4', '4', FALSE, 4);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '1', '0', FALSE, 5);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '1 2 3 4 5', '4', FALSE, 6);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '5 4 3 2 1', '0', FALSE, 7);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '2 4 1', '2', FALSE, 8);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '3 2 6 5 0 3', '4', FALSE, 9);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '1 2 4 2 5 7 2 4 9 0', '8', FALSE, 10);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '10 22 5 75 65 80', '75', FALSE, 11);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '100', '0', FALSE, 12);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '1 1 1 1', '0', FALSE, 13);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '2 1 2 1 0 1 2', '2', FALSE, 14);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '9 8 7 6 5 4 3 2 1', '0', FALSE, 15);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '1 9 2 8 3 7', '8', FALSE, 16);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '6 1 3 2 4 7', '6', FALSE, 17);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '1 4 2', '3', FALSE, 18);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p6_id, '3 1 4 1 5 9 2 6', '8', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p6_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p7_id, 'contains-duplicate', 'Contains Duplicate', 'Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA":"class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}","PYTHON":"class Solution:\n    def containsDuplicate(self, nums):\n        pass","CPP":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        \n    }\n};","C":"int containsDuplicate(int* nums, int numsSize) {\n    \n}","JAVASCRIPT":"class Solution {\n    containsDuplicate(nums) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    containsDuplicate(nums: number[]): boolean {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn contains_duplicate(nums: Vec<i32>) -> bool {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun containsDuplicate(nums: IntArray): Boolean {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().containsDuplicate(nums));\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(''true'' if Solution().containsDuplicate(nums) else ''false'')","CPP":"#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << (sol.containsDuplicate(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}","C":"#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(containsDuplicate(nums, sz) ? \"true\\n\" : \"false\\n\");\n    free(nums);\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().containsDuplicate(nums) ? \"true\" : \"false\");","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().containsDuplicate(nums) ? \"true\" : \"false\");","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::contains_duplicate(nums));\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().containsDuplicate(nums))\n}"}'::jsonb
        WHERE problem_id = p7_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1 2 3 1', 'true', TRUE, 0);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1 2 3 4', 'false', TRUE, 1);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1 1 1 3 3 4 3 2 4 2', 'true', TRUE, 2);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1', 'false', FALSE, 3);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '0 0', 'true', FALSE, 4);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '-1 -2 -3', 'false', FALSE, 5);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '5 5', 'true', FALSE, 6);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '10 20 30 40 50', 'false', FALSE, 7);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1 2 3 4 5 1', 'true', FALSE, 8);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '100 200 300 100', 'true', FALSE, 9);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '7 8 9 10', 'false', FALSE, 10);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '-5 -5 5 5', 'true', FALSE, 11);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '0', 'false', FALSE, 12);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1 2 3 4 5 6 7 8 9 10', 'false', FALSE, 13);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '3 3 3 3', 'true', FALSE, 14);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '2 4 6 8 10 2', 'true', FALSE, 15);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1 3 5 7 9', 'false', FALSE, 16);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '-1 0 1 -1', 'true', FALSE, 17);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1000000 999999 1000000', 'true', FALSE, 18);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p7_id, '1 2', 'false', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p7_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p8_id, 'single-number', 'Single Number', 'Given a non-empty array of integers `nums`, every element appears **twice** except for one. Find that single one.

Your algorithm should have a linear runtime complexity. Can you implement it without using extra memory?', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA":"class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}","PYTHON":"class Solution:\n    def singleNumber(self, nums):\n        pass","CPP":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};","C":"int singleNumber(int* nums, int numsSize) {\n    \n}","JAVASCRIPT":"class Solution {\n    singleNumber(nums) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    singleNumber(nums: number[]): number {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn single_number(nums: Vec<i32>) -> i32 {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun singleNumber(nums: IntArray): Int {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().singleNumber(nums));\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(Solution().singleNumber(nums))","CPP":"#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << sol.singleNumber(nums) << endl;\n    return 0;\n}","C":"#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", singleNumber(nums, sz));\n    free(nums);\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().singleNumber(nums));","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().singleNumber(nums));","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::single_number(nums));\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().singleNumber(nums))\n}"}'::jsonb
        WHERE problem_id = p8_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '2 2 1', '1', TRUE, 0);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '4 1 2 1 2', '4', TRUE, 1);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '1', '1', TRUE, 2);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '0 1 0', '1', FALSE, 3);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '5 3 5', '3', FALSE, 4);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '-1 -1 -2', '-2', FALSE, 5);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '7 3 7 9 3', '9', FALSE, 6);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '10 20 10', '20', FALSE, 7);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '100 200 100 300 300', '200', FALSE, 8);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '1 1 2 2 3', '3', FALSE, 9);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '8 4 4 8 9', '9', FALSE, 10);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '6 6 15', '15', FALSE, 11);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '-3 -3 -7', '-7', FALSE, 12);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '50 60 50', '60', FALSE, 13);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '2 2 3 3 4', '4', FALSE, 14);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '11 22 11', '22', FALSE, 15);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '0 0 5', '5', FALSE, 16);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '9 8 9', '8', FALSE, 17);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '1000 2000 1000', '2000', FALSE, 18);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p8_id, '-100 -200 -100', '-200', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p8_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p9_id, 'majority-element', 'Majority Element', 'Given an array `nums` of size `n`, return the **majority element**.

The majority element is the element that appears **more than `⌊n / 2⌋`** times. You may assume that the majority element always exists in the array.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA":"class Solution {\n    public int majorityElement(int[] nums) {\n        \n    }\n}","PYTHON":"class Solution:\n    def majorityElement(self, nums):\n        pass","CPP":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        \n    }\n};","C":"int majorityElement(int* nums, int numsSize) {\n    \n}","JAVASCRIPT":"class Solution {\n    majorityElement(nums) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    majorityElement(nums: number[]): number {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn majority_element(nums: Vec<i32>) -> i32 {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun majorityElement(nums: IntArray): Int {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().majorityElement(nums));\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(Solution().majorityElement(nums))","CPP":"#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << sol.majorityElement(nums) << endl;\n    return 0;\n}","C":"#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", majorityElement(nums, sz));\n    free(nums);\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().majorityElement(nums));","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().majorityElement(nums));","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::majority_element(nums));\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().majorityElement(nums))\n}"}'::jsonb
        WHERE problem_id = p9_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '3 2 3', '3', TRUE, 0);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '2 2 1 1 1 2 2', '2', TRUE, 1);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '1', '1', TRUE, 2);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '1 1 2', '1', FALSE, 3);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '6 5 5', '5', FALSE, 4);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '0 0 0 1 1', '0', FALSE, 5);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '4 4 4 4 1 2 3', '4', FALSE, 6);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '9 9 9 9 9 1 2 3 4', '9', FALSE, 7);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '5 5 5 1 1', '5', FALSE, 8);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '2 2 2 3 3', '2', FALSE, 9);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '7 7 7 7 7 7 1 2 3 4 5', '7', FALSE, 10);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '8 1 8 8 2', '8', FALSE, 11);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '3 3 4', '3', FALSE, 12);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '10 10 10 20 20', '10', FALSE, 13);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '1 2 1', '1', FALSE, 14);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '-1 -1 -1 2 3', '-1', FALSE, 15);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '5 1 5 5 3', '5', FALSE, 16);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '6 6 6 6 1', '6', FALSE, 17);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '2 1 2', '2', FALSE, 18);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p9_id, '0 0 1', '0', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p9_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p10_id, 'climbing-stairs', 'Climbing Stairs', 'You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA":"class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}","PYTHON":"class Solution:\n    def climbStairs(self, n):\n        pass","CPP":"class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};","C":"int climbStairs(int n) {\n    \n}","JAVASCRIPT":"class Solution {\n    climbStairs(n) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    climbStairs(n: number): number {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn climb_stairs(n: i32) -> i32 {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun climbStairs(n: Int): Int {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        System.out.println(new Solution().climbStairs(n));\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    s = sys.stdin.read().split()\n    if s:\n        n = int(s[0])\n        print(Solution().climbStairs(n))","CPP":"#include <iostream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        Solution sol;\n        cout << sol.climbStairs(n) << endl;\n    }\n    return 0;\n}","C":"#include <stdio.h>\n\n{{USER_CODE}}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(\"%d\\n\", climbStairs(n));\n    }\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst input = fs.readFileSync(0, ''utf-8'').trim();\nif (input) {\n    console.log(new Solution().climbStairs(parseInt(input, 10)));\n}","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst input: string = fs.readFileSync(0, ''utf-8'').trim();\nif (input) {\n    console.log(new Solution().climbStairs(parseInt(input, 10)));\n}","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    if let Ok(n) = input.trim().parse::<i32>() {\n        println!(\"{}\", Solution::climb_stairs(n));\n    }\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    if (!sc.hasNextInt()) return\n    val n = sc.nextInt()\n    println(Solution().climbStairs(n))\n}"}'::jsonb
        WHERE problem_id = p10_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '1', '1', TRUE, 0);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '2', '2', TRUE, 1);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '3', '3', TRUE, 2);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '4', '5', FALSE, 3);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '5', '8', FALSE, 4);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '6', '13', FALSE, 5);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '7', '21', FALSE, 6);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '8', '34', FALSE, 7);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '9', '55', FALSE, 8);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '10', '89', FALSE, 9);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '11', '144', FALSE, 10);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '12', '233', FALSE, 11);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '13', '377', FALSE, 12);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '14', '610', FALSE, 13);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '15', '987', FALSE, 14);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '16', '1597', FALSE, 15);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '17', '2584', FALSE, 16);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '18', '4181', FALSE, 17);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '20', '10946', FALSE, 18);

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p10_id, '30', '1346269', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p10_id;

    END $$;
