DO $$
DECLARE
    admin_id UUID;
    p11_id UUID := '0000000b-0000-0000-0000-000000000000';
    p12_id UUID := '0000000c-0000-0000-0000-000000000000';
    p13_id UUID := '0000000d-0000-0000-0000-000000000000';
    p14_id UUID := '0000000e-0000-0000-0000-000000000000';
    p15_id UUID := '0000000f-0000-0000-0000-000000000000';
    p16_id UUID := '00000010-0000-0000-0000-000000000000';
    p17_id UUID := '00000011-0000-0000-0000-000000000000';
    p18_id UUID := '00000012-0000-0000-0000-000000000000';
    p19_id UUID := '00000013-0000-0000-0000-000000000000';
    p20_id UUID := '00000014-0000-0000-0000-000000000000';
    p21_id UUID := '00000015-0000-0000-0000-000000000000';
    p22_id UUID := '00000016-0000-0000-0000-000000000000';
    p23_id UUID := '00000017-0000-0000-0000-000000000000';
    p24_id UUID := '00000018-0000-0000-0000-000000000000';
    p25_id UUID := '00000019-0000-0000-0000-000000000000';
    p26_id UUID := '0000001a-0000-0000-0000-000000000000';
    p27_id UUID := '0000001b-0000-0000-0000-000000000000';
    p28_id UUID := '0000001c-0000-0000-0000-000000000000';
    p29_id UUID := '0000001d-0000-0000-0000-000000000000';
    p30_id UUID := '0000001e-0000-0000-0000-000000000000';
    p31_id UUID := '0000001f-0000-0000-0000-000000000000';
    p32_id UUID := '00000020-0000-0000-0000-000000000000';
    p33_id UUID := '00000021-0000-0000-0000-000000000000';
    p34_id UUID := '00000022-0000-0000-0000-000000000000';
    p35_id UUID := '00000023-0000-0000-0000-000000000000';
    p36_id UUID := '00000024-0000-0000-0000-000000000000';
    p37_id UUID := '00000025-0000-0000-0000-000000000000';
    p38_id UUID := '00000026-0000-0000-0000-000000000000';
    p39_id UUID := '00000027-0000-0000-0000-000000000000';
    p40_id UUID := '00000028-0000-0000-0000-000000000000';
    p41_id UUID := '00000029-0000-0000-0000-000000000000';
    p42_id UUID := '0000002a-0000-0000-0000-000000000000';
    p43_id UUID := '0000002b-0000-0000-0000-000000000000';
    p44_id UUID := '0000002c-0000-0000-0000-000000000000';
    p45_id UUID := '0000002d-0000-0000-0000-000000000000';
    p46_id UUID := '0000002e-0000-0000-0000-000000000000';
    p47_id UUID := '0000002f-0000-0000-0000-000000000000';
    p48_id UUID := '00000030-0000-0000-0000-000000000000';
    p49_id UUID := '00000031-0000-0000-0000-000000000000';
    p50_id UUID := '00000032-0000-0000-0000-000000000000';
BEGIN
    SELECT user_id INTO admin_id FROM users WHERE email = 'prathamesh10082004@gmail.com';
    IF admin_id IS NULL THEN
        RAISE EXCEPTION 'Seed admin user not found — run V-prior first';
    END IF;

    DELETE FROM problems WHERE problem_id IN (p11_id, p12_id, p13_id, p14_id, p15_id, p16_id, p17_id, p18_id, p19_id, p20_id, p21_id, p22_id, p23_id, p24_id, p25_id, p26_id, p27_id, p28_id, p29_id, p30_id, p31_id, p32_id, p33_id, p34_id, p35_id, p36_id, p37_id, p38_id, p39_id, p40_id, p41_id, p42_id, p43_id, p44_id, p45_id, p46_id, p47_id, p48_id, p49_id, p50_id);

INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p11_id, 'fizz-buzz', 'Fizz Buzz', 'Given an integer `n`, return a string array `answer` (**1-indexed**) where:
- `answer[i] == "FizzBuzz"` if `i` is divisible by `3` and `5`.
- `answer[i] == "Fizz"` if `i` is divisible by `3`.
- `answer[i] == "Buzz"` if `i` is divisible by `5`.
- `answer[i] == i` (as a string) if none of the above conditions are true.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "import java.util.List;\n\nclass Solution {\n    public List<String> fizzBuzz(int n) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def fizzBuzz(self, n):\n        pass", "CPP": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        \n    }\n};", "C": "#include <stdlib.h>\n\nchar** fizzBuzz(int n, int* returnSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    fizzBuzz(n) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    fizzBuzz(n: number): string[] {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn fizz_buzz(n: i32) -> Vec<String> {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun fizzBuzz(n: Int): List<String> {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            List<String> res = new Solution().fizzBuzz(n);\n            System.out.println(String.join(\" \", res));\n        }\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    if data:\n        n = int(data[0])\n        print(\" \".join(Solution().fizzBuzz(n)))", "CPP": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        Solution sol;\n        vector<string> res = sol.fizzBuzz(n);\n        for (int i = 0; i < res.size(); i++) {\n            cout << res[i] << (i == res.size() - 1 ? \"\" : \" \");\n        }\n        cout << endl;\n    }\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int returnSize = 0;\n        char** res = fizzBuzz(n, &returnSize);\n        for (int i = 0; i < returnSize; i++) {\n            printf(\"%s%s\", res[i], i == returnSize - 1 ? \"\" : \" \");\n            free(res[i]);\n        }\n        printf(\"\\n\");\n        free(res);\n    }\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst input = fs.readFileSync(0, ''utf-8'').trim();\nif (input) {\n    console.log(new Solution().fizzBuzz(Number(input)).join(\" \"));\n}", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst input = fs.readFileSync(0, ''utf-8'').trim();\nif (input) {\n    console.log(new Solution().fizzBuzz(Number(input)).join(\" \"));\n}", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    if let Ok(n) = input.trim().parse::<i32>() {\n        let res = Solution::fizz_buzz(n);\n        println!(\"{}\", res.join(\" \"));\n    }\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    if (sc.hasNextInt()) {\n        val n = sc.nextInt()\n        val res = Solution().fizzBuzz(n)\n        println(res.joinToString(\" \"))\n    }\n}"}'::jsonb
WHERE problem_id = p11_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '3', '1 2 Fizz', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '5', '1 2 Fizz 4 Buzz', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '15', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '1', '1', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '2', '1 2', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '4', '1 2 Fizz 4', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '6', '1 2 Fizz 4 Buzz Fizz', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '7', '1 2 Fizz 4 Buzz Fizz 7', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '8', '1 2 Fizz 4 Buzz Fizz 7 8', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '9', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '10', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '11', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '12', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '13', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '14', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '16', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '20', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '30', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz Fizz 22 23 Fizz Buzz 26 Fizz 28 29 FizzBuzz', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '45', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz Fizz 22 23 Fizz Buzz 26 Fizz 28 29 FizzBuzz 31 32 Fizz 34 Buzz Fizz 37 38 Fizz Buzz 41 Fizz 43 44 FizzBuzz', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p11_id, '100', '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz Fizz 22 23 Fizz Buzz 26 Fizz 28 29 FizzBuzz 31 32 Fizz 34 Buzz Fizz 37 38 Fizz Buzz 41 Fizz 43 44 FizzBuzz 46 47 Fizz 49 Buzz Fizz 52 53 Fizz Buzz 56 Fizz 58 59 FizzBuzz 61 62 Fizz 64 Buzz Fizz 67 68 Fizz Buzz 71 Fizz 73 74 FizzBuzz 76 77 Fizz 79 Buzz Fizz 82 83 Fizz Buzz 86 Fizz 88 89 FizzBuzz 91 92 Fizz 94 Buzz Fizz 97 98 Fizz Buzz', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p11_id;


INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p12_id, 'move-zeroes', 'Move Zeroes', 'Given an integer array `nums`, move all `0`''s to the end of it while maintaining the relative order of the non-zero elements.
**Note** that you must do this in-place without making a copy of the array.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public void moveZeroes(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def moveZeroes(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        \n    }\n};", "C": "void moveZeroes(int* nums, int numsSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    moveZeroes(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    moveZeroes(nums: number[]): void {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn move_zeroes(nums: &mut Vec<i32>) {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun moveZeroes(nums: IntArray): Unit {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        new Solution().moveZeroes(nums);\n        for (int i = 0; i < nums.length; i++) {\n            System.out.print(nums[i] + (i == nums.length - 1 ? \"\" : \" \"));\n        }\n        System.out.println();\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    Solution().moveZeroes(nums)\n    print(\" \".join(map(str, nums)))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    sol.moveZeroes(nums);\n    for (int i = 0; i < nums.size(); i++) {\n        cout << nums[i] << (i == nums.size() - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    moveZeroes(nums, sz);\n    for (int i = 0; i < sz; i++) {\n        printf(\"%d%s\", nums[i], i == sz - 1 ? \"\" : \" \");\n    }\n    printf(\"\\n\");\n    free(nums);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nnew Solution().moveZeroes(nums);\nconsole.log(nums.join(\" \"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nnew Solution().moveZeroes(nums);\nconsole.log(nums.join(\" \"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    Solution::move_zeroes(&mut nums);\n    let strings: Vec<String> = nums.into_iter().map(|x| x.to_string()).collect();\n    println!(\"{}\", strings.join(\" \"));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    Solution().moveZeroes(nums)\n    println(nums.joinToString(\" \"))\n}"}'::jsonb
WHERE problem_id = p12_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 1 0 3 12', '1 3 12 0 0', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0', '0', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '1 0 2 0 3', '1 2 3 0 0', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '1 2 3', '1 2 3', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 0 0', '0 0 0', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '4 2 4 0 0 3 0 5 1 0', '4 2 4 3 5 1 0 0 0 0', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 0 1', '1 0 0', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '1 0 0', '1 0 0', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 1', '1 0', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '1 0', '1 0', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 2 0 4 0 6', '2 4 6 0 0 0', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 0 0 1 0 0', '1 0 0 0 0 0', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '5 4 3 2 1', '5 4 3 2 1', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '-1 0 -2 0 -3', '-1 -2 -3 0 0', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 -1 0 -2', '-1 -2 0 0', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '1 1 1 0 0 0', '1 1 1 0 0 0', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 0 0 1 1 1', '1 1 1 0 0 0', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '10 20 0 30 0 40 50', '10 20 30 40 50 0 0', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '0 0 0 0 0 0 1', '1 0 0 0 0 0 0', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p12_id, '100 0 200 0 300', '100 200 300 0 0', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p12_id;


INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p13_id, 'plus-one', 'Plus One', 'You are given a **large integer** represented as an integer array `digits`, where each `digits[i]` is the `i`-th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading `0`''s.
Increment the large integer by one and return the resulting array of digits.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int[] plusOne(int[] digits) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def plusOne(self, digits):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        \n    }\n};", "C": "int* plusOne(int* digits, int digitsSize, int* returnSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    plusOne(digits) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    plusOne(digits: number[]): number[] {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn plus_one(digits: Vec<i32>) -> Vec<i32> {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun plusOne(digits: IntArray): IntArray {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        int[] res = new Solution().plusOne(nums);\n        for (int i = 0; i < res.length; i++) {\n            System.out.print(res[i] + (i == res.length - 1 ? \"\" : \" \"));\n        }\n        System.out.println();\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    res = Solution().plusOne(nums)\n    print(\" \".join(map(str, res)))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    vector<int> res = sol.plusOne(nums);\n    for (int i = 0; i < res.size(); i++) {\n        cout << res[i] << (i == res.size() - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    int returnSize = 0;\n    int* res = plusOne(nums, sz, &returnSize);\n    for (int i = 0; i < returnSize; i++) {\n        printf(\"%d%s\", res[i], i == returnSize - 1 ? \"\" : \" \");\n    }\n    printf(\"\\n\");\n    free(nums);\n    free(res);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconst res = new Solution().plusOne(nums);\nconsole.log(res.join(\" \"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconst res = new Solution().plusOne(nums);\nconsole.log(res.join(\" \"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let res = Solution::plus_one(nums);\n    let strings: Vec<String> = res.into_iter().map(|x| x.to_string()).collect();\n    println!(\"{}\", strings.join(\" \"));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    val res = Solution().plusOne(nums)\n    println(res.joinToString(\" \"))\n}"}'::jsonb
WHERE problem_id = p13_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '1 2 3', '1 2 4', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '4 3 2 1', '4 3 2 2', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '9', '1 0', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '9 9', '1 0 0', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '8 9 9 9', '9 0 0 0', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '0', '1', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '1 0', '1 1', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '1 9', '2 0', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '9 8 9', '9 9 0', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '5 6 7 8', '5 6 7 9', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '2 9 9', '3 0 0', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '9 9 9 9', '1 0 0 0 0', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '1 0 0 0', '1 0 0 1', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '7 2 8 5 0 9 1 2 9 5 3 6 6 7 3 2 8 4 3 7 9 5 7 7 4 7 4 9 4 7 0 1 1 1 7 4 0 0 6', '7 2 8 5 0 9 1 2 9 5 3 6 6 7 3 2 8 4 3 7 9 5 7 7 4 7 4 9 4 7 0 1 1 1 7 4 0 0 7', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9', '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '4 9 9 9 9', '5 0 0 0 0', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '3 0', '3 1', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '8 0 9 9', '8 1 0 0', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '1 9 9 9 9 9 9', '2 0 0 0 0 0 0', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p13_id, '2 8', '2 9', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p13_id;


INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p14_id, 'remove-duplicates-from-sorted-array', 'Remove Duplicates from Sorted Array', 'Given an integer array `nums` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only **once**. The **relative order** of the elements should be kept the **same**. Return `k` after placing the final result in the first `k` slots of `nums`.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def removeDuplicates(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        \n    }\n};", "C": "int removeDuplicates(int* nums, int numsSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    removeDuplicates(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    removeDuplicates(nums: number[]): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn remove_duplicates(nums: &mut Vec<i32>) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun removeDuplicates(nums: IntArray): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().removeDuplicates(nums));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(Solution().removeDuplicates(nums))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << sol.removeDuplicates(nums) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", removeDuplicates(nums, sz));\n    free(nums);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().removeDuplicates(nums));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().removeDuplicates(nums));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::remove_duplicates(&mut nums));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().removeDuplicates(nums))\n}"}'::jsonb
WHERE problem_id = p14_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '1 1 2', '2', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '0 0 1 1 1 2 2 3 3 4', '5', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '1', '1', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '1 2 3', '3', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '1 1 1 1', '1', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '2 2 3 3', '2', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '0 1 2 3 4', '5', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '5 5 5 5 5 5 5', '1', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '-1 -1 0 0 1 1', '3', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '-10 -10 -5 0 0 0 3', '4', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '1 2 2 2 3 4 5 5', '5', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '0 0 0 0 0 1 2 3 3 3 4 5 5', '6', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '10 10 20 20 30 30', '3', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '-3 -2 -1 0 1 2 3', '7', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '-100 -100 -100 -100', '1', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '1 2 3 4 5 6 7 8 9 9', '9', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '0 1 1 1 1 1 1 1 2', '3', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '7 7 8 8 9 9 10', '4', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '-5 -4 -3 -2 -1 0 1 2 3 4 5', '11', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p14_id, '2 2 2 2 2 2 2 3', '2', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p14_id;


INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p15_id, 'search-insert-position', 'Search Insert Position', 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You must write an algorithm with `O(log n)` runtime complexity.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def searchInsert(self, nums, target):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        \n    }\n};", "C": "int searchInsert(int* nums, int numsSize, int target) {\n    \n}", "JAVASCRIPT": "class Solution {\n    searchInsert(nums, target) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    searchInsert(nums: number[], target: number): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn search_insert(nums: Vec<i32>, target: i32) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun searchInsert(nums: IntArray, target: Int): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int target = list.remove(list.size() - 1);\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().searchInsert(nums, target));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    target = nums.pop()\n    print(Solution().searchInsert(nums, target))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    int target = nums.back();\n    nums.pop_back();\n    Solution sol;\n    cout << sol.searchInsert(nums, target) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    int target = nums[sz - 1];\n    sz--;\n    printf(\"%d\\n\", searchInsert(nums, sz, target));\n    free(nums);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconst target = nums.pop();\nconsole.log(new Solution().searchInsert(nums, target));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconst target = nums.pop();\nconsole.log(new Solution().searchInsert(nums, target));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let target = nums.pop().unwrap();\n    println!(\"{}\", Solution::search_insert(nums, target));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val target = list.removeAt(list.size - 1)\n    val nums = list.toIntArray()\n    println(Solution().searchInsert(nums, target))\n}"}'::jsonb
WHERE problem_id = p15_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 3 5 6 5', '2', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 3 5 6 2', '1', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 3 5 6 7', '4', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 3 5 6 0', '0', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 3', '0', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 3', '1', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 3', '2', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 2 4 6 7 3', '2', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 2 4 6 7 5', '3', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 2 4 6 7 8', '5', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '1 2 4 6 7 -1', '0', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '-5 -3 0 2 4 5 -4', '1', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '-5 -3 0 2 4 5 1', '3', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '-5 -3 0 2 4 5 10', '6', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '10 20 30 40 50 25', '2', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '10 20 30 40 50 50', '4', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '10 20 30 40 50 10', '0', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '-100 -50 0 50 100 0', '2', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '-100 -50 0 50 100 75', '4', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p15_id, '5 5', '0', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p15_id;


INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p16_id, 'roman-to-integer', 'Roman to Integer', 'Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

| Symbol | Value |
|--------|-------|
| I      | 1     |
| V      | 5     |
| X      | 10    |
| L      | 50    |
| C      | 100   |
| D      | 500   |
| M      | 1000  |

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. There are six instances where subtraction is used:
- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int romanToInt(String s) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def romanToInt(self, s):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int romanToInt(string s) {\n        \n    }\n};", "C": "int romanToInt(char* s) {\n    \n}", "JAVASCRIPT": "class Solution {\n    romanToInt(s) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    romanToInt(s: string): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn roman_to_int(s: String) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun romanToInt(s: String): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNext() ? sc.next() : \"\";\n        System.out.println(new Solution().romanToInt(s));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    s = sys.stdin.read().strip()\n    print(Solution().romanToInt(s))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s;\n    if (cin >> s) {\n        Solution sol;\n        cout << sol.romanToInt(s) << endl;\n    }\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char s[20];\n    if (scanf(\"%19s\", s) == 1) {\n        printf(\"%d\\n\", romanToInt(s));\n    }\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst s = fs.readFileSync(0, ''utf-8'').trim();\nconsole.log(new Solution().romanToInt(s));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst s = fs.readFileSync(0, ''utf-8'').trim();\nconsole.log(new Solution().romanToInt(s));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let s = input.trim().to_string();\n    println!(\"{}\", Solution::roman_to_int(s));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    if (sc.hasNext()) {\n        val s = sc.next()\n        println(Solution().romanToInt(s))\n    }\n}"}'::jsonb
WHERE problem_id = p16_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'III', '3', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'LVIII', '58', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'MCMXCIV', '1994', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'IV', '4', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'IX', '9', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'XI', '11', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'XX', '20', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'XIV', '14', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'CD', '400', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'XC', '90', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'XL', '40', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'M', '1000', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'MM', '2000', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'MMM', '3000', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'CM', '900', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'DC', '600', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'DCCLXXXIX', '789', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'MMMDCCCLXXXVIII', '3888', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'XCIX', '99', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p16_id, 'L', '50', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p16_id;


INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p17_id, 'missing-number', 'Missing Number', 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def missingNumber(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};", "C": "int missingNumber(int* nums, int numsSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    missingNumber(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    missingNumber(nums: number[]): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn missing_number(nums: Vec<i32>) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun missingNumber(nums: IntArray): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().missingNumber(nums));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(Solution().missingNumber(nums))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << sol.missingNumber(nums) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", missingNumber(nums, sz));\n    free(nums);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().missingNumber(nums));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().missingNumber(nums));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::missing_number(nums));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().missingNumber(nums))\n}"}'::jsonb
WHERE problem_id = p17_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '3 0 1', '2', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '0 1', '2', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '9 6 4 2 3 5 7 0 1', '8', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '0', '1', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '1', '0', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '1 2 3', '0', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '0 2 3', '1', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '4 3 2 1', '0', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '0 1 2 4', '3', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '10 9 8 7 6 4 3 2 1 0', '5', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20', '21', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '5 0 2 4 1', '3', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '2 0', '1', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '0 1 2 3 4 5 6 7 9', '8', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '1 2 3 4 5 6 7 8 9 10', '0', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '0 1 2 3 4 5 6 7 8 9', '10', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '6 4 3 2 1 0', '5', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '7 6 5 4 3 2 1', '0', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '2 1 4 3 6 5 0', '7', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p17_id, '8 7 6 5 4 3 2 1 0', '9', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p17_id;


INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p18_id, 'power-of-two', 'Power of Two', 'Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
An integer `n` is a power of two if there exists an integer `x` such that `n == 2^x`.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public boolean isPowerOfTwo(int n) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def isPowerOfTwo(self, n):\n        pass", "CPP": "class Solution {\npublic:\n    bool isPowerOfTwo(int n) {\n        \n    }\n};", "C": "#include <stdbool.h>\n\nbool isPowerOfTwo(int n) {\n    \n}", "JAVASCRIPT": "class Solution {\n    isPowerOfTwo(n) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    isPowerOfTwo(n: number): boolean {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn is_power_of_two(n: i32) -> bool {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun isPowerOfTwo(n: Int): Boolean {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            System.out.println(new Solution().isPowerOfTwo(sc.nextInt()));\n        }\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    if data:\n        res = Solution().isPowerOfTwo(int(data[0]))\n        print(''true'' if res else ''false'')", "CPP": "#include <iostream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        Solution sol;\n        cout << (sol.isPowerOfTwo(n) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdbool.h>\n\n{{USER_CODE}}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(isPowerOfTwo(n) ? \"true\\n\" : \"false\\n\");\n    }\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst input = fs.readFileSync(0, ''utf-8'').trim();\nif (input) {\n    console.log(new Solution().isPowerOfTwo(Number(input)) ? \"true\" : \"false\");\n}", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst input = fs.readFileSync(0, ''utf-8'').trim();\nif (input) {\n    console.log(new Solution().isPowerOfTwo(Number(input)) ? \"true\" : \"false\");\n}", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    if let Ok(n) = input.trim().parse::<i32>() {\n        println!(\"{}\", Solution::is_power_of_two(n));\n    }\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    if (sc.hasNextInt()) {\n        println(Solution().isPowerOfTwo(sc.nextInt()))\n    }\n}"}'::jsonb
WHERE problem_id = p18_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '1', 'true', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '16', 'true', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '3', 'false', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '4', 'true', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '5', 'false', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '8', 'true', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '10', 'false', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '32', 'true', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '0', 'false', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '-16', 'false', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '64', 'true', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '128', 'true', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '256', 'true', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '512', 'true', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '1024', 'true', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '2048', 'true', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '4096', 'true', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '30', 'false', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '8192', 'true', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p18_id, '-2147483648', 'false', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p18_id;


    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p19_id, 'palindrome-number', 'Palindrome Number', 'Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.

An integer is a **palindrome** when it reads the same forward and backward.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

    UPDATE problems
    SET starter_code = '{"JAVA": "class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def isPalindrome(self, x):\n        pass", "CPP": "class Solution {\npublic:\n    bool isPalindrome(int x) {\n        \n    }\n};", "C": "#include <stdbool.h>\nbool isPalindrome(int x) {\n    \n}", "JAVASCRIPT": "class Solution {\n    isPalindrome(x) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    isPalindrome(x: number): boolean {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn is_palindrome(x: i32) -> bool {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun isPalindrome(x: Int): Boolean {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        System.out.println(new Solution().isPalindrome(x));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == \"__main__\":\n    x = int(sys.stdin.read().strip())\n    print(\"true\" if Solution().isPalindrome(x) else \"false\")", "CPP": "#include <iostream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int x;\n    cin >> x;\n    Solution sol;\n    cout << (sol.isPalindrome(x) ? \"true\" : \"false\") << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdbool.h>\n\n{{USER_CODE}}\n\nint main() {\n    int x;\n    scanf(\"%d\", &x);\n    printf(isPalindrome(x) ? \"true\\n\" : \"false\\n\");\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(\"fs\");\nconst x = parseInt(fs.readFileSync(0, \"utf-8\").trim());\nconsole.log(new Solution().isPalindrome(x) ? \"true\" : \"false\");", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from \"fs\";\nconst x: number = parseInt(fs.readFileSync(0, \"utf-8\").trim());\nconsole.log(new Solution().isPalindrome(x) ? \"true\" : \"false\");", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let x: i32 = input.trim().parse().unwrap();\n    println!(\"{}\", Solution::is_palindrome(x));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val x = sc.nextInt()\n    println(Solution().isPalindrome(x))\n}"}'::jsonb
    WHERE problem_id = p19_id;

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '121', 'true', TRUE, 0);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '-121', 'false', TRUE, 1);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '10', 'false', TRUE, 2);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '2630', 'false', FALSE, 3);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '5202', 'false', FALSE, 4);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '-5847', 'false', FALSE, 5);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '-8910', 'false', FALSE, 6);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '-7817', 'false', FALSE, 7);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '7455', 'false', FALSE, 8);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '2753', 'false', FALSE, 9);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '359', 'false', FALSE, 10);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '8485', 'false', FALSE, 11);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '-1599', 'false', FALSE, 12);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '-2301', 'false', FALSE, 13);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '3199', 'false', FALSE, 14);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '3478', 'false', FALSE, 15);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '5487', 'false', FALSE, 16);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '-5439', 'false', FALSE, 17);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '-4458', 'false', FALSE, 18);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p19_id, '8838', 'false', FALSE, 19);

    UPDATE problems SET is_published = TRUE WHERE problem_id = p19_id;

    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p20_id, 'length-of-last-word', 'Length of Last Word', 'Given a string `s` consisting of words and spaces, return the length of the **last** word in the string. A **word** is a maximal substring consisting of non-space characters only.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

    UPDATE problems
    SET starter_code = '{"JAVA": "class Solution {\n    public int lengthOfLastWord(String s) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def lengthOfLastWord(self, s):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLastWord(string s) {\n        \n    }\n};", "C": "int lengthOfLastWord(char* s) {\n    \n}", "JAVASCRIPT": "class Solution {\n    lengthOfLastWord(s) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    lengthOfLastWord(s: string): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn length_of_last_word(s: String) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun lengthOfLastWord(s: String): Int {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        System.out.println(new Solution().lengthOfLastWord(s));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == \"__main__\":\n    s = sys.stdin.readline().strip(\"\\n\")\n    print(Solution().lengthOfLastWord(s))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s;\n    getline(cin, s);\n    Solution sol;\n    cout << sol.lengthOfLastWord(s) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char buf[10005];\n    if (fgets(buf, sizeof(buf), stdin)) {\n        buf[strcspn(buf, \"\\r\\n\")] = 0;\n        printf(\"%d\\n\", lengthOfLastWord(buf));\n    }\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(\"fs\");\nconst s = fs.readFileSync(0, \"utf-8\").replace(/\\r?\\n+$/, \"\");\nconsole.log(new Solution().lengthOfLastWord(s));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from \"fs\";\nconst s: string = fs.readFileSync(0, \"utf-8\").replace(/\\r?\\n+$/, \"\");\nconsole.log(new Solution().lengthOfLastWord(s));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let s = input.trim_end_matches(''\\n'').trim_end_matches(''\\r'').to_string();\n    println!(\"{}\", Solution::length_of_last_word(s));\n}", "KOTLIN": "import java.io.BufferedReader\nimport java.io.InputStreamReader\n\n{{USER_CODE}}\n\nfun main() {\n    val br = BufferedReader(InputStreamReader(System.`in`))\n    val s = br.readLine() ?: \"\"\n    println(Solution().lengthOfLastWord(s))\n}"}'::jsonb
    WHERE problem_id = p20_id;

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'Hello World', '5', TRUE, 0);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, '   fly me   to   the moon  ', '4', TRUE, 1);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'luffy is still joyboy', '6', TRUE, 2);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'test a bb', '2', FALSE, 3);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'test hello world world hello hello world test longword hello', '5', FALSE, 4);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, '   test  ', '4', FALSE, 5);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'bb', '2', FALSE, 6);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, '   a world    ', '5', FALSE, 7);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, '  test     ', '4', FALSE, 8);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, ' bb bb   ', '2', FALSE, 9);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'abc bb longword a longword world foo hello', '5', FALSE, 10);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'longword a hello', '5', FALSE, 11);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, '   test longword test foo hello   ', '5', FALSE, 12);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, ' longword bb bb bar abc bar   ', '3', FALSE, 13);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, '     hello bb bar a world hello     ', '5', FALSE, 14);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'longword foo hello test bar longword abc hello', '5', FALSE, 15);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'a bar a abc longword bar', '3', FALSE, 16);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, 'world bb hello bb a abc abc foo foo bar', '3', FALSE, 17);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, ' longword abc bb bb a a   ', '1', FALSE, 18);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p20_id, '     longword foo bar hello    ', '5', FALSE, 19);

    UPDATE problems SET is_published = TRUE WHERE problem_id = p20_id;

    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p21_id, 'sqrtx', 'Sqrt(x)', 'Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. The returned integer should be **non-negative** as well. You **must not** use any built-in exponent function or operator.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

    UPDATE problems
    SET starter_code = '{"JAVA": "class Solution {\n    public int mySqrt(int x) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def mySqrt(self, x):\n        pass", "CPP": "class Solution {\npublic:\n    int mySqrt(int x) {\n        \n    }\n};", "C": "int mySqrt(int x) {\n    \n}", "JAVASCRIPT": "class Solution {\n    mySqrt(x) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    mySqrt(x: number): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn my_sqrt(x: i32) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun mySqrt(x: Int): Int {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        System.out.println(new Solution().mySqrt(x));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == \"__main__\":\n    x = int(sys.stdin.read().strip())\n    print(Solution().mySqrt(x))", "CPP": "#include <iostream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int x;\n    cin >> x;\n    Solution sol;\n    cout << sol.mySqrt(x) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n\n{{USER_CODE}}\n\nint main() {\n    int x;\n    scanf(\"%d\", &x);\n    printf(\"%d\\n\", mySqrt(x));\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(\"fs\");\nconst x = parseInt(fs.readFileSync(0, \"utf-8\").trim());\nconsole.log(new Solution().mySqrt(x));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from \"fs\";\nconst x: number = parseInt(fs.readFileSync(0, \"utf-8\").trim());\nconsole.log(new Solution().mySqrt(x));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let x: i32 = input.trim().parse().unwrap();\n    println!(\"{}\", Solution::my_sqrt(x));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val x = sc.nextInt()\n    println(Solution().mySqrt(x))\n}"}'::jsonb
    WHERE problem_id = p21_id;

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '4', '2', TRUE, 0);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '8', '2', TRUE, 1);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '0', '0', TRUE, 2);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '7474', '86', FALSE, 3);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '2284', '47', FALSE, 4);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '495', '22', FALSE, 5);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '5402', '73', FALSE, 6);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '9139', '95', FALSE, 7);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '914', '30', FALSE, 8);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '1630', '40', FALSE, 9);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '4515', '67', FALSE, 10);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '5521', '74', FALSE, 11);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '6949', '83', FALSE, 12);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '5844', '76', FALSE, 13);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '2539', '50', FALSE, 14);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '8333', '91', FALSE, 15);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '5142', '71', FALSE, 16);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '1229', '35', FALSE, 17);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '8435', '91', FALSE, 18);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p21_id, '9875', '99', FALSE, 19);

    UPDATE problems SET is_published = TRUE WHERE problem_id = p21_id;

    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p22_id, 'add-binary', 'Add Binary', 'Given two binary strings `a` and `b`, return their sum as a binary string.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

    UPDATE problems
    SET starter_code = '{"JAVA": "class Solution {\n    public String addBinary(String a, String b) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def addBinary(self, a, b):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string addBinary(string a, string b) {\n        \n    }\n};", "C": "char* addBinary(char* a, char* b) {\n    \n}", "JAVASCRIPT": "class Solution {\n    addBinary(a, b) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    addBinary(a: string, b: string): string {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn add_binary(a: String, b: String) -> String {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun addBinary(a: String, b: String): String {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        String b = sc.next();\n        System.out.println(new Solution().addBinary(a, b));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == \"__main__\":\n    lines = sys.stdin.read().split()\n    print(Solution().addBinary(lines[0], lines[1]))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    Solution sol;\n    cout << sol.addBinary(a, b) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    char a[10005], b[10005];\n    scanf(\"%s %s\", a, b);\n    char* res = addBinary(a, b);\n    printf(\"%s\\n\", res);\n    free(res);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(\"fs\");\nconst lines = fs.readFileSync(0, \"utf-8\").trim().split(/\\s+/);\nconsole.log(new Solution().addBinary(lines[0], lines[1]));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from \"fs\";\nconst lines: string[] = fs.readFileSync(0, \"utf-8\").trim().split(/\\s+/);\nconsole.log(new Solution().addBinary(lines[0], lines[1]));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<&str> = input.split_whitespace().collect();\n    println!(\"{}\", Solution::add_binary(parts[0].to_string(), parts[1].to_string()));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val a = sc.next()\n    val b = sc.next()\n    println(Solution().addBinary(a, b))\n}"}'::jsonb
    WHERE problem_id = p22_id;

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '11\n1', '100', TRUE, 0);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1010\n1011', '10101', TRUE, 1);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '0\n0', '0', TRUE, 2);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1011100\n11110011', '101001111', FALSE, 3);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '10010110\n1110010000', '10000100110', FALSE, 4);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '11100111\n11110', '100000101', FALSE, 5);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1000101100\n1011110', '1010001010', FALSE, 6);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1110101000\n110001111', '10100110111', FALSE, 7);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1011010001\n101010010', '10000100011', FALSE, 8);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '11110111\n1111001000', '10010111111', FALSE, 9);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1101111001\n1100110', '1111011111', FALSE, 10);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1\n10011010', '10011011', FALSE, 11);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1011111\n111110010', '1001010001', FALSE, 12);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '10100110\n1001101010', '1100010000', FALSE, 13);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '101111111\n1001101110', '1111101101', FALSE, 14);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '11000000\n1100101011', '1111101011', FALSE, 15);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '100110111\n110101111', '1011100110', FALSE, 16);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '110000001\n101101010', '1011101011', FALSE, 17);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '1100110001\n1101011011', '11010001100', FALSE, 18);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p22_id, '110000010\n111111110', '1110000000', FALSE, 19);

    UPDATE problems SET is_published = TRUE WHERE problem_id = p22_id;

    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p23_id, 'product-of-array-except-self', 'Product of Array Except Self', 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The product of any prefix or suffix of `nums` is guaranteed to fit in a **32-bit** integer. You must write an algorithm that runs in `O(n)` time and without using the division operation.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

    UPDATE problems
    SET starter_code = '{"JAVA": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def productExceptSelf(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};", "C": "int* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    productExceptSelf(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    productExceptSelf(nums: number[]): number[] {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn product_except_self(nums: Vec<i32>) -> Vec<i32> {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun productExceptSelf(nums: IntArray): IntArray {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        int[] ans = new Solution().productExceptSelf(nums);\n        for (int i = 0; i < ans.length; i++) { System.out.print(ans[i] + (i == ans.length - 1 ? \"\" : \" \")); }\n        System.out.println();\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == \"__main__\":\n    nums = [int(x) for x in sys.stdin.read().split()]\n    ans = Solution().productExceptSelf(nums)\n    print(\" \".join(map(str, ans)))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    vector<int> ans = Solution().productExceptSelf(nums);\n    for (size_t i = 0; i < ans.size(); i++) { cout << ans[i] << (i == ans.size() - 1 ? \"\" : \" \"); }\n    cout << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    int returnSize = 0;\n    int* ans = productExceptSelf(nums, sz, &returnSize);\n    for(int i=0; i<returnSize; i++) { printf(\"%d%s\", ans[i], i == returnSize - 1 ? \"\" : \" \"); }\n    printf(\"\\n\");\n    free(nums);\n    free(ans);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(\"fs\");\nconst nums = fs.readFileSync(0, \"utf-8\").trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().productExceptSelf(nums).join(\" \"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from \"fs\";\nconst nums: number[] = fs.readFileSync(0, \"utf-8\").trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().productExceptSelf(nums).join(\" \"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let ans = Solution::product_except_self(nums);\n    println!(\"{}\", ans.iter().map(|x| x.to_string()).collect::<Vec<String>>().join(\" \"));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val ans = Solution().productExceptSelf(list.toIntArray())\n    println(ans.joinToString(\" \"))\n}"}'::jsonb
    WHERE problem_id = p23_id;

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '1 2 3 4', '24 12 8 6', TRUE, 0);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '-1 1 0 -3 3', '0 0 9 0 0', TRUE, 1);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '1 2', '2 1', TRUE, 2);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '-10 1 -7 2 -8 -8 7', '-6272 62720 -8960 31360 -7840 -7840 8960', FALSE, 3);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '0 2 2 5 3 -7 2 -3 6 10', '151200 0 0 0 0 0 0 0 0 0', FALSE, 4);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '-2 -4', '-4 -2', FALSE, 5);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '7 -6 8', '-48 56 -42', FALSE, 6);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '10 -7', '-7 10', FALSE, 7);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '-8 -7 4 0 -1 3 -10 -3 -5', '0 0 0 100800 0 0 0 0 0', FALSE, 8);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '5 2 10 5 6', '600 1500 300 600 500', FALSE, 9);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '4 -10 -6', '60 -24 -40', FALSE, 10);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '8 5 8 -5 1', '-200 -320 -200 320 -1600', FALSE, 11);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '-4 -10 -2 -7 9 3 -3 -2 5 4', '-453600 -181440 -907200 -259200 201600 604800 -604800 -907200 362880 453600', FALSE, 12);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '-4 0 -1', '0 4 0', FALSE, 13);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '10 2', '2 10', FALSE, 14);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '-1 10 -4 -7 0 3 -7 -7 -3', '0 0 0 0 123480 0 0 0 0', FALSE, 15);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '7 8 -3 -5 -6 -5 -10 2 9 -10', '6480000 5670000 -15120000 -9072000 -7560000 -9072000 -4536000 22680000 5040000 -4536000', FALSE, 16);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '0 -3 -8 4 -5 -7 7 10', '235200 0 0 0 0 0 0 0', FALSE, 17);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '-6 -5 0 -2 -9 -4 5 9 -1 -2', '0 0 -194400 0 0 0 0 0 0 0', FALSE, 18);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p23_id, '4 1 -7 0 -8 -9 -5', '0 0 0 10080 0 0 0', FALSE, 19);

    UPDATE problems SET is_published = TRUE WHERE problem_id = p23_id;

    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p24_id, 'rotate-array', 'Rotate Array', 'Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

    UPDATE problems
    SET starter_code = '{"JAVA": "class Solution {\n    public void rotate(int[] nums, int k) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def rotate(self, nums, k):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        \n    }\n};", "C": "void rotate(int* nums, int numsSize, int k) {\n    \n}", "JAVASCRIPT": "class Solution {\n    rotate(nums, k) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    rotate(nums: number[], k: number): void {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn rotate(nums: &mut Vec<i32>, k: i32) {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun rotate(nums: IntArray, k: Int): Unit {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int k = sc.nextInt();\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        new Solution().rotate(nums, k);\n        for (int i = 0; i < nums.length; i++) { System.out.print(nums[i] + (i == nums.length - 1 ? \"\" : \" \")); }\n        System.out.println();\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == \"__main__\":\n    lines = sys.stdin.read().strip().split(\"\\n\")\n    nums = [int(x) for x in lines[0].split()]\n    k = int(lines[1])\n    Solution().rotate(nums, k)\n    print(\" \".join(map(str, nums)))", "CPP": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int val, k;\n    while (ss >> val) nums.push_back(val);\n    cin >> k;\n    Solution sol;\n    sol.rotate(nums, k);\n    for (size_t i = 0; i < nums.size(); i++) { cout << nums[i] << (i == nums.size() - 1 ? \"\" : \" \"); }\n    cout << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val, k;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    char line[10005];\n    fgets(line, sizeof(line), stdin);\n    char* p = line;\n    int offset;\n    while (sscanf(p, \"%d%n\", &val, &offset) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n        p += offset;\n    }\n    scanf(\"%d\", &k);\n    rotate(nums, sz, k);\n    for(int i=0; i<sz; i++) { printf(\"%d%s\", nums[i], i == sz - 1 ? \"\" : \" \"); }\n    printf(\"\\n\");\n    free(nums);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(\"fs\");\nconst lines = fs.readFileSync(0, \"utf-8\").trim().split(\"\\n\");\nconst nums = lines[0].trim().split(/\\s+/).map(Number);\nconst k = Number(lines[1]);\nnew Solution().rotate(nums, k);\nconsole.log(nums.join(\" \"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from \"fs\";\nconst lines: string[] = fs.readFileSync(0, \"utf-8\").trim().split(\"\\n\");\nconst nums: number[] = lines[0].trim().split(/\\s+/).map(Number);\nconst k: number = Number(lines[1]);\nnew Solution().rotate(nums, k);\nconsole.log(nums.join(\" \"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let lines: Vec<&str> = input.trim().split(''\\n'').collect();\n    let mut nums: Vec<i32> = lines[0].split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let k: i32 = lines[1].trim().parse().unwrap();\n    Solution::rotate(&mut nums, k);\n    println!(\"{}\", nums.iter().map(|x| x.to_string()).collect::<Vec<String>>().join(\" \"));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val line = sc.nextLine().trim()\n    val parts = line.split(Regex(\"\\\\s+\"))\n    val nums = parts.map { it.toInt() }.toIntArray()\n    val k = sc.nextInt()\n    Solution().rotate(nums, k)\n    println(nums.joinToString(\" \"))\n}"}'::jsonb
    WHERE problem_id = p24_id;

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '1 2 3 4 5 6 7\n3', '5 6 7 1 2 3 4', TRUE, 0);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-1 -100 3 99\n2', '3 99 -1 -100', TRUE, 1);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '1 2\n3', '2 1', TRUE, 2);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-7 0 0 6 -5 -1 -5 7 -1\n1', '-1 -7 0 0 6 -5 -1 -5 7', FALSE, 3);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-4 -3 3 1 -3 6 1 5 8 -7\n0', '-4 -3 3 1 -3 6 1 5 8 -7', FALSE, 4);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '7 5 4 8 5 -9 -4\n5', '4 8 5 -9 -4 7 5', FALSE, 5);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-3 -6 -6 -10 -5 8 -5 -2 7 7\n13', '-2 7 7 -3 -6 -6 -10 -5 8 -5', FALSE, 6);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-8 3 4 3 7 -5 8 0 8\n15', '3 7 -5 8 0 8 -8 3 4', FALSE, 7);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-9 -1 4 10 2 9 -9\n4', '10 2 9 -9 -9 -1 4', FALSE, 8);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '2 6 -6 8 9 -1 1 -6 1\n9', '2 6 -6 8 9 -1 1 -6 1', FALSE, 9);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-3 4 -7 -2\n10', '-7 -2 -3 4', FALSE, 10);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-3 3 1\n11', '3 1 -3', FALSE, 11);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-2 1 5 -3\n5', '-3 -2 1 5', FALSE, 12);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-7 -10 -10 10 4 2 9\n5', '-10 10 4 2 9 -7 -10', FALSE, 13);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-2 1 -2 4 5 -1 -4 9 6\n11', '9 6 -2 1 -2 4 5 -1 -4', FALSE, 14);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '1 -10 7 7 -8 10 1 2 8 -9\n0', '1 -10 7 7 -8 10 1 2 8 -9', FALSE, 15);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-1\n13', '-1', FALSE, 16);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '1 0 -2 -8 -2 -3 -9\n6', '0 -2 -8 -2 -3 -9 1', FALSE, 17);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '-5 -7 10 0 -10 -2 -4 3\n1', '3 -5 -7 10 0 -10 -2 -4', FALSE, 18);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p24_id, '6 4 -1 1\n3', '4 -1 1 6', FALSE, 19);

    UPDATE problems SET is_published = TRUE WHERE problem_id = p24_id;

    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p25_id, 'container-with-most-water', 'Container With Most Water', 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

    UPDATE problems
    SET starter_code = '{"JAVA": "class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def maxArea(self, height):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};", "C": "int maxArea(int* height, int heightSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    maxArea(height) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    maxArea(height: number[]): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn max_area(height: Vec<i32>) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun maxArea(height: IntArray): Int {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().maxArea(nums));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == \"__main__\":\n    nums = [int(x) for x in sys.stdin.read().split()]\n    print(Solution().maxArea(nums))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << sol.maxArea(nums) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", maxArea(nums, sz));\n    free(nums);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(\"fs\");\nconst nums = fs.readFileSync(0, \"utf-8\").trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().maxArea(nums));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from \"fs\";\nconst nums: number[] = fs.readFileSync(0, \"utf-8\").trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().maxArea(nums));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::max_area(nums));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().maxArea(nums))\n}"}'::jsonb
    WHERE problem_id = p25_id;

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '1 8 6 2 5 4 8 3 7', '49', TRUE, 0);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '1 1', '1', TRUE, 1);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '4 3 2 1 4', '16', TRUE, 2);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '18 40', '18', FALSE, 3);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '5 99 46 95 86 97 42 39 95', '665', FALSE, 4);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '9 91 53 91 91 25 67 82 8 86 40', '688', FALSE, 5);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '67 70', '67', FALSE, 6);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '16 35 56 16', '48', FALSE, 7);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '69 42 48 11 71 9 49', '294', FALSE, 8);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '24 84 50 64 89 25 78 93 49 86 98 70 17 67', '804', FALSE, 9);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '91 61 99 42 10 27 3 55 52 60 66 22 64 100 5 27 94 100 35', '1547', FALSE, 10);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '57 26', '26', FALSE, 11);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '33 40 36 37', '99', FALSE, 12);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '51 52 14 86', '153', FALSE, 13);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '4 40 72 51 29 81 19 78 82 69 92 44 79 49 36 4 83 88 96 85', '1224', FALSE, 14);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '15 56 68 75 77', '168', FALSE, 15);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '77 64 87 33 62 55 17 8 100 26 85', '770', FALSE, 16);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '72 63 8 10 12 76 60 88 24 92 40 43 35 1 75 28 89', '1152', FALSE, 17);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '12 58 92 38 3 54 36 99', '460', FALSE, 18);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p25_id, '56 89 49 85 32 98', '356', FALSE, 19);

    UPDATE problems SET is_published = TRUE WHERE problem_id = p25_id;

    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p26_id, 'find-first-and-last-position', 'Find First and Last Position', 'Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value. If `target` is not found in the array, return `[-1,-1]`. You must write an algorithm with `O(log n)` runtime complexity.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

    UPDATE problems
    SET starter_code = '{"JAVA": "class Solution {\n    public int[] searchRange(int[] nums, int target) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def searchRange(self, nums, target):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> searchRange(vector<int>& nums, int target) {\n        \n    }\n};", "C": "int* searchRange(int* nums, int numsSize, int target, int* returnSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    searchRange(nums, target) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    searchRange(nums: number[], target: number): number[] {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn search_range(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun searchRange(nums: IntArray, target: Int): IntArray {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        int[] nums = new int[0];\n        if (!line.isEmpty()) {\n            String[] parts = line.split(\"\\\\s+\");\n            nums = new int[parts.length];\n            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        }\n        int target = sc.nextInt();\n        int[] ans = new Solution().searchRange(nums, target);\n        System.out.println(ans[0] + \" \" + ans[1]);\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == \"__main__\":\n    lines = sys.stdin.read().strip().split(\"\\n\")\n    nums = [int(x) for x in lines[0].split()] if len(lines) > 0 and lines[0].strip() else []\n    target = int(lines[1]) if len(lines) > 1 else int(lines[0]) if len(lines) == 1 and not nums else 0\n    ans = Solution().searchRange(nums, target)\n    print(f\"{ans[0]} {ans[1]}\")", "CPP": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int val, target;\n    while (ss >> val) nums.push_back(val);\n    cin >> target;\n    Solution sol;\n    vector<int> ans = sol.searchRange(nums, target);\n    cout << ans[0] << \" \" << ans[1] << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val, target;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    char line[10005];\n    if (fgets(line, sizeof(line), stdin)) {\n        char* p = line;\n        int offset;\n        while (sscanf(p, \"%d%n\", &val, &offset) == 1) {\n            if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n            nums[sz++] = val;\n            p += offset;\n        }\n    }\n    scanf(\"%d\", &target);\n    int returnSize = 0;\n    int* ans = searchRange(nums, sz, target, &returnSize);\n    printf(\"%d %d\\n\", ans[0], ans[1]);\n    free(nums);\n    free(ans);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(\"fs\");\nconst lines = fs.readFileSync(0, \"utf-8\").trim().split(\"\\n\");\nconst nums = lines[0].trim() ? lines[0].trim().split(/\\s+/).map(Number) : [];\nconst target = Number(lines[1] || lines[0] || 0);\nconst ans = new Solution().searchRange(nums, target);\nconsole.log(ans.join(\" \"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from \"fs\";\nconst lines: string[] = fs.readFileSync(0, \"utf-8\").trim().split(\"\\n\");\nconst nums: number[] = lines[0].trim() ? lines[0].trim().split(/\\s+/).map(Number) : [];\nconst target: number = Number(lines[1] || lines[0] || 0);\nconst ans = new Solution().searchRange(nums, target);\nconsole.log(ans.join(\" \"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let lines: Vec<&str> = input.trim().split(''\\n'').collect();\n    let nums: Vec<i32> = if lines[0].trim().is_empty() { vec![] } else { lines[0].split_whitespace().map(|x| x.parse().unwrap()).collect() };\n    let target: i32 = if lines.len() > 1 { lines[1].trim().parse().unwrap() } else { lines[0].trim().parse().unwrap() };\n    let ans = Solution::search_range(nums, target);\n    println!(\"{} {}\", ans[0], ans[1]);\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val line = if (sc.hasNextLine()) sc.nextLine().trim() else \"\"\n    val nums = if (line.isNotEmpty()) line.split(Regex(\"\\\\s+\")).map { it.toInt() }.toIntArray() else IntArray(0)\n    val target = sc.nextInt()\n    val ans = Solution().searchRange(nums, target)\n    println(\"${ans[0]} ${ans[1]}\")\n}"}'::jsonb
    WHERE problem_id = p26_id;

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '5 7 7 8 8 10\n8', '3 4', TRUE, 0);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '5 7 7 8 8 10\n6', '-1 -1', TRUE, 1);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '\n0', '-1 -1', TRUE, 2);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '13\n0', '-1 -1', FALSE, 3);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '1 2 3 4 5 8 12 13 14 15 16 16 17\n4', '3 3', FALSE, 4);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '1 2 3 4 5 5 12 14 18 19 20\n12', '6 6', FALSE, 5);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '7 11 14 16 17 19\n9', '-1 -1', FALSE, 6);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '2 5 6 7 10 11 12 15 19 19\n0', '-1 -1', FALSE, 7);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '0 3 4\n9', '-1 -1', FALSE, 8);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '1 2 2 7 9 10 10 16 19 19\n4', '-1 -1', FALSE, 9);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '0 3 4 5 5 9 9 11 14 15 18 18 19 20\n0', '0 0', FALSE, 10);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '0 0 6 9 13 14 16 17 20\n11', '-1 -1', FALSE, 11);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '6 9 11 12 17\n10', '-1 -1', FALSE, 12);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '1 3 4 8 8 8\n16', '-1 -1', FALSE, 13);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '0 0 6 6 7 12 15 16 17 17\n4', '-1 -1', FALSE, 14);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '4 6 8 8 9 9 12 12 14 17 17 18 18 18\n7', '-1 -1', FALSE, 15);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '0 2 2 7 8 9 11 14 14 15 16 17 17 18 19\n3', '-1 -1', FALSE, 16);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '1 2 3 6 8 12 16 18 19\n14', '-1 -1', FALSE, 17);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '1 7 8 11 12 12 13 16 18 18 19 20 20\n11', '3 3', FALSE, 18);

    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
    VALUES (gen_random_uuid(), p26_id, '4 6 15 15 17 18 18\n3', '-1 -1', FALSE, 19);

    UPDATE problems SET is_published = TRUE WHERE problem_id = p26_id;



-- p27: 3Sum
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p27_id, 'three-sum', '3Sum', 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def threeSum(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};", "C": "int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    \n}", "JAVASCRIPT": "class Solution {\n    threeSum(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    threeSum(nums: number[]): number[][] {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun threeSum(nums: IntArray): List<List<Int>> {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        List<List<Integer>> res = new Solution().threeSum(nums);\n        System.out.print(\"[\");\n        for (int i = 0; i < res.size(); i++) {\n            System.out.print(\"[\" + res.get(i).get(0) + \",\" + res.get(i).get(1) + \",\" + res.get(i).get(2) + \"]\");\n            if (i < res.size() - 1) System.out.print(\",\");\n        }\n        System.out.println(\"]\");\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nimport json\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    res = Solution().threeSum(nums)\n    print(json.dumps(res).replace(\" \", \"\"))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    vector<vector<int>> res = sol.threeSum(nums);\n    cout << \"[\";\n    for(size_t i=0; i<res.size(); ++i){\n        cout << \"[\" << res[i][0] << \",\" << res[i][1] << \",\" << res[i][2] << \"]\";\n        if(i < res.size()-1) cout << \",\";\n    }\n    cout << \"]\\n\";\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    int returnSize;\n    int* returnColumnSizes;\n    int** res = threeSum(nums, sz, &returnSize, &returnColumnSizes);\n    printf(\"[\");\n    for(int i=0; i<returnSize; ++i){\n        printf(\"[%d,%d,%d]\", res[i][0], res[i][1], res[i][2]);\n        if(i < returnSize-1) printf(\",\");\n    }\n    printf(\"]\\n\");\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(JSON.stringify(new Solution().threeSum(nums)));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(JSON.stringify(new Solution().threeSum(nums)));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let res = Solution::three_sum(nums);\n    let out = res.iter().map(|v| format!(\"[{}]\", v.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(\",\"))).collect::<Vec<_>>().join(\",\");\n    println!(\"[{}]\", out);\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    val res = Solution().threeSum(nums)\n    print(\"[\")\n    for (i in res.indices) {\n        print(\"[${res[i][0]},${res[i][1]},${res[i][2]}]\")\n        if (i < res.size - 1) print(\",\")\n    }\n    println(\"]\")\n}"}'::jsonb
WHERE problem_id = p27_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '-1 0 1 2 -1 -4', '[[-1,-1,2],[-1,0,1]]', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '0 1 1', '[]', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '0 0 0', '[[0,0,0]]', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '0 0 0 0', '[[0,0,0]]', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '-2 0 1 1 2', '[[-2,0,2],[-2,1,1]]', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '-2 0 0 2 2', '[[-2,0,2]]', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '1 2 -2 -1', '[]', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '3 -2 1 0 -1', '[[-2,-1,3]]', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '1 1 -2', '[[-2,1,1]]', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '-4 2 2 -2 -2', '[[-4,2,2]]', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '-1 0 1 2 -1 -4 -2 -3 3 0 4', '[[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '-1 0 1 -1 0 1', '[[-1,0,1]]', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '1 2 3', '[]', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '0 0', '[]', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '0', '[]', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '-1 0', '[]', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '3 0 -2 -1 1 2', '[[-2,-1,3],[-2,0,2],[-1,0,1]]', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '1 2 3 4 5 -1 -2 -3 -4 -5 0 0 0', '[[-5,0,5],[-5,1,4],[-5,2,3],[-4,-1,5],[-4,0,4],[-4,1,3],[-3,-2,5],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,0,1],[0,0,0]]', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '-1 1 -1 1', '[]', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p27_id, '1 -1 1 -1 0', '[[-1,0,1]]', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p27_id;

-- p28: Longest Substring Without Repeating Characters
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p28_id, 'longest-substring-without-repeating-characters', 'Longest Substring Without Repeating Characters', 'Given a string `s`, find the length of the **longest substring** without repeating characters.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def lengthOfLongestSubstring(self, s):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};", "C": "int lengthOfLongestSubstring(char* s) {\n    \n}", "JAVASCRIPT": "class Solution {\n    lengthOfLongestSubstring(s) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    lengthOfLongestSubstring(s: string): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn length_of_longest_substring(s: String) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun lengthOfLongestSubstring(s: String): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        System.out.println(new Solution().lengthOfLongestSubstring(s));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    line = sys.stdin.readline()\n    s = line.rstrip(''\n'')\n    print(Solution().lengthOfLongestSubstring(s))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s;\n    getline(cin, s);\n    Solution sol;\n    cout << sol.lengthOfLongestSubstring(s) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char buf[50005];\n    buf[0] = 0;\n    if (fgets(buf, sizeof(buf), stdin)) {\n        buf[strcspn(buf, \"\\n\")] = 0;\n    }\n    printf(\"%d\\n\", lengthOfLongestSubstring(buf));\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst s = fs.readFileSync(0, ''utf-8'').replace(/\\r?\\n+$/, '''');\nconsole.log(new Solution().lengthOfLongestSubstring(s));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst s: string = fs.readFileSync(0, ''utf-8'').replace(/\\r?\\n+$/, '''');\nconsole.log(new Solution().lengthOfLongestSubstring(s));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let s = input.trim_end_matches(''\n'').to_string();\n    println!(\"{}\", Solution::length_of_longest_substring(s));\n}", "KOTLIN": "import java.io.BufferedReader\nimport java.io.InputStreamReader\n\n{{USER_CODE}}\n\nfun main() {\n    val br = BufferedReader(InputStreamReader(System.`in`))\n    val s = br.readLine() ?: \"\"\n    println(Solution().lengthOfLongestSubstring(s))\n}"}'::jsonb
WHERE problem_id = p28_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'abcabcbb', '3', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'bbbbb', '1', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'pwwkew', '3', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, '', '0', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'a', '1', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'ab', '2', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'dvdf', '3', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'au', '2', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'abba', '2', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'tmmzuxt', '5', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'bpfbhmipx', '7', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'abcdefghijklmnopqrstuvwxyz', '26', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'aabbcc', '2', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'abcdeafghij', '10', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'aabaab!bb', '3', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'ohvhjdml', '6', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'qrsvbspk', '5', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'uqinntq', '4', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, 'jbpnbwwd', '4', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p28_id, '12345678901234567890', '10', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p28_id;

-- p29: Sort Colors
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p29_id, 'sort-colors', 'Sort Colors', 'Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively. You must solve this problem without using the library''s sort function.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public void sortColors(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def sortColors(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        \n    }\n};", "C": "void sortColors(int* nums, int numsSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    sortColors(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    sortColors(nums: number[]): void {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn sort_colors(nums: &mut Vec<i32>) {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun sortColors(nums: IntArray): Unit {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        new Solution().sortColors(nums);\n        for (int i = 0; i < nums.length; i++) {\n            System.out.print(nums[i] + (i == nums.length - 1 ? \"\" : \" \"));\n        }\n        System.out.println();\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    Solution().sortColors(nums)\n    print(\" \".join(map(str, nums)))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    sol.sortColors(nums);\n    for(size_t i=0; i<nums.size(); ++i){\n        cout << nums[i] << (i == nums.size()-1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    sortColors(nums, sz);\n    for(int i=0; i<sz; ++i){\n        printf(\"%d%s\", nums[i], (i == sz-1 ? \"\" : \" \"));\n    }\n    printf(\"\\n\");\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nnew Solution().sortColors(nums);\nconsole.log(nums.join(\" \"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nnew Solution().sortColors(nums);\nconsole.log(nums.join(\" \"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    Solution::sort_colors(&mut nums);\n    let out = nums.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(\" \");\n    println!(\"{}\", out);\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    Solution().sortColors(nums)\n    println(nums.joinToString(\" \"))\n}"}'::jsonb
WHERE problem_id = p29_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '2 0 2 1 1 0', '0 0 1 1 2 2', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '2 0 1', '0 1 2', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '0', '0', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '1', '1', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '2', '2', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '0 0', '0 0', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '1 1', '1 1', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '2 2', '2 2', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '0 1', '0 1', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '1 0', '0 1', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '2 1', '1 2', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '0 2', '0 2', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '2 0', '0 2', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '1 2 0', '0 1 2', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '0 1 2', '0 1 2', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '2 2 1 1 0 0', '0 0 1 1 2 2', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '1 0 2 1 0 2', '0 0 1 1 2 2', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '2 2 2 2 2', '2 2 2 2 2', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '0 0 0 0 0', '0 0 0 0 0', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p29_id, '1 1 1 1 1', '1 1 1 1 1', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p29_id;

-- p30: Jump Game
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p30_id, 'jump-game', 'Jump Game', 'You are given an integer array `nums`. You are initially positioned at the array''s **first index**, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index, or `false` otherwise.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public boolean canJump(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def canJump(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        \n    }\n};", "C": "bool canJump(int* nums, int numsSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    canJump(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    canJump(nums: number[]): boolean {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn can_jump(nums: Vec<i32>) -> bool {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun canJump(nums: IntArray): Boolean {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().canJump(nums));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(\"true\" if Solution().canJump(nums) else \"false\")", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << (sol.canJump(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%s\\n\", canJump(nums, sz) ? \"true\" : \"false\");\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().canJump(nums) ? \"true\" : \"false\");", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().canJump(nums) ? \"true\" : \"false\");", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", if Solution::can_jump(nums) { \"true\" } else { \"false\" });\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(if (Solution().canJump(nums)) \"true\" else \"false\")\n}"}'::jsonb
WHERE problem_id = p30_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '2 3 1 1 4', 'true', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '3 2 1 0 4', 'false', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '0', 'true', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '1 2', 'true', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '2 0 0', 'true', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '1 0 1 0', 'false', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '1 1 1 1', 'true', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '0 1', 'false', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '0 0', 'false', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '5 4 3 2 1 0 0', 'false', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '1 0', 'true', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '10 0 0 0 0 0 0 0 0 0 0', 'true', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '10 0 0 0 0 0 0 0 0 0 0 0', 'false', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '2 1 0 0', 'false', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '3 0 0 0', 'true', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '2 5 0 0', 'true', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '4 2 0 0 1 1 4 4 4 0 4 0', 'true', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '3 2 2 0 4', 'true', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '2 3 0 1 4', 'true', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p30_id, '2 3 1 1 0', 'true', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p30_id;

-- p31: Merge Intervals
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p31_id, 'merge-intervals', 'Merge Intervals', 'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def merge(self, intervals):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};", "C": "int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {\n    \n}", "JAVASCRIPT": "class Solution {\n    merge(intervals) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    merge(intervals: number[][]): number[][] {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn merge(intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun merge(intervals: Array<IntArray>): Array<IntArray> {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<int[]> list = new ArrayList<>();\n        while (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            if (sc.hasNextInt()) {\n                int b = sc.nextInt();\n                list.add(new int[]{a, b});\n            }\n        }\n        int[][] intervals = list.toArray(new int[list.size()][]);\n        int[][] res = new Solution().merge(intervals);\n        for (int i = 0; i < res.length; i++) {\n            System.out.println(res[i][0] + \" \" + res[i][1]);\n        }\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    intervals = []\n    for line in sys.stdin:\n        parts = line.split()\n        if len(parts) == 2:\n            intervals.append([int(parts[0]), int(parts[1])])\n    res = Solution().merge(intervals)\n    for it in res:\n        print(f\"{it[0]} {it[1]}\")", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<vector<int>> intervals;\n    int a, b;\n    while (cin >> a >> b) intervals.push_back({a, b});\n    Solution sol;\n    vector<vector<int>> res = sol.merge(intervals);\n    for(size_t i=0; i<res.size(); ++i){\n        cout << res[i][0] << \" \" << res[i][1] << \"\\n\";\n    }\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, a, b;\n    int** intervals = (int**)malloc(cap * sizeof(int*));\n    int* cols = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d %d\", &a, &b) == 2) {\n        if (sz == cap) {\n            cap *= 2;\n            intervals = (int**)realloc(intervals, cap * sizeof(int*));\n            cols = (int*)realloc(cols, cap * sizeof(int));\n        }\n        intervals[sz] = (int*)malloc(2 * sizeof(int));\n        intervals[sz][0] = a;\n        intervals[sz][1] = b;\n        cols[sz] = 2;\n        sz++;\n    }\n    int returnSize;\n    int* returnColumnSizes;\n    int** res = merge(intervals, sz, cols, &returnSize, &returnColumnSizes);\n    for(int i=0; i<returnSize; ++i){\n        printf(\"%d %d\\n\", res[i][0], res[i][1]);\n    }\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').trim().split(/\\r?\\n/);\nconst intervals = lines.filter(Boolean).map(l => l.split(/\\s+/).map(Number));\nconst res = new Solution().merge(intervals);\nres.forEach(it => console.log(`${it[0]} ${it[1]}`));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').trim().split(/\\r?\\n/);\nconst intervals = lines.filter(Boolean).map(l => l.split(/\\s+/).map(Number));\nconst res = new Solution().merge(intervals);\nres.forEach(it => console.log(`${it[0]} ${it[1]}`));", "RUST": "use std::io::{self, BufRead};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let stdin = io::stdin();\n    let intervals: Vec<Vec<i32>> = stdin.lock().lines()\n        .filter_map(Result::ok)\n        .filter(|l| !l.trim().is_empty())\n        .map(|l| l.split_whitespace().map(|x| x.parse().unwrap()).collect())\n        .collect();\n    let res = Solution::merge(intervals);\n    for it in res {\n        println!(\"{} {}\", it[0], it[1]);\n    }\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<IntArray>()\n    while (sc.hasNextInt()) {\n        val a = sc.nextInt()\n        if (sc.hasNextInt()) {\n            val b = sc.nextInt()\n            list.add(intArrayOf(a, b))\n        }\n    }\n    val intervals = list.toTypedArray()\n    val res = Solution().merge(intervals)\n    for (it in res) {\n        println(\"${it[0]} ${it[1]}\")\n    }\n}"}'::jsonb
WHERE problem_id = p31_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 3\n2 6\n8 10\n15 18', E'1 6\n8 10\n15 18', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 4\n4 5', E'1 5', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 4\n2 3', E'1 4', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 1\n2 2', E'1 1\n2 2', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 1\n1 1\n1 1', E'1 1', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 4\n2 5\n3 6', E'1 6', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'2 3\n4 5\n6 7\n8 9\n1 10', E'1 10', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'5 5\n1 3', E'1 3\n5 5', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'2 2\n1 3\n3 3', E'1 3', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 10', E'1 10', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'4 5\n2 4\n4 6\n3 4\n0 0\n1 1\n3 5\n2 2', E'0 0\n1 1\n2 6', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 1\n2 3', E'1 1\n2 3', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 2\n3 4\n5 6\n7 8', E'1 2\n3 4\n5 6\n7 8', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'2 3\n2 2\n3 3\n1 3\n5 7\n2 2\n4 6', E'1 3\n4 7', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 2\n2 3\n3 4', E'1 4', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'2 3\n4 5\n6 7\n8 9', E'2 3\n4 5\n6 7\n8 9', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'0 0\n0 0\n0 0', E'0 0', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 5\n2 4', E'1 5', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'100 200\n150 250', E'100 250', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p31_id, E'1 100\n5 15\n10 20', E'1 100', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p31_id;

-- p32: Subarray Sum Equals K
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p32_id, 'subarray-sum-equals-k', 'Subarray Sum Equals K', 'Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`. A subarray is a contiguous non-empty sequence of elements within an array.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int subarraySum(int[] nums, int k) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def subarraySum(self, nums, k):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        \n    }\n};", "C": "int subarraySum(int* nums, int numsSize, int k) {\n    \n}", "JAVASCRIPT": "class Solution {\n    subarraySum(nums, k) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    subarraySum(nums: number[], k: number): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun subarraySum(nums: IntArray, k: Int): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for(int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int k = sc.nextInt();\n        System.out.println(new Solution().subarraySum(nums, k));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().splitlines()\n    nums = [int(x) for x in lines[0].split()]\n    k = int(lines[1])\n    print(Solution().subarraySum(nums, k))", "CPP": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int val, k;\n    while (ss >> val) nums.push_back(val);\n    cin >> k;\n    Solution sol;\n    cout << sol.subarraySum(nums, k) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char* line = NULL;\n    size_t len = 0;\n    if (getline(&line, &len, stdin) == -1) return 0;\n    int cap = 100, sz = 0;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    char* tok = strtok(line, \" \\t\\r\\n\");\n    while (tok) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = atoi(tok);\n        tok = strtok(NULL, \" \\t\\r\\n\");\n    }\n    int k;\n    scanf(\"%d\", &k);\n    printf(\"%d\\n\", subarraySum(nums, sz, k));\n    free(nums);\n    free(line);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').trim().split(/\\r?\\n/);\nconst nums = lines[0].trim().split(/\\s+/).map(Number);\nconst k = Number(lines[1]);\nconsole.log(new Solution().subarraySum(nums, k));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').trim().split(/\\r?\\n/);\nconst nums: number[] = lines[0].trim().split(/\\s+/).map(Number);\nconst k: number = Number(lines[1]);\nconsole.log(new Solution().subarraySum(nums, k));", "RUST": "use std::io::{self, BufRead};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let stdin = io::stdin();\n    let mut lines = stdin.lock().lines().filter_map(Result::ok);\n    let line1 = lines.next().unwrap();\n    let nums: Vec<i32> = line1.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let k: i32 = lines.next().unwrap().trim().parse().unwrap();\n    println!(\"{}\", Solution::subarray_sum(nums, k));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val line = sc.nextLine()\n    val nums = line.trim().split(Regex(\"\\\\s+\")).map { it.toInt() }.toIntArray()\n    val k = sc.nextInt()\n    println(Solution().subarraySum(nums, k))\n}"}'::jsonb
WHERE problem_id = p32_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 1 1\n2', '2', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 2 3\n3', '2', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1\n0', '0', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 2 1 2 1\n3', '4', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'0 0 0 0 0\n0', '15', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'-1 -1 1\n0', '1', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 -1 1 -1 1 -1\n0', '9', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'10\n10', '1', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 1 1 1 1\n5', '1', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 2 3 4 5 6 7\n15', '2', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'28 54 7 -70 22 65 -6\n100', '1', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'-10 -10 -10 -10\n-20', '3', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 0 1 0 1\n2', '4', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'5 5 5 5\n10', '3', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'0\n0', '1', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1000 2000 -1000\n2000', '2', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'3 4 7 2 -3 1 4 2\n7', '4', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 1 1 1 1\n2', '4', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'1 1 1 1 1 1 1\n7', '1', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p32_id, E'0 0 0\n1', '0', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p32_id;

-- p33: Coin Change
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p33_id, 'coin-change', 'Coin Change', 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def coinChange(self, coins, amount):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};", "C": "int coinChange(int* coins, int coinsSize, int amount) {\n    \n}", "JAVASCRIPT": "class Solution {\n    coinChange(coins, amount) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    coinChange(coins: number[], amount: number): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun coinChange(coins: IntArray, amount: Int): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] coins = new int[parts.length];\n        for(int i = 0; i < parts.length; i++) coins[i] = Integer.parseInt(parts[i]);\n        int amount = sc.nextInt();\n        System.out.println(new Solution().coinChange(coins, amount));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().splitlines()\n    coins = [int(x) for x in lines[0].split()]\n    amount = int(lines[1])\n    print(Solution().coinChange(coins, amount))", "CPP": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> coins;\n    int val, amount;\n    while (ss >> val) coins.push_back(val);\n    cin >> amount;\n    Solution sol;\n    cout << sol.coinChange(coins, amount) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char* line = NULL;\n    size_t len = 0;\n    if (getline(&line, &len, stdin) == -1) return 0;\n    int cap = 100, sz = 0;\n    int* coins = (int*)malloc(cap * sizeof(int));\n    char* tok = strtok(line, \" \\t\\r\\n\");\n    while (tok) {\n        if (sz == cap) { cap *= 2; coins = (int*)realloc(coins, cap * sizeof(int)); }\n        coins[sz++] = atoi(tok);\n        tok = strtok(NULL, \" \\t\\r\\n\");\n    }\n    int amount;\n    scanf(\"%d\", &amount);\n    printf(\"%d\\n\", coinChange(coins, sz, amount));\n    free(coins);\n    free(line);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').trim().split(/\\r?\\n/);\nconst coins = lines[0].trim().split(/\\s+/).map(Number);\nconst amount = Number(lines[1]);\nconsole.log(new Solution().coinChange(coins, amount));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').trim().split(/\\r?\\n/);\nconst coins: number[] = lines[0].trim().split(/\\s+/).map(Number);\nconst amount: number = Number(lines[1]);\nconsole.log(new Solution().coinChange(coins, amount));", "RUST": "use std::io::{self, BufRead};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let stdin = io::stdin();\n    let mut lines = stdin.lock().lines().filter_map(Result::ok);\n    let line1 = lines.next().unwrap();\n    let coins: Vec<i32> = line1.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let amount: i32 = lines.next().unwrap().trim().parse().unwrap();\n    println!(\"{}\", Solution::coin_change(coins, amount));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val line = sc.nextLine()\n    val coins = line.trim().split(Regex(\"\\\\s+\")).map { it.toInt() }.toIntArray()\n    val amount = sc.nextInt()\n    println(Solution().coinChange(coins, amount))\n}"}'::jsonb
WHERE problem_id = p33_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'1 2 5\n11', '3', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'2\n3', '-1', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'1\n0', '0', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'186 419 83 408\n6249', '20', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'1\n1', '1', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'1\n2', '2', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'2\n1', '-1', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'2 5 10 1\n27', '4', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'10\n10', '1', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'5\n10', '2', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'3\n2', '-1', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'1 2 5\n100', '20', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'2 5 10\n3', '-1', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'1 3 4\n6', '2', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'10 20\n30', '2', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'10 20 50\n40', '2', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'4 5\n8', '2', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'1\n1000', '1000', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'10 1\n9', '9', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p33_id, E'2\n11', '-1', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p33_id;

-- p34: Longest Increasing Subsequence
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p34_id, 'longest-increasing-subsequence', 'Longest Increasing Subsequence', 'Given an integer array `nums`, return the length of the longest **strictly increasing** subsequence.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def lengthOfLIS(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};", "C": "int lengthOfLIS(int* nums, int numsSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    lengthOfLIS(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    lengthOfLIS(nums: number[]): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn length_of_lis(nums: Vec<i32>) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun lengthOfLIS(nums: IntArray): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().lengthOfLIS(nums));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    nums = [int(x) for x in data]\n    print(Solution().lengthOfLIS(nums))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while (cin >> val) nums.push_back(val);\n    Solution sol;\n    cout << sol.lengthOfLIS(nums) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", lengthOfLIS(nums, sz));\n    free(nums);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().lengthOfLIS(nums));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().lengthOfLIS(nums));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::length_of_lis(nums));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val nums = list.toIntArray()\n    println(Solution().lengthOfLIS(nums))\n}"}'::jsonb
WHERE problem_id = p34_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '10 9 2 5 3 7 101 18', '4', TRUE, 0);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '0 1 0 3 2 3', '4', TRUE, 1);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '7 7 7 7 7 7 7', '1', TRUE, 2);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '1', '1', FALSE, 3);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '2 2', '1', FALSE, 4);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '1 2 3 4 5', '5', FALSE, 5);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '5 4 3 2 1', '1', FALSE, 6);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '1 3 6 7 9 4 10 5 6', '6', FALSE, 7);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '10 22 9 33 21 50 41 60 80', '6', FALSE, 8);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '4 10 4 3 8 9', '3', FALSE, 9);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '-1 3 4 5 2 2 2 2', '4', FALSE, 10);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '2 1 2', '2', FALSE, 11);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '100 200 100 300', '3', FALSE, 12);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '0 0 0 0 0', '1', FALSE, 13);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '-10 -5 -1 0 10', '5', FALSE, 14);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '20 10 15 5 10 12', '3', FALSE, 15);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '1 2 1 3 1 4', '4', FALSE, 16);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '3 5 6 2 5 4 19 5 6 7 12', '6', FALSE, 17);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '1 5 2 6 3 7 4 8', '4', FALSE, 18);
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p34_id, '8 4 6 2 3 5 1 2', '3', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p34_id;

SELECT user_id INTO admin_id FROM users WHERE email = 'prathamesh10082004@gmail.com';

INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p35_id, 'spiral-matrix', 'Spiral Matrix', 'Given an `m x n` matrix, return all elements of the matrix in spiral order.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def spiralOrder(self, matrix):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        \n    }\n};", "C": "int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    spiralOrder(matrix) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    spiralOrder(matrix: number[][]): number[] {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn spiral_order(matrix: Vec<Vec<i32>>) -> Vec<i32> {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun spiralOrder(matrix: Array<IntArray>): List<Int> {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<List<Integer>> matrix = new ArrayList<>();\n        while (sc.hasNextLine()) {\n            String line = sc.nextLine().trim();\n            if (line.isEmpty()) continue;\n            List<Integer> row = new ArrayList<>();\n            for (String s : line.split(\"\\\\s+\")) row.add(Integer.parseInt(s));\n            matrix.add(row);\n        }\n        int[][] arr = new int[matrix.size()][];\n        for (int i=0; i<matrix.size(); i++) {\n            arr[i] = new int[matrix.get(i).size()];\n            for (int j=0; j<matrix.get(i).size(); j++) arr[i][j] = matrix.get(i).get(j);\n        }\n        List<Integer> res = new Solution().spiralOrder(arr);\n        for(int i=0; i<res.size(); i++) {\n            System.out.print(res.get(i) + (i == res.size()-1 ? \"\" : \" \"));\n        }\n        System.out.println();\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    matrix = []\n    for line in sys.stdin:\n        if line.strip():\n            matrix.append(list(map(int, line.strip().split())))\n    res = Solution().spiralOrder(matrix)\n    print(\" \".join(map(str, res)))", "CPP": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<vector<int>> matrix;\n    string line;\n    while (getline(cin, line)) {\n        if (line.empty()) continue;\n        stringstream ss(line);\n        vector<int> row;\n        int val;\n        while (ss >> val) row.push_back(val);\n        matrix.push_back(row);\n    }\n    Solution sol;\n    vector<int> res = sol.spiralOrder(matrix);\n    for(size_t i=0; i<res.size(); i++) cout << res[i] << (i+1==res.size()?\"\":\" \");\n    cout << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    int **matrix = NULL;\n    int *colSizes = NULL;\n    int rows = 0;\n    char line[10000];\n    while (fgets(line, sizeof(line), stdin)) {\n        if (line[0] == ''\\n'' || line[0] == ''\\0'') continue;\n        matrix = (int**)realloc(matrix, (rows + 1) * sizeof(int*));\n        colSizes = (int*)realloc(colSizes, (rows + 1) * sizeof(int));\n        int cols = 0;\n        int *row = NULL;\n        char *token = strtok(line, \" \\t\\n\\r\");\n        while (token) {\n            row = (int*)realloc(row, (cols + 1) * sizeof(int));\n            row[cols++] = atoi(token);\n            token = strtok(NULL, \" \\t\\n\\r\");\n        }\n        matrix[rows] = row;\n        colSizes[rows] = cols;\n        rows++;\n    }\n    int returnSize;\n    int *res = spiralOrder(matrix, rows, colSizes, &returnSize);\n    for (int i=0; i<returnSize; i++) {\n        printf(\"%d%s\", res[i], (i == returnSize-1 ? \"\" : \" \"));\n    }\n    printf(\"\\n\");\n    free(res);\n    for(int i=0; i<rows; i++) free(matrix[i]);\n    free(matrix);\n    free(colSizes);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst input = fs.readFileSync(0, ''utf-8'').trim().split(''\\n'');\nconst matrix = input.filter(l => l.trim().length > 0).map(line => line.trim().split(/\\s+/).map(Number));\nconst res = new Solution().spiralOrder(matrix);\nconsole.log(res.join(\" \"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst input: string[] = fs.readFileSync(0, ''utf-8'').trim().split(''\\n'');\nconst matrix: number[][] = input.filter(l => l.trim().length > 0).map(line => line.trim().split(/\\s+/).map(Number));\nconst res: number[] = new Solution().spiralOrder(matrix);\nconsole.log(res.join(\" \"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let matrix: Vec<Vec<i32>> = input.lines().filter(|l| !l.trim().is_empty()).map(|l| l.split_whitespace().map(|x| x.parse().unwrap()).collect()).collect();\n    let res = Solution::spiral_order(matrix);\n    let out: Vec<String> = res.iter().map(|x| x.to_string()).collect();\n    println!(\"{}\", out.join(\" \"));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val matrix = mutableListOf<IntArray>()\n    while (sc.hasNextLine()) {\n        val line = sc.nextLine().trim()\n        if (line.isEmpty()) continue\n        matrix.add(line.split(Regex(\"\\\\s+\")).map { it.toInt() }.toIntArray())\n    }\n    val res = Solution().spiralOrder(matrix.toTypedArray())\n    println(res.joinToString(\" \"))\n}"}'::jsonb
WHERE problem_id = p35_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2 3
4 5 6
7 8 9', '1 2 3 6 9 8 7 4 5', TRUE, 0);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2 3 4
5 6 7 8
9 10 11 12', '1 2 3 4 8 12 11 10 9 5 6 7', TRUE, 1);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1', '1', TRUE, 2);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2
3 4', '1 2 4 3', FALSE, 3);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2 3
4 5 6
7 8 9
10 11 12', '1 2 3 6 9 12 11 10 7 4 5 8', FALSE, 4);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '6 9 7', '6 9 7', FALSE, 5);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1
2
3
4', '1 2 3 4', FALSE, 6);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2
3 4
5 6', '1 2 4 6 5 3', FALSE, 7);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2 3 4 5
6 7 8 9 10', '1 2 3 4 5 10 9 8 7 6', FALSE, 8);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '7 2
4 9
3 1', '7 2 9 1 3 4', FALSE, 9);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2 3
4 5 6
7 8 9
10 11 12
13 14 15', '1 2 3 6 9 12 15 14 13 10 7 4 5 8 11', FALSE, 10);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '5', '5', FALSE, 11);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '-1 -2
-3 -4', '-1 -2 -4 -3', FALSE, 12);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2 3 4 5 6', '1 2 3 4 5 6', FALSE, 13);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1
2
3
4
5
6', '1 2 3 4 5 6', FALSE, 14);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '0 0 0
0 0 0', '0 0 0 0 0 0', FALSE, 15);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '9 8 7
6 5 4
3 2 1', '9 8 7 4 1 2 3 6 5', FALSE, 16);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 1 1 1
1 1 1 1
1 1 1 1', '1 1 1 1 1 1 1 1 1 1 1 1', FALSE, 17);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '100', '100', FALSE, 18);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p35_id, '1 2 3 4
5 6 7 8
9 10 11 12
13 14 15 16', '1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p35_id;

-- p36
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p36_id, 'set-matrix-zeroes', 'Set Matrix Zeroes', 'Given an `m x n` integer matrix, if an element is `0`, set its entire row and column to `0`''s. You must do it **in place**.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public void setZeroes(int[][] matrix) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def setZeroes(self, matrix):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        \n    }\n};", "C": "void setZeroes(int** matrix, int matrixSize, int* matrixColSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    setZeroes(matrix) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    setZeroes(matrix: number[][]): void {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn set_zeroes(matrix: &mut Vec<Vec<i32>>) {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun setZeroes(matrix: Array<IntArray>): Unit {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<List<Integer>> matrix = new ArrayList<>();\n        while (sc.hasNextLine()) {\n            String line = sc.nextLine().trim();\n            if (line.isEmpty()) continue;\n            List<Integer> row = new ArrayList<>();\n            for (String s : line.split(\"\\\\s+\")) row.add(Integer.parseInt(s));\n            matrix.add(row);\n        }\n        int[][] arr = new int[matrix.size()][];\n        for (int i=0; i<matrix.size(); i++) {\n            arr[i] = new int[matrix.get(i).size()];\n            for (int j=0; j<matrix.get(i).size(); j++) arr[i][j] = matrix.get(i).get(j);\n        }\n        new Solution().setZeroes(arr);\n        for(int i=0; i<arr.length; i++) {\n            for(int j=0; j<arr[i].length; j++) {\n                System.out.print(arr[i][j] + (j == arr[i].length-1 ? \"\" : \" \"));\n            }\n            System.out.println();\n        }\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    matrix = []\n    for line in sys.stdin:\n        if line.strip():\n            matrix.append(list(map(int, line.strip().split())))\n    Solution().setZeroes(matrix)\n    for row in matrix:\n        print(\" \".join(map(str, row)))", "CPP": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<vector<int>> matrix;\n    string line;\n    while (getline(cin, line)) {\n        if (line.empty()) continue;\n        stringstream ss(line);\n        vector<int> row;\n        int val;\n        while (ss >> val) row.push_back(val);\n        matrix.push_back(row);\n    }\n    Solution sol;\n    sol.setZeroes(matrix);\n    for(size_t i=0; i<matrix.size(); i++) {\n        for(size_t j=0; j<matrix[i].size(); j++) {\n            cout << matrix[i][j] << (j+1==matrix[i].size()?\"\":\" \");\n        }\n        cout << endl;\n    }\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    int **matrix = NULL;\n    int *colSizes = NULL;\n    int rows = 0;\n    char line[10000];\n    while (fgets(line, sizeof(line), stdin)) {\n        if (line[0] == ''\\n'' || line[0] == ''\\0'') continue;\n        matrix = (int**)realloc(matrix, (rows + 1) * sizeof(int*));\n        colSizes = (int*)realloc(colSizes, (rows + 1) * sizeof(int));\n        int cols = 0;\n        int *row = NULL;\n        char *token = strtok(line, \" \\t\\n\\r\");\n        while (token) {\n            row = (int*)realloc(row, (cols + 1) * sizeof(int));\n            row[cols++] = atoi(token);\n            token = strtok(NULL, \" \\t\\n\\r\");\n        }\n        matrix[rows] = row;\n        colSizes[rows] = cols;\n        rows++;\n    }\n    setZeroes(matrix, rows, colSizes);\n    for(int i=0; i<rows; i++) {\n        for(int j=0; j<colSizes[i]; j++) {\n            printf(\"%d%s\", matrix[i][j], (j == colSizes[i]-1 ? \"\" : \" \"));\n        }\n        printf(\"\\n\");\n    }\n    for(int i=0; i<rows; i++) free(matrix[i]);\n    free(matrix);\n    free(colSizes);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst input = fs.readFileSync(0, ''utf-8'').trim().split(''\\n'');\nconst matrix = input.filter(l => l.trim().length > 0).map(line => line.trim().split(/\\s+/).map(Number));\nnew Solution().setZeroes(matrix);\nmatrix.forEach(row => console.log(row.join(\" \")));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst input: string[] = fs.readFileSync(0, ''utf-8'').trim().split(''\\n'');\nconst matrix: number[][] = input.filter(l => l.trim().length > 0).map(line => line.trim().split(/\\s+/).map(Number));\nnew Solution().setZeroes(matrix);\nmatrix.forEach(row => console.log(row.join(\" \")));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut matrix: Vec<Vec<i32>> = input.lines().filter(|l| !l.trim().is_empty()).map(|l| l.split_whitespace().map(|x| x.parse().unwrap()).collect()).collect();\n    Solution::set_zeroes(&mut matrix);\n    for row in matrix {\n        let out: Vec<String> = row.iter().map(|x| x.to_string()).collect();\n        println!(\"{}\", out.join(\" \"));\n    }\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val matrix = mutableListOf<IntArray>()\n    while (sc.hasNextLine()) {\n        val line = sc.nextLine().trim()\n        if (line.isEmpty()) continue\n        matrix.add(line.split(Regex(\"\\\\s+\")).map { it.toInt() }.toIntArray())\n    }\n    val arr = matrix.toTypedArray()\n    Solution().setZeroes(arr)\n    for (row in arr) {\n        println(row.joinToString(\" \"))\n    }\n}"}'::jsonb
WHERE problem_id = p36_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '1 1 1
1 0 1
1 1 1', '1 0 1
0 0 0
1 0 1', TRUE, 0);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '0 1 2 0
3 4 5 2
1 3 1 5', '0 0 0 0
0 4 5 0
0 3 1 0', TRUE, 1);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '0 1
1 1', '0 0
0 1', TRUE, 2);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '1 2 3
4 5 6', '1 2 3
4 5 6', FALSE, 3);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '1 0', '0 0', FALSE, 4);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '0
1', '0
0', FALSE, 5);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '0 0
0 0', '0 0
0 0', FALSE, 6);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '1 1 1
1 1 1
1 1 1', '1 1 1
1 1 1
1 1 1', FALSE, 7);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '1 2 0
4 5 6
7 8 9', '0 0 0
4 5 0
7 8 0', FALSE, 8);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '0 1 1
1 1 1
1 1 0', '0 0 0
0 1 0
0 0 0', FALSE, 9);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '-1 0
0 -1', '0 0
0 0', FALSE, 10);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '1', '1', FALSE, 11);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '0', '0', FALSE, 12);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '1 2 3 4
5 6 7 8', '1 2 3 4
5 6 7 8', FALSE, 13);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '1 0 3 0
0 6 7 8
9 1 1 1', '0 0 0 0
0 0 0 0
0 0 1 0', FALSE, 14);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '2 4 5
1 0 9
3 4 5', '2 0 5
0 0 0
3 0 5', FALSE, 15);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '0 0 0 0
0 1 1 0
0 1 1 0', '0 0 0 0
0 0 0 0
0 0 0 0', FALSE, 16);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '5 6
0 7
8 9
1 0', '0 6
0 0
0 0
0 0', FALSE, 17);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '-5 -6 -7
-8 -9 0
0 -1 -2', '0 -6 0
0 0 0
0 0 0', FALSE, 18);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p36_id, '2147483647 0
-2147483648 1', '0 0
-2147483648 0', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p36_id;

-- p37
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p37_id, 'group-anagrams', 'Group Anagrams', 'Given an array of strings `strs`, group the **anagrams** together. You can return the answer in **any order**. An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def groupAnagrams(self, strs):\n        pass", "CPP": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }\n};", "C": "char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {\n    \n}", "JAVASCRIPT": "class Solution {\n    groupAnagrams(strs) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    groupAnagrams(strs: string[]): string[][] {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun groupAnagrams(strs: Array<String>): List<List<String>> {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        String[] strs = s.isEmpty() ? new String[0] : s.split(\",\");\n        List<List<String>> res = new Solution().groupAnagrams(strs);\n        List<String> groups = new ArrayList<>();\n        for (List<String> r : res) {\n            Collections.sort(r);\n            groups.add(String.join(\",\", r));\n        }\n        Collections.sort(groups);\n        System.out.println(String.join(\"|\", groups));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    line = sys.stdin.read().strip()\n    strs = line.split(\",\") if line else []\n    res = Solution().groupAnagrams(strs)\n    groups = []\n    for r in res:\n        groups.append(\",\".join(sorted(r)))\n    groups.sort()\n    print(\"|\".join(groups))", "CPP": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string line;\n    if (!getline(cin, line)) return 0;\n    vector<string> strs;\n    if (!line.empty()) {\n        stringstream ss(line);\n        string token;\n        while (getline(ss, token, '','')) {\n            strs.push_back(token);\n        }\n    }\n    Solution sol;\n    vector<vector<string>> res = sol.groupAnagrams(strs);\n    vector<string> groups;\n    for (auto& r : res) {\n        sort(r.begin(), r.end());\n        string grp = \"\";\n        for(size_t i=0; i<r.size(); i++) grp += r[i] + (i+1==r.size()?\"\":\",\");\n        groups.push_back(grp);\n    }\n    sort(groups.begin(), groups.end());\n    for(size_t i=0; i<groups.size(); i++) {\n        cout << groups[i] << (i+1==groups.size()?\"\":\"|\");\n    }\n    cout << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint cmp(const void *a, const void *b) {\n    return strcmp(*(const char **)a, *(const char **)b);\n}\n\nint main() {\n    char line[100000];\n    if (!fgets(line, sizeof(line), stdin)) return 0;\n    line[strcspn(line, \"\\r\\n\")] = 0;\n    char **strs = NULL;\n    int strsSize = 0;\n    if (strlen(line) > 0) {\n        char *token = strtok(line, \",\");\n        while(token) {\n            strs = (char**)realloc(strs, (strsSize+1)*sizeof(char*));\n            strs[strsSize++] = strdup(token);\n            token = strtok(NULL, \",\");\n        }\n    }\n    int returnSize;\n    int *returnColumnSizes = NULL;\n    char ***res = groupAnagrams(strs, strsSize, &returnSize, &returnColumnSizes);\n    char **groups = (char**)malloc(returnSize * sizeof(char*));\n    for(int i=0; i<returnSize; i++) {\n        qsort(res[i], returnColumnSizes[i], sizeof(char*), cmp);\n        char grp[100000] = \"\";\n        for(int j=0; j<returnColumnSizes[i]; j++) {\n            strcat(grp, res[i][j]);\n            if(j < returnColumnSizes[i]-1) strcat(grp, \",\");\n        }\n        groups[i] = strdup(grp);\n    }\n    qsort(groups, returnSize, sizeof(char*), cmp);\n    for(int i=0; i<returnSize; i++) {\n        printf(\"%s%s\", groups[i], i==returnSize-1?\"\":\"|\");\n    }\n    printf(\"\\n\");\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst line = fs.readFileSync(0, ''utf-8'').trim();\nconst strs = line ? line.split(\",\") : [];\nconst res = new Solution().groupAnagrams(strs);\nconst groups = res.map(r => r.sort().join(\",\")).sort();\nconsole.log(groups.join(\"|\"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst line: string = fs.readFileSync(0, ''utf-8'').trim();\nconst strs: string[] = line ? line.split(\",\") : [];\nconst res: string[][] = new Solution().groupAnagrams(strs);\nconst groups: string[] = res.map(r => r.sort().join(\",\")).sort();\nconsole.log(groups.join(\"|\"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let line = input.trim();\n    let strs: Vec<String> = if line.is_empty() { vec![] } else { line.split('','').map(|s| s.to_string()).collect() };\n    let res = Solution::group_anagrams(strs);\n    let mut groups: Vec<String> = res.into_iter().map(|mut r| { r.sort(); r.join(\",\") }).collect();\n    groups.sort();\n    println!(\"{}\", groups.join(\"|\"));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val line = if (sc.hasNextLine()) sc.nextLine().trim() else \"\"\n    val strs = if (line.isEmpty()) emptyArray<String>() else line.split(\",\").toTypedArray()\n    val res = Solution().groupAnagrams(strs)\n    val groups = res.map { it.sorted().joinToString(\",\") }.sorted()\n    println(groups.joinToString(\"|\"))\n}"}'::jsonb
WHERE problem_id = p37_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'eat,tea,tan,ate,nat,bat', 'ate,eat,tea|bat|nat,tan', TRUE, 0);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, '', '', TRUE, 1);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'a', 'a', TRUE, 2);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'ab,ba', 'ab,ba', FALSE, 3);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'abc,bca,cba,xyz,zyx', 'abc,bca,cba|xyz,zyx', FALSE, 4);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'hello,llohe,world,dlorw', 'dlorw,world|hello,llohe', FALSE, 5);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'a,a,a', 'a,a,a', FALSE, 6);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'a,b,c', 'a|b|c', FALSE, 7);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'cab,tin,pew,duh,may,ill,buy,bar,max,doc', 'bar|buy|cab|doc|duh|ill|max|may|pew|tin', FALSE, 8);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'cat,dog,act,mac,cam,god', 'act,cat|cam,mac|dog,god', FALSE, 9);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'listen,silent,enlist,inlets,google,elgoog', 'elgoog,google|enlist,inlets,listen,silent', FALSE, 10);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'z,z,z,z,z', 'z,z,z,z,z', FALSE, 11);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'qwe,ewq,qew,wqe,weq,eqw', 'eqw,ewq,qew,qwe,weq,wqe', FALSE, 12);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'aaa,bbb,ccc,aaa,bbb', 'aaa,aaa|bbb,bbb|ccc', FALSE, 13);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'a,ab,aba,abab', 'a|ab|aba|abab', FALSE, 14);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'same,same,same', 'same,same,same', FALSE, 15);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'one,two,three', 'eno,one|eert,three|otw,two', FALSE, 16);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'anagram,margana,nagaram,random,modnar', 'anagram,margana,nagaram|modnar,random', FALSE, 17);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'x,xx,xxx,xxxx', 'x|xx|xxx|xxxx', FALSE, 18);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p37_id, 'stop,pots,tops,spot,post,opts', 'opts,post,pots,spot,stop,tops', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p37_id;

-- p38
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p38_id, 'unique-paths', 'Unique Paths', 'There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time. Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def uniquePaths(self, m, n):\n        pass", "CPP": "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        \n    }\n};", "C": "int uniquePaths(int m, int n) {\n    \n}", "JAVASCRIPT": "class Solution {\n    uniquePaths(m, n) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    uniquePaths(m: number, n: number): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn unique_paths(m: i32, n: i32) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun uniquePaths(m: Int, n: Int): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int m = sc.nextInt();\n        int n = sc.nextInt();\n        System.out.println(new Solution().uniquePaths(m, n));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    m, n = map(int, sys.stdin.read().split())\n    print(Solution().uniquePaths(m, n))", "CPP": "#include <iostream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int m, n;\n    cin >> m >> n;\n    Solution sol;\n    cout << sol.uniquePaths(m, n) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n\n{{USER_CODE}}\n\nint main() {\n    int m, n;\n    scanf(\"%d %d\", &m, &n);\n    printf(\"%d\\n\", uniquePaths(m, n));\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst [m, n] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).map(Number);\nconsole.log(new Solution().uniquePaths(m, n));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst [m, n] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).map(Number);\nconsole.log(new Solution().uniquePaths(m, n));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut parts = input.split_whitespace();\n    let m: i32 = parts.next().unwrap().parse().unwrap();\n    let n: i32 = parts.next().unwrap().parse().unwrap();\n    println!(\"{}\", Solution::unique_paths(m, n));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val m = sc.nextInt()\n    val n = sc.nextInt()\n    println(Solution().uniquePaths(m, n))\n}"}'::jsonb
WHERE problem_id = p38_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '3 7', '28', TRUE, 0);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '3 2', '3', TRUE, 1);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '1 1', '1', TRUE, 2);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '1 10', '1', FALSE, 3);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '10 1', '1', FALSE, 4);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '2 2', '2', FALSE, 5);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '3 3', '6', FALSE, 6);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '4 4', '20', FALSE, 7);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '5 5', '70', FALSE, 8);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '2 10', '10', FALSE, 9);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '10 2', '10', FALSE, 10);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '7 3', '28', FALSE, 11);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '5 1', '1', FALSE, 12);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '1 5', '1', FALSE, 13);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '6 6', '252', FALSE, 14);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '10 10', '48620', FALSE, 15);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '15 15', '40116600', FALSE, 16);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '20 5', '8855', FALSE, 17);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '5 20', '8855', FALSE, 18);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p38_id, '23 12', '193536720', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p38_id;

-- p39
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p39_id, 'house-robber', 'House Robber', 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def rob(self, nums):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};", "C": "int rob(int* nums, int numsSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    rob(nums) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    rob(nums: number[]): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn rob(nums: Vec<i32>) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun rob(nums: IntArray): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] nums = new int[list.size()];\n        for(int i=0; i<list.size(); i++) nums[i] = list.get(i);\n        System.out.println(new Solution().rob(nums));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    nums = list(map(int, sys.stdin.read().split()))\n    print(Solution().rob(nums))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int v;\n    while(cin >> v) nums.push_back(v);\n    Solution sol;\n    cout << sol.rob(nums) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int *nums = (int*)malloc(cap * sizeof(int));\n    while(scanf(\"%d\", &val) == 1) {\n        if(sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap*sizeof(int)); }\n        nums[sz++] = val;\n    }\n    printf(\"%d\\n\", rob(nums, sz));\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst nums = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().rob(nums));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst nums: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().rob(nums));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::rob(nums));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while(sc.hasNextInt()) list.add(sc.nextInt())\n    println(Solution().rob(list.toIntArray()))\n}"}'::jsonb
WHERE problem_id = p39_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '1 2 3 1', '4', TRUE, 0);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '2 7 9 3 1', '12', TRUE, 1);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '0', '0', TRUE, 2);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '1 1', '1', FALSE, 3);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '2 1 1 2', '4', FALSE, 4);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '1', '1', FALSE, 5);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '1 2', '2', FALSE, 6);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '10 2 3 10', '20', FALSE, 7);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '1 5 3', '5', FALSE, 8);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '100 1 1 100', '200', FALSE, 9);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '0 0 0 0 0', '0', FALSE, 10);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '10 10 10 10 10', '30', FALSE, 11);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '5 1 2 5', '10', FALSE, 12);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '400', '400', FALSE, 13);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '90 10 10 90', '180', FALSE, 14);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '1 2 3 4 5 6 7 8 9 10', '30', FALSE, 15);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '10 9 8 7 6 5 4 3 2 1', '30', FALSE, 16);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '3 1 1 3', '6', FALSE, 17);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '100 200 300 400 500', '900', FALSE, 18);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p39_id, '10 1 1 10 1 1 10', '30', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p39_id;

-- p40
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p40_id, 'decode-ways', 'Decode Ways', 'A message containing letters from `A-Z` can be **encoded** into numbers using the following mapping:
''A'' -> "1"
''B'' -> "2"
...
''Z'' -> "26"
To **decode** an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). Given a string `s` containing only digits, return the number of ways to **decode** it.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int numDecodings(String s) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def numDecodings(self, s):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numDecodings(string s) {\n        \n    }\n};", "C": "int numDecodings(char* s) {\n    \n}", "JAVASCRIPT": "class Solution {\n    numDecodings(s) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    numDecodings(s: string): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn num_decodings(s: String) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun numDecodings(s: String): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        System.out.println(new Solution().numDecodings(s));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    s = sys.stdin.read().strip()\n    print(Solution().numDecodings(s))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s;\n    if(cin >> s) {\n        Solution sol;\n        cout << sol.numDecodings(s) << endl;\n    }\n    return 0;\n}", "C": "#include <stdio.h>\n\n{{USER_CODE}}\n\nint main() {\n    char s[1000];\n    if(scanf(\"%s\", s) == 1) {\n        printf(\"%d\\n\", numDecodings(s));\n    }\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst s = fs.readFileSync(0, ''utf-8'').trim();\nconsole.log(new Solution().numDecodings(s));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst s = fs.readFileSync(0, ''utf-8'').trim();\nconsole.log(new Solution().numDecodings(s));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", Solution::num_decodings(input.trim().to_string()));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val s = if (sc.hasNextLine()) sc.nextLine().trim() else \"\"\n    println(Solution().numDecodings(s))\n}"}'::jsonb
WHERE problem_id = p40_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '12', '2', TRUE, 0);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '226', '3', TRUE, 1);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '06', '0', TRUE, 2);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '10', '1', FALSE, 3);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '2101', '1', FALSE, 4);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '11106', '2', FALSE, 5);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '0', '0', FALSE, 6);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '1', '1', FALSE, 7);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '9', '1', FALSE, 8);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '27', '1', FALSE, 9);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '1111111111', '89', FALSE, 10);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '1001', '0', FALSE, 11);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '123123123', '9', FALSE, 12);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '262626', '8', FALSE, 13);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '2020', '1', FALSE, 14);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '301', '0', FALSE, 15);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '120120', '1', FALSE, 16);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '99999', '1', FALSE, 17);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '1212121212', '144', FALSE, 18);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p40_id, '20', '1', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p40_id;

-- p41
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p41_id, 'zero-one-knapsack', '0/1 Knapsack', 'You are given `n` items where the `i`-th item has weight `weights[i]` and value `values[i]`. You have a knapsack with a maximum weight capacity `W`. Find the maximum total value you can put in the knapsack. Each item can be used **at most once**.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int knapsack(int[] weights, int[] values, int w) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def knapsack(self, weights, values, w):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int knapsack(vector<int>& weights, vector<int>& values, int w) {\n        \n    }\n};", "C": "int knapsack(int* weights, int weightsSize, int* values, int valuesSize, int w) {\n    \n}", "JAVASCRIPT": "class Solution {\n    knapsack(weights, values, w) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    knapsack(weights: number[], values: number[], w: number): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn knapsack(weights: Vec<i32>, values: Vec<i32>, w: i32) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun knapsack(weights: IntArray, values: IntArray, w: Int): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] wStr = sc.nextLine().trim().split(\"\\\\s+\");\n        String[] vStr = sc.nextLine().trim().split(\"\\\\s+\");\n        int w = Integer.parseInt(sc.nextLine().trim());\n        int[] weights = new int[wStr.length];\n        int[] values = new int[vStr.length];\n        for(int i=0; i<wStr.length; i++) weights[i] = Integer.parseInt(wStr[i]);\n        for(int i=0; i<vStr.length; i++) values[i] = Integer.parseInt(vStr[i]);\n        System.out.println(new Solution().knapsack(weights, values, w));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().strip().split(''\\n'')\n    weights = list(map(int, lines[0].split()))\n    values = list(map(int, lines[1].split()))\n    w = int(lines[2])\n    print(Solution().knapsack(weights, values, w))", "CPP": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string line;\n    vector<int> weights, values;\n    getline(cin, line);\n    stringstream ssw(line);\n    int val;\n    while(ssw >> val) weights.push_back(val);\n    getline(cin, line);\n    stringstream ssv(line);\n    while(ssv >> val) values.push_back(val);\n    int w;\n    cin >> w;\n    Solution sol;\n    cout << sol.knapsack(weights, values, w) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char line[10000];\n    int *weights = NULL, *values = NULL;\n    int wSz=0, vSz=0;\n    if(fgets(line, sizeof(line), stdin)) {\n        char *t = strtok(line, \" \\t\\n\");\n        while(t) {\n            weights = (int*)realloc(weights, (wSz+1)*sizeof(int));\n            weights[wSz++] = atoi(t);\n            t = strtok(NULL, \" \\t\\n\");\n        }\n    }\n    if(fgets(line, sizeof(line), stdin)) {\n        char *t = strtok(line, \" \\t\\n\");\n        while(t) {\n            values = (int*)realloc(values, (vSz+1)*sizeof(int));\n            values[vSz++] = atoi(t);\n            t = strtok(NULL, \" \\t\\n\");\n        }\n    }\n    int w;\n    scanf(\"%d\", &w);\n    printf(\"%d\\n\", knapsack(weights, wSz, values, vSz, w));\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').trim().split(''\\n'');\nconst weights = lines[0].trim().split(/\\s+/).map(Number);\nconst values = lines[1].trim().split(/\\s+/).map(Number);\nconst w = parseInt(lines[2], 10);\nconsole.log(new Solution().knapsack(weights, values, w));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').trim().split(''\\n'');\nconst weights: number[] = lines[0].trim().split(/\\s+/).map(Number);\nconst values: number[] = lines[1].trim().split(/\\s+/).map(Number);\nconst w: number = parseInt(lines[2], 10);\nconsole.log(new Solution().knapsack(weights, values, w));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let lines: Vec<&str> = input.lines().collect();\n    let weights: Vec<i32> = lines[0].split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let values: Vec<i32> = lines[1].split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let w: i32 = lines[2].trim().parse().unwrap();\n    println!(\"{}\", Solution::knapsack(weights, values, w));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val weights = sc.nextLine().trim().split(Regex(\"\\\\s+\")).map { it.toInt() }.toIntArray()\n    val values = sc.nextLine().trim().split(Regex(\"\\\\s+\")).map { it.toInt() }.toIntArray()\n    val w = sc.nextInt()\n    println(Solution().knapsack(weights, values, w))\n}"}'::jsonb
WHERE problem_id = p41_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '1 2 3
10 15 40
6', '65', TRUE, 0);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '1 2 3
10 20 30
3', '30', TRUE, 1);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '4 5 1
1 2 3
4', '3', TRUE, 2);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '10 20 30
60 100 120
50', '220', FALSE, 3);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '5 4 6 3
10 40 30 50
10', '90', FALSE, 4);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '1 1 1
10 20 30
2', '50', FALSE, 5);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '10
100
5', '0', FALSE, 6);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '2
10
5', '10', FALSE, 7);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '2 3 4 5
3 4 5 6
5', '7', FALSE, 8);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '1 2 3 4 5
1 2 3 4 5
10', '10', FALSE, 9);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '5 5 5
10 20 30
10', '50', FALSE, 10);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '100
1
100', '1', FALSE, 11);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '1 1 1 1 1
10 10 10 10 10
3', '30', FALSE, 12);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '9 8 7
1 2 3
10', '3', FALSE, 13);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '2 3 1 4
4 5 3 7
5', '12', FALSE, 14);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '10 20
50 100
15', '50', FALSE, 15);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '4 4 4
10 10 10
12', '30', FALSE, 16);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '3 1 3
4 5 6
4', '10', FALSE, 17);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '10 10 10 10
1 2 3 4
0', '0', FALSE, 18);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p41_id, '7 3 2 6
14 6 4 12
10', '20', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p41_id;

-- p42
INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
VALUES (p42_id, 'longest-common-subsequence', 'Longest Common Subsequence', 'Given two strings `text1` and `text2`, return the length of their **longest common subsequence**. If there is no common subsequence, return `0`. A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

UPDATE problems
SET starter_code = '{"JAVA": "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def longestCommonSubsequence(self, text1, text2):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        \n    }\n};", "C": "int longestCommonSubsequence(char* text1, char* text2) {\n    \n}", "JAVASCRIPT": "class Solution {\n    longestCommonSubsequence(text1, text2) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    longestCommonSubsequence(text1: string, text2: string): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun longestCommonSubsequence(text1: String, text2: String): Int {\n        \n    }\n}"}'::jsonb,
    solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String text1 = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        String text2 = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        System.out.println(new Solution().longestCommonSubsequence(text1, text2));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().splitlines()\n    t1 = lines[0] if len(lines) > 0 else \"\"\n    t2 = lines[1] if len(lines) > 1 else \"\"\n    print(Solution().longestCommonSubsequence(t1, t2))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string t1, t2;\n    getline(cin, t1);\n    getline(cin, t2);\n    Solution sol;\n    cout << sol.longestCommonSubsequence(t1, t2) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char t1[2000], t2[2000];\n    t1[0] = t2[0] = 0;\n    if(fgets(t1, sizeof(t1), stdin)) t1[strcspn(t1, \"\\r\\n\")] = 0;\n    if(fgets(t2, sizeof(t2), stdin)) t2[strcspn(t2, \"\\r\\n\")] = 0;\n    printf(\"%d\\n\", longestCommonSubsequence(t1, t2));\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst t1 = lines[0] || \"\";\nconst t2 = lines[1] || \"\";\nconsole.log(new Solution().longestCommonSubsequence(t1, t2));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst t1 = lines[0] || \"\";\nconst t2 = lines[1] || \"\";\nconsole.log(new Solution().longestCommonSubsequence(t1, t2));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let lines: Vec<&str> = input.lines().collect();\n    let t1 = if lines.len() > 0 { lines[0].to_string() } else { \"\".to_string() };\n    let t2 = if lines.len() > 1 { lines[1].to_string() } else { \"\".to_string() };\n    println!(\"{}\", Solution::longest_common_subsequence(t1, t2));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val t1 = if(sc.hasNextLine()) sc.nextLine().trim() else \"\"\n    val t2 = if(sc.hasNextLine()) sc.nextLine().trim() else \"\"\n    println(Solution().longestCommonSubsequence(t1, t2))\n}"}'::jsonb
WHERE problem_id = p42_id;

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'abcde
ace', '3', TRUE, 0);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'abc
abc', '3', TRUE, 1);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'abc
def', '0', TRUE, 2);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'a
a', '1', FALSE, 3);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'a
b', '0', FALSE, 4);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'bsbininm
jmjkbkjkv', '1', FALSE, 5);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'ezupkr
ubmrapg', '2', FALSE, 6);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'oxcpqrsvwf
shmtulqrypy', '2', FALSE, 7);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'pmjghexybyrgzczy
hafcdqbgncrcbihkd', '4', FALSE, 8);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'aaaaaaaa
aaaaaa', '6', FALSE, 9);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'abcdefghijklmnopqrstuvwxyz
zyxwvutsrqponmlkjihgfedcba', '1', FALSE, 10);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'x
y', '0', FALSE, 11);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'abcba
abcba', '5', FALSE, 12);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'abcba
cba', '3', FALSE, 13);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'abc
', '0', FALSE, 14);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, '
abc', '0', FALSE, 15);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, '
', '0', FALSE, 16);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'hello
world', '1', FALSE, 17);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'algorithms
algebra', '4', FALSE, 18);

INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
VALUES (gen_random_uuid(), p42_id, 'longest
stone', '3', FALSE, 19);

UPDATE problems SET is_published = TRUE WHERE problem_id = p42_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p43_id, 'edit-distance', 'Edit Distance', 'Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character', 'HARD', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA": "class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def minDistance(self, word1, word2):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        \n    }\n};", "C": "int minDistance(char* word1, char* word2) {\n    \n}", "JAVASCRIPT": "class Solution {\n    minDistance(word1, word2) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    minDistance(word1: string, word2: string): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn min_distance(word1: String, word2: String) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun minDistance(word1: String, word2: String): Int {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String word1 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        String word2 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        System.out.println(new Solution().minDistance(word1, word2));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().splitlines()\n    word1 = lines[0] if len(lines) > 0 else \"\"\n    word2 = lines[1] if len(lines) > 1 else \"\"\n    print(Solution().minDistance(word1, word2))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string word1, word2;\n    getline(cin, word1);\n    getline(cin, word2);\n    Solution sol;\n    cout << sol.minDistance(word1, word2) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    char w1[10005] = {0}, w2[10005] = {0};\n    if(fgets(w1, sizeof(w1), stdin)) w1[strcspn(w1, \"\\n\")] = 0;\n    if(fgets(w2, sizeof(w2), stdin)) w2[strcspn(w2, \"\\n\")] = 0;\n    printf(\"%d\\n\", minDistance(w1, w2));\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst word1 = lines[0] || \"\";\nconst word2 = lines[1] || \"\";\nconsole.log(new Solution().minDistance(word1, word2));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst word1 = lines[0] || \"\";\nconst word2 = lines[1] || \"\";\nconsole.log(new Solution().minDistance(word1, word2));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let lines: Vec<&str> = input.lines().collect();\n    let word1 = if lines.len() > 0 { lines[0].to_string() } else { String::new() };\n    let word2 = if lines.len() > 1 { lines[1].to_string() } else { String::new() };\n    println!(\"{}\", Solution::min_distance(word1, word2));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val word1 = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    val word2 = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    println(Solution().minDistance(word1, word2))\n}"}'::jsonb
        WHERE problem_id = p43_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'horse
ros', '3', TRUE, 0);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'intention
execution', '5', TRUE, 1);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'a
b', '1', TRUE, 2);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, '
a', '1', FALSE, 3);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'a
', '1', FALSE, 4);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, '
', '0', FALSE, 5);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'abc
abc', '0', FALSE, 6);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'abc
def', '3', FALSE, 7);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'a
abc', '2', FALSE, 8);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'abc
a', '2', FALSE, 9);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'zoologicoarchaeologist
zoogeologist', '10', FALSE, 10);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'park
spake', '3', FALSE, 11);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'exponential
polynomial', '6', FALSE, 12);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'algorithm
altruistic', '6', FALSE, 13);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'kitten
sitting', '3', FALSE, 14);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'flaw
lawn', '2', FALSE, 15);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'sunday
saturday', '3', FALSE, 16);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'ab
ba', '2', FALSE, 17);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'abcd
dcba', '4', FALSE, 18);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p43_id, 'pneumonoultramicroscopicsilicovolcanoconiosis
ultramicroscopic', '29', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p43_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p44_id, 'word-break', 'Word Break', 'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.
**Note** that the same word in the dictionary may be reused multiple times in the segmentation.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA": "import java.util.List;\n\nclass Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def wordBreak(self, s, wordDict):\n        pass", "CPP": "#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};", "C": "int wordBreak(char* s, char** wordDict, int wordDictSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    wordBreak(s, wordDict) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    wordBreak(s: string, wordDict: string[]): boolean {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn word_break(s: String, word_dict: Vec<String>) -> bool {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun wordBreak(s: String, wordDict: List<String>): Boolean {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        String dictStr = sc.hasNextLine() ? sc.nextLine() : \"\";\n        List<String> wordDict = dictStr.isEmpty() ? new ArrayList<>() : Arrays.asList(dictStr.split(\",\"));\n        System.out.println(new Solution().wordBreak(s, wordDict));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().splitlines()\n    s = lines[0] if len(lines) > 0 else \"\"\n    dictStr = lines[1] if len(lines) > 1 else \"\"\n    wordDict = dictStr.split('','') if dictStr else []\n    res = Solution().wordBreak(s, wordDict)\n    print(''true'' if res else ''false'')", "CPP": "#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s, dictStr;\n    getline(cin, s);\n    getline(cin, dictStr);\n    vector<string> wordDict;\n    if (!dictStr.empty()) {\n        stringstream ss(dictStr);\n        string item;\n        while (getline(ss, item, '','')) {\n            wordDict.push_back(item);\n        }\n    }\n    Solution sol;\n    cout << (sol.wordBreak(s, wordDict) ? \"true\" : \"false\") << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    char s[10005] = {0}, dictStr[10005] = {0};\n    if(fgets(s, sizeof(s), stdin)) s[strcspn(s, \"\\n\")] = 0;\n    if(fgets(dictStr, sizeof(dictStr), stdin)) dictStr[strcspn(dictStr, \"\\n\")] = 0;\n    int cap = 100, sz = 0;\n    char** wordDict = (char**)malloc(cap * sizeof(char*));\n    char* token = strtok(dictStr, \",\");\n    while (token != NULL) {\n        if (sz == cap) { cap *= 2; wordDict = (char**)realloc(wordDict, cap * sizeof(char*)); }\n        wordDict[sz++] = strdup(token);\n        token = strtok(NULL, \",\");\n    }\n    printf(wordBreak(s, wordDict, sz) ? \"true\\n\" : \"false\\n\");\n    for(int i=0; i<sz; i++) free(wordDict[i]);\n    free(wordDict);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst s = lines[0] || \"\";\nconst dictStr = lines[1] || \"\";\nconst wordDict = dictStr ? dictStr.split('','') : [];\nconsole.log(new Solution().wordBreak(s, wordDict) ? \"true\" : \"false\");", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst s = lines[0] || \"\";\nconst dictStr = lines[1] || \"\";\nconst wordDict = dictStr ? dictStr.split('','') : [];\nconsole.log(new Solution().wordBreak(s, wordDict) ? \"true\" : \"false\");", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let lines: Vec<&str> = input.lines().collect();\n    let s = if lines.len() > 0 { lines[0].to_string() } else { String::new() };\n    let dict_str = if lines.len() > 1 { lines[1] } else { \"\" };\n    let word_dict = if dict_str.is_empty() { vec![] } else { dict_str.split('','').map(|x| x.to_string()).collect() };\n    println!(\"{}\", if Solution::word_break(s, word_dict) { \"true\" } else { \"false\" });\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val s = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    val dictStr = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    val wordDict = if (dictStr.isEmpty()) emptyList() else dictStr.split(\",\")\n    println(Solution().wordBreak(s, wordDict))\n}"}'::jsonb
        WHERE problem_id = p44_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'leetcode
leet,code', 'true', TRUE, 0);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'applepenapple
apple,pen', 'true', TRUE, 1);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'catsandog
cats,dog,sand,and,cat', 'false', TRUE, 2);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'a
b', 'false', FALSE, 3);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'a
a', 'true', FALSE, 4);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'aaaaaaa
aaaa,aaa', 'true', FALSE, 5);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'aaaaaaa
aaaa,aa', 'false', FALSE, 6);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'cars
car,ca,rs', 'true', FALSE, 7);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'cbca
bc,ca', 'false', FALSE, 8);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'bccdbacdbdacddabbaaaadababadad
cbca,nc', 'false', FALSE, 9);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'abcd
a,abc,b,cd', 'true', FALSE, 10);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'abcd
a,bc,d', 'true', FALSE, 11);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'abcd
a,bc,e', 'false', FALSE, 12);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'abc
a,b,c', 'true', FALSE, 13);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'abc
ab,c', 'true', FALSE, 14);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'abc
a,bc', 'true', FALSE, 15);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'abcdef
ab,cd,ef', 'true', FALSE, 16);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'abcdef
ab,cd,e', 'false', FALSE, 17);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'ab
a,b', 'true', FALSE, 18);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p44_id, 'ab
ab', 'true', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p44_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p45_id, 'longest-common-prefix', 'Longest Common Prefix', 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `""`.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA": "class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def longestCommonPrefix(self, strs):\n        pass", "CPP": "#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        \n    }\n};", "C": "char* longestCommonPrefix(char** strs, int strsSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    longestCommonPrefix(strs) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    longestCommonPrefix(strs: string[]): string {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn longest_common_prefix(strs: Vec<String>) -> String {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun longestCommonPrefix(strs: Array<String>): String {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.hasNextLine() ? sc.nextLine() : \"\";\n        String[] strs = line.isEmpty() ? new String[0] : line.split(\",\");\n        System.out.println(new Solution().longestCommonPrefix(strs));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    line = sys.stdin.read().strip()\n    strs = line.split('','') if line else []\n    print(Solution().longestCommonPrefix(strs))", "CPP": "#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<string> strs;\n    if (!line.empty()) {\n        stringstream ss(line);\n        string item;\n        while (getline(ss, item, '','')) {\n            strs.push_back(item);\n        }\n    }\n    Solution sol;\n    cout << sol.longestCommonPrefix(strs) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    char line[10005] = {0};\n    if(fgets(line, sizeof(line), stdin)) line[strcspn(line, \"\\n\")] = 0;\n    int cap = 100, sz = 0;\n    char** strs = (char**)malloc(cap * sizeof(char*));\n    if (strlen(line) > 0) {\n        char* token = strtok(line, \",\");\n        while (token != NULL) {\n            if (sz == cap) { cap *= 2; strs = (char**)realloc(strs, cap * sizeof(char*)); }\n            strs[sz++] = strdup(token);\n            token = strtok(NULL, \",\");\n        }\n    }\n    char* res = longestCommonPrefix(strs, sz);\n    printf(\"%s\\n\", res ? res : \"\");\n    for(int i=0; i<sz; i++) free(strs[i]);\n    free(strs);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst line = fs.readFileSync(0, ''utf-8'').trim();\nconst strs = line ? line.split('','') : [];\nconsole.log(new Solution().longestCommonPrefix(strs));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst line = fs.readFileSync(0, ''utf-8'').trim();\nconst strs = line ? line.split('','') : [];\nconsole.log(new Solution().longestCommonPrefix(strs));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let line = input.trim();\n    let strs = if line.is_empty() { vec![] } else { line.split('','').map(|x| x.to_string()).collect() };\n    println!(\"{}\", Solution::longest_common_prefix(strs));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val line = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    val strs = if (line.isEmpty()) emptyArray() else line.split(\",\").toTypedArray()\n    println(Solution().longestCommonPrefix(strs))\n}"}'::jsonb
        WHERE problem_id = p45_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'flower,flow,flight', 'fl', TRUE, 0);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'dog,racecar,car', '', TRUE, 1);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'ab,a', 'a', TRUE, 2);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'a', 'a', FALSE, 3);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'a,b', '', FALSE, 4);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'a,a,a', 'a', FALSE, 5);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'abc,abc,abc', 'abc', FALSE, 6);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'ab,ab,a', 'a', FALSE, 7);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'abc,ab,a', 'a', FALSE, 8);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'a,ab,abc', 'a', FALSE, 9);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'prefix,prefixes,preflight', 'pre', FALSE, 10);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'apple,ape,april', 'ap', FALSE, 11);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'zebra,zeb,ze', 'ze', FALSE, 12);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'hello,world', '', FALSE, 13);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'same,same,same,same', 'same', FALSE, 14);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'short,shorter,shortest', 'short', FALSE, 15);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'longstring,long,longer', 'long', FALSE, 16);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'cat,caterpillar,cattle', 'cat', FALSE, 17);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, '123,12,1', '1', FALSE, 18);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p45_id, 'xyz,xy,x', 'x', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p45_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p46_id, 'matrix-chain-multiplication', 'Matrix Chain Multiplication', 'Given a sequence of matrices, find the most efficient way to multiply these matrices together. The problem is not to perform the multiplications, but merely to decide in which order to perform the multiplications. Given an array `p[]` which represents the chain of matrices such that the `i`-th matrix `A_i` has dimension `p[i-1] × p[i]`, find the minimum number of scalar multiplications needed.', 'HARD', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA": "class Solution {\n    public int matrixMultiplication(int[] p) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def matrixMultiplication(self, p):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int matrixMultiplication(vector<int>& p) {\n        \n    }\n};", "C": "int matrixMultiplication(int* p, int pSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    matrixMultiplication(p) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    matrixMultiplication(p: number[]): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn matrix_multiplication(p: Vec<i32>) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun matrixMultiplication(p: IntArray): Int {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] p = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) p[i] = list.get(i);\n        System.out.println(new Solution().matrixMultiplication(p));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    p = [int(x) for x in data]\n    print(Solution().matrixMultiplication(p))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> p;\n    int val;\n    while (cin >> val) p.push_back(val);\n    Solution sol;\n    cout << sol.matrixMultiplication(p) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* p = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; p = (int*)realloc(p, cap * sizeof(int)); }\n        p[sz++] = val;\n    }\n    printf(\"%d\\n\", matrixMultiplication(p, sz));\n    free(p);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst p = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().matrixMultiplication(p));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst p: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().matrixMultiplication(p));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let p: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::matrix_multiplication(p));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val p = list.toIntArray()\n    println(Solution().matrixMultiplication(p))\n}"}'::jsonb
        WHERE problem_id = p46_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '40 20 30 10 30', '26000', TRUE, 0);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '10 20 30 40 30', '30000', TRUE, 1);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '10 20 30', '6000', TRUE, 2);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '2 3 4', '24', FALSE, 3);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '1 2 3 4', '18', FALSE, 4);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '4 3 2 1', '18', FALSE, 5);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '5 4 6 2 7', '158', FALSE, 6);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '10 20', '0', FALSE, 7);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '10 20 30 40', '18000', FALSE, 8);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '30 35 15 5 10 20 25', '15125', FALSE, 9);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '1 2 3 4 5', '38', FALSE, 10);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '5 4 3 2 1', '38', FALSE, 11);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '10 10 10 10', '2000', FALSE, 12);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '5 5 5 5 5 5', '500', FALSE, 13);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '100 200', '0', FALSE, 14);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '2 3 4 5', '64', FALSE, 15);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '5 4 3 2', '64', FALSE, 16);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '2 2 2 2 2', '24', FALSE, 17);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '10 100 5 50', '7500', FALSE, 18);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p46_id, '3 4 5 6 7', '288', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p46_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p47_id, 'trapping-rain-water', 'Trapping Rain Water', 'Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.', 'HARD', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA": "class Solution {\n    public int trap(int[] height) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def trap(self, height):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        \n    }\n};", "C": "int trap(int* height, int heightSize) {\n    \n}", "JAVASCRIPT": "class Solution {\n    trap(height) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    trap(height: number[]): number {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn trap(height: Vec<i32>) -> i32 {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun trap(height: IntArray): Int {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) list.add(sc.nextInt());\n        int[] height = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) height[i] = list.get(i);\n        System.out.println(new Solution().trap(height));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    data = sys.stdin.read().split()\n    height = [int(x) for x in data]\n    print(Solution().trap(height))", "CPP": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> height;\n    int val;\n    while (cin >> val) height.push_back(val);\n    Solution sol;\n    cout << sol.trap(height) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* height = (int*)malloc(cap * sizeof(int));\n    while (scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; height = (int*)realloc(height, cap * sizeof(int)); }\n        height[sz++] = val;\n    }\n    printf(\"%d\\n\", trap(height, sz));\n    free(height);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst height = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().trap(height));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst height: number[] = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/).filter(Boolean).map(Number);\nconsole.log(new Solution().trap(height));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let height: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!(\"{}\", Solution::trap(height));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val list = mutableListOf<Int>()\n    while (sc.hasNextInt()) list.add(sc.nextInt())\n    val height = list.toIntArray()\n    println(Solution().trap(height))\n}"}'::jsonb
        WHERE problem_id = p47_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '0 1 0 2 1 0 1 3 2 1 2 1', '6', TRUE, 0);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '4 2 0 3 2 5', '9', TRUE, 1);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '1 2 3', '0', TRUE, 2);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '3 2 1 2 3', '4', FALSE, 3);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '5 4 1 2', '1', FALSE, 4);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '5 2 1 2 1 5', '14', FALSE, 5);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '0 0 0', '0', FALSE, 6);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '10 0 10', '10', FALSE, 7);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '10 1 10', '9', FALSE, 8);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '2 1 2 1 2 1 2 1 2', '4', FALSE, 9);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '1 0 1 0 1 0 1 0 1', '4', FALSE, 10);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '3 0 2 0 4', '7', FALSE, 11);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '5 5 5 5', '0', FALSE, 12);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '5 1 5 1 5', '8', FALSE, 13);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '6 5 4 3 2 1', '0', FALSE, 14);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '1', '0', FALSE, 15);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '2 1', '0', FALSE, 16);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '0 2 0', '0', FALSE, 17);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '4 0 0 4', '8', FALSE, 18);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p47_id, '4 0 0 0 4', '12', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p47_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p48_id, 'minimum-window-substring', 'Minimum Window Substring', 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`. The testcases will be generated such that the answer is unique.', 'HARD', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA": "class Solution {\n    public String minWindow(String s, String t) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def minWindow(self, s, t):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        \n    }\n};", "C": "char* minWindow(char* s, char* t) {\n    \n}", "JAVASCRIPT": "class Solution {\n    minWindow(s, t) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    minWindow(s: string, t: string): string {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn min_window(s: String, t: String) -> String {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun minWindow(s: String, t: String): String {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        String t = sc.hasNextLine() ? sc.nextLine() : \"\";\n        System.out.println(new Solution().minWindow(s, t));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().splitlines()\n    s = lines[0] if len(lines) > 0 else \"\"\n    t = lines[1] if len(lines) > 1 else \"\"\n    print(Solution().minWindow(s, t))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s, t;\n    getline(cin, s);\n    getline(cin, t);\n    Solution sol;\n    cout << sol.minWindow(s, t) << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    char s[100005] = {0}, t[100005] = {0};\n    if(fgets(s, sizeof(s), stdin)) s[strcspn(s, \"\\n\")] = 0;\n    if(fgets(t, sizeof(t), stdin)) t[strcspn(t, \"\\n\")] = 0;\n    char* res = minWindow(s, t);\n    printf(\"%s\\n\", res ? res : \"\");\n    free(res);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst s = lines[0] || \"\";\nconst t = lines[1] || \"\";\nconsole.log(new Solution().minWindow(s, t));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst s = lines[0] || \"\";\nconst t = lines[1] || \"\";\nconsole.log(new Solution().minWindow(s, t));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let lines: Vec<&str> = input.lines().collect();\n    let s = if lines.len() > 0 { lines[0].to_string() } else { String::new() };\n    let t = if lines.len() > 1 { lines[1].to_string() } else { String::new() };\n    println!(\"{}\", Solution::min_window(s, t));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val s = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    val t = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    println(Solution().minWindow(s, t))\n}"}'::jsonb
        WHERE problem_id = p48_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'ADOBECODEBANC
ABC', 'BANC', TRUE, 0);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'a
a', 'a', TRUE, 1);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'a
aa', '', TRUE, 2);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'abc
c', 'c', FALSE, 3);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'ab
b', 'b', FALSE, 4);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'ab
a', 'a', FALSE, 5);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'cbaebabacd
abc', 'cba', FALSE, 6);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'aa
aa', 'aa', FALSE, 7);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'a
b', '', FALSE, 8);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'bba
ab', 'ba', FALSE, 9);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'abcebac
cb', 'ceb', FALSE, 10);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'acbbaca
aba', 'baca', FALSE, 11);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'xxyyzz
xyz', 'xyyz', FALSE, 12);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'xxyyzz
zyx', 'xyyz', FALSE, 13);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'abcde
e', 'e', FALSE, 14);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'abcde
a', 'a', FALSE, 15);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'qwertyuiop
qop', 'qwertyuiop', FALSE, 16);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'hello
ll', 'll', FALSE, 17);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'hello
ol', 'llo', FALSE, 18);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p48_id, 'aaaaaaaaa
aaa', 'aaa', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p48_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p49_id, 'merge-sorted-array', 'Merge Sorted Array', 'You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively. Merge `nums1` and `nums2` into a single array sorted in **non-decreasing order**. The final sorted array should be stored inside the array `nums1` which has length `m + n`.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA": "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def merge(self, nums1, m, nums2, n):\n        pass", "CPP": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        \n    }\n};", "C": "void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {\n    \n}", "JAVASCRIPT": "class Solution {\n    merge(nums1, m, nums2, n) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    merge(nums1: number[], m: number, nums2: number[], n: number): void {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn merge(nums1: &mut Vec<i32>, m: i32, nums2: &mut Vec<i32>, n: i32) {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun merge(nums1: IntArray, m: Int, nums2: IntArray, n: Int): Unit {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line1 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        int m = sc.hasNextInt(); sc.nextLine();\n        String line2 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        int n = sc.hasNextInt();\n        \n        int[] nums1 = new int[m + n];\n        int[] nums2 = new int[n];\n        \n        if (!line1.trim().isEmpty()) {\n            String[] parts = line1.trim().split(\"\\\\s+\");\n            for (int i = 0; i < parts.length; i++) nums1[i] = Integer.parseInt(parts[i]);\n        }\n        if (!line2.trim().isEmpty()) {\n            String[] parts = line2.trim().split(\"\\\\s+\");\n            for (int i = 0; i < n; i++) nums2[i] = Integer.parseInt(parts[i]);\n        }\n        \n        new Solution().merge(nums1, m, nums2, n);\n        for (int i = 0; i < nums1.length; i++) {\n            System.out.print(nums1[i] + (i == nums1.length - 1 ? \"\" : \" \"));\n        }\n        System.out.println();\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().splitlines()\n    nums1 = [int(x) for x in lines[0].split()] if len(lines) > 0 and lines[0].strip() else []\n    m = int(lines[1]) if len(lines) > 1 else 0\n    nums2 = [int(x) for x in lines[2].split()] if len(lines) > 2 and lines[2].strip() else []\n    n = int(lines[3]) if len(lines) > 3 else 0\n    while len(nums1) < m + n:\n        nums1.append(0)\n    Solution().merge(nums1, m, nums2, n)\n    print(\" \".join(map(str, nums1)))", "CPP": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string line1, line2;\n    int m, n;\n    getline(cin, line1);\n    cin >> m;\n    cin.ignore();\n    getline(cin, line2);\n    cin >> n;\n    \n    vector<int> nums1(m + n, 0);\n    vector<int> nums2(n, 0);\n    \n    stringstream ss1(line1);\n    int val, i = 0;\n    while (ss1 >> val) nums1[i++] = val;\n    \n    stringstream ss2(line2);\n    i = 0;\n    while (ss2 >> val) nums2[i++] = val;\n    \n    Solution sol;\n    sol.merge(nums1, m, nums2, n);\n    for (int j = 0; j < m + n; j++) {\n        cout << nums1[j] << (j == m + n - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}", "C": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n{{USER_CODE}}\n\nint main() {\n    char line1[10005], line2[10005];\n    int m, n;\n    if(fgets(line1, sizeof(line1), stdin)) line1[strcspn(line1, \"\\n\")] = 0;\n    scanf(\"%d\\n\", &m);\n    if(fgets(line2, sizeof(line2), stdin)) line2[strcspn(line2, \"\\n\")] = 0;\n    scanf(\"%d\", &n);\n    \n    int* nums1 = (int*)calloc(m + n, sizeof(int));\n    int* nums2 = (int*)calloc(n, sizeof(int));\n    \n    char* token = strtok(line1, \" \");\n    int idx = 0;\n    while (token != NULL) {\n        nums1[idx++] = atoi(token);\n        token = strtok(NULL, \" \");\n    }\n    token = strtok(line2, \" \");\n    idx = 0;\n    while (token != NULL) {\n        nums2[idx++] = atoi(token);\n        token = strtok(NULL, \" \");\n    }\n    \n    merge(nums1, m + n, m, nums2, n, n);\n    for (int i = 0; i < m + n; i++) {\n        printf(\"%d%s\", nums1[i], (i == m + n - 1) ? \"\" : \" \");\n    }\n    printf(\"\\n\");\n    free(nums1);\n    free(nums2);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst nums1 = lines[0] ? lines[0].trim().split(/\\s+/).map(Number) : [];\nconst m = parseInt(lines[1] || ''0'', 10);\nconst nums2 = lines[2] ? lines[2].trim().split(/\\s+/).map(Number) : [];\nconst n = parseInt(lines[3] || ''0'', 10);\nwhile(nums1.length < m + n) nums1.push(0);\nnew Solution().merge(nums1, m, nums2, n);\nconsole.log(nums1.join(\" \"));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst lines = fs.readFileSync(0, ''utf-8'').split(/\\r?\\n/);\nconst nums1 = lines[0] ? lines[0].trim().split(/\\s+/).map(Number) : [];\nconst m = parseInt(lines[1] || ''0'', 10);\nconst nums2 = lines[2] ? lines[2].trim().split(/\\s+/).map(Number) : [];\nconst n = parseInt(lines[3] || ''0'', 10);\nwhile(nums1.length < m + n) nums1.push(0);\nnew Solution().merge(nums1, m, nums2, n);\nconsole.log(nums1.join(\" \"));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let lines: Vec<&str> = input.lines().collect();\n    let mut nums1: Vec<i32> = if lines.len() > 0 && !lines[0].trim().is_empty() {\n        lines[0].split_whitespace().map(|x| x.parse().unwrap()).collect()\n    } else { vec![] };\n    let m: i32 = if lines.len() > 1 { lines[1].parse().unwrap() } else { 0 };\n    let mut nums2: Vec<i32> = if lines.len() > 2 && !lines[2].trim().is_empty() {\n        lines[2].split_whitespace().map(|x| x.parse().unwrap()).collect()\n    } else { vec![] };\n    let n: i32 = if lines.len() > 3 { lines[3].parse().unwrap() } else { 0 };\n    while nums1.len() < (m + n) as usize { nums1.push(0); }\n    Solution::merge(&mut nums1, m, &mut nums2, n);\n    let result: Vec<String> = nums1.iter().map(|x| x.to_string()).collect();\n    println!(\"{}\", result.join(\" \"));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val line1 = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    val m = if (sc.hasNextInt()) sc.nextInt() else 0\n    if (sc.hasNextLine()) sc.nextLine()\n    val line2 = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    val n = if (sc.hasNextInt()) sc.nextInt() else 0\n    \n    val nums1 = IntArray(m + n)\n    val nums2 = IntArray(n)\n    \n    if (line1.trim().isNotEmpty()) {\n        val parts = line1.trim().split(\"\\\\s+\".toRegex())\n        for (i in parts.indices) nums1[i] = parts[i].toInt()\n    }\n    if (line2.trim().isNotEmpty()) {\n        val parts = line2.trim().split(\"\\\\s+\".toRegex())\n        for (i in parts.indices) nums2[i] = parts[i].toInt()\n    }\n    \n    Solution().merge(nums1, m, nums2, n)\n    println(nums1.joinToString(\" \"))\n}"}'::jsonb
        WHERE problem_id = p49_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '1 2 3 0 0 0
3
2 5 6
3', '1 2 2 3 5 6', TRUE, 0);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '1
1

0', '1', TRUE, 1);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '0
0
1
1', '1', TRUE, 2);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '4 5 6 0 0 0
3
1 2 3
3', '1 2 3 4 5 6', FALSE, 3);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '1 2 3 4 5 0 0
5
6 7
2', '1 2 3 4 5 6 7', FALSE, 4);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '10 20 0
2
5
1', '5 10 20', FALSE, 5);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '-5 -3 0 0 0
2
-4 -2 1
3', '-5 -4 -3 -2 1', FALSE, 6);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '2 0
1
1
1', '1 2', FALSE, 7);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '1 1 1 0 0 0
3
1 1 1
3', '1 1 1 1 1 1', FALSE, 8);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '3 3 3 0 0
3
2 2
2', '2 2 3 3 3', FALSE, 9);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '1 0
1
0
0', '1', FALSE, 10);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '-10 -5 0 0
2
-8 -3
2', '-10 -8 -5 -3', FALSE, 11);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '10 20 30 0 0 0
3
1 2 3
3', '1 2 3 10 20 30', FALSE, 12);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '2 0 0 0
1
1 3 4
3', '1 2 3 4', FALSE, 13);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '0 0 0 0 0
1
-1 1 2 3
4', '-1 0 1 2 3', FALSE, 14);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '1 2 3 4 5 6 7 0 0
7
5 6
2', '1 2 3 4 5 5 6 6 7', FALSE, 15);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '0 0
1
0
1', '0 0', FALSE, 16);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '-1 -1 0 0
2
-1 -1
2', '-1 -1 -1 -1', FALSE, 17);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '2 4 6 0 0 0
3
1 3 5
3', '1 2 3 4 5 6', FALSE, 18);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p49_id, '1 3 5 7 0 0
4
2 4
2', '1 2 3 4 5 7', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p49_id;

        INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
        VALUES (p50_id, 'longest-palindromic-substring', 'Longest Palindromic Substring', 'Given a string `s`, return the **longest palindromic substring** in `s`.', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);

        UPDATE problems
        SET starter_code = '{"JAVA": "class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}", "PYTHON": "class Solution:\n    def longestPalindrome(self, s):\n        pass", "CPP": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};", "C": "char* longestPalindrome(char* s) {\n    \n}", "JAVASCRIPT": "class Solution {\n    longestPalindrome(s) {\n        \n    }\n}", "TYPESCRIPT": "class Solution {\n    longestPalindrome(s: string): string {\n        \n    }\n}", "RUST": "impl Solution {\n    pub fn longest_palindrome(s: String) -> String {\n        \n    }\n}", "KOTLIN": "class Solution {\n    fun longestPalindrome(s: String): String {\n        \n    }\n}"}'::jsonb,
            solution_code = '{"JAVA": "import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        System.out.println(new Solution().longestPalindrome(s));\n    }\n}", "PYTHON": "{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    s = sys.stdin.read().strip()\n    print(Solution().longestPalindrome(s))", "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s;\n    if (getline(cin, s)) {\n        Solution sol;\n        cout << sol.longestPalindrome(s) << endl;\n    }\n    return 0;\n}", "C": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    char s[1005] = {0};\n    if(fgets(s, sizeof(s), stdin)) s[strcspn(s, \"\\n\")] = 0;\n    char* res = longestPalindrome(s);\n    printf(\"%s\\n\", res ? res : \"\");\n    free(res);\n    return 0;\n}", "JAVASCRIPT": "{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst s = fs.readFileSync(0, ''utf-8'').trim();\nconsole.log(new Solution().longestPalindrome(s));", "TYPESCRIPT": "{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst s = fs.readFileSync(0, ''utf-8'').trim();\nconsole.log(new Solution().longestPalindrome(s));", "RUST": "use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", Solution::longest_palindrome(input.trim().to_string()));\n}", "KOTLIN": "import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.`in`)\n    val s = if (sc.hasNextLine()) sc.nextLine() else \"\"\n    println(Solution().longestPalindrome(s))\n}"}'::jsonb
        WHERE problem_id = p50_id;

        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'babad', 'bab', TRUE, 0);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'cbbd', 'bb', TRUE, 1);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'a', 'a', TRUE, 2);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'ac', 'a', FALSE, 3);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'bb', 'bb', FALSE, 4);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'ccc', 'ccc', FALSE, 5);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'aaaa', 'aaaa', FALSE, 6);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'abcba', 'abcba', FALSE, 7);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'abacdfgdcaba', 'aba', FALSE, 8);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'abacdfgdcabac', 'bacab', FALSE, 9);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'racecar', 'racecar', FALSE, 10);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'xxyyxx', 'xxyyxx', FALSE, 11);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'xyzzyx', 'xyzzyx', FALSE, 12);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'madam', 'madam', FALSE, 13);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'aibohphobia', 'aibohphobia', FALSE, 14);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, '1234321', '1234321', FALSE, 15);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'ababababa', 'ababababa', FALSE, 16);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'abcbabcba', 'abcbabcba', FALSE, 17);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'abcde', 'a', FALSE, 18);
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index) VALUES (gen_random_uuid(), p50_id, 'abcdefgfedcba', 'abcdefgfedcba', FALSE, 19);

        UPDATE problems SET is_published = TRUE WHERE problem_id = p50_id;

END $$;

