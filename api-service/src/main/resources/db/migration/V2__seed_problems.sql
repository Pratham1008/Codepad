
DO $$
DECLARE
    admin_id UUID;
    p1_id UUID := '11111111-1111-1111-1111-111111111111';
    p2_id UUID := '22222222-2222-2222-2222-222222222222';
    p3_id UUID := '33333333-3333-3333-3333-333333333333';
BEGIN
    INSERT INTO users (user_id, email, username, firebase_uid, role)
    VALUES (gen_random_uuid(), 'prathamesh10082004@gmail.com', 'prathamesh', 'admin-firebase-uid-temp', 'ROLE_ADMIN')
    ON CONFLICT (email) DO UPDATE SET role = 'ROLE_ADMIN'
    RETURNING user_id INTO admin_id;

    DELETE FROM problems WHERE problem_id IN (p1_id, p2_id, p3_id);

    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p1_id, 'two-sum', 'Two Sum', 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);
    
    UPDATE problems 
    SET starter_code = '{"JAVA":"class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}","PYTHON":"class Solution:\n    def twoSum(self, nums, target):\n        pass","CPP":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};","C":"/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    \n}","JAVASCRIPT":"class Solution {\n    twoSum(nums, target) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    twoSum(nums: number[], target: number): number[] {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun twoSum(nums: IntArray, target: Int): IntArray {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextLine()) return;\n        String[] parts = sc.nextLine().trim().split(\" \");\n        int[] nums = new int[parts.length];\n        for(int i=0; i<parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int target = sc.nextInt();\n        int[] res = new Solution().twoSum(nums, target);\n        System.out.println(\"[\" + res[0] + \",\" + res[1] + \"]\");\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    lines = sys.stdin.read().split()\n    if not lines: sys.exit(0)\n    nums = [int(x) for x in lines[:-1]]\n    target = int(lines[-1])\n    res = Solution().twoSum(nums, target)\n    print(f\"[{res[0]},{res[1]}]\")","CPP":"#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    vector<int> nums;\n    int val;\n    while(cin >> val) {\n        nums.push_back(val);\n    }\n    int target = nums.back();\n    nums.pop_back();\n    Solution sol;\n    vector<int> res = sol.twoSum(nums, target);\n    cout << \"[\" << res[0] << \",\" << res[1] << \"]\" << endl;\n    return 0;\n}","C":"#include <stdio.h>\n#include <stdlib.h>\n\n{{USER_CODE}}\n\nint main() {\n    int cap = 100, sz = 0, val;\n    int* nums = (int*)malloc(cap * sizeof(int));\n    while(scanf(\"%d\", &val) == 1) {\n        if (sz == cap) { cap *= 2; nums = (int*)realloc(nums, cap * sizeof(int)); }\n        nums[sz++] = val;\n    }\n    int target = nums[sz-1];\n    sz--;\n    int retSize = 0;\n    int* res = twoSum(nums, sz, target, &retSize);\n    printf(\"[%d,%d]\\n\", res[0], res[1]);\n    free(nums);\n    free(res);\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst input = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/);\nif(input.length > 1) {\n    const nums = input.slice(0, -1).map(Number);\n    const target = Number(input[input.length - 1]);\n    const res = new Solution().twoSum(nums, target);\n    console.log(\"[\" + res[0] + \",\" + res[1] + \"]\");\n}","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst input = fs.readFileSync(0, ''utf-8'').trim().split(/\\s+/);\nif(input.length > 1) {\n    const nums = input.slice(0, -1).map(Number);\n    const target = Number(input[input.length - 1]);\n    const res = new Solution().twoSum(nums, target);\n    console.log(\"[\" + res[0] + \",\" + res[1] + \"]\");\n}","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    if nums.is_empty() { return; }\n    let target = nums.pop().unwrap();\n    let res = Solution::two_sum(nums, target);\n    println!(\"[{},{}]\", res[0], res[1]);\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.in)\n    if(!sc.hasNext()) return\n    val numsList = mutableListOf<Int>()\n    while(sc.hasNextInt()) {\n        numsList.add(sc.nextInt())\n    }\n    val target = numsList.removeAt(numsList.size - 1)\n    val res = Solution().twoSum(numsList.toIntArray(), target)\n    println(\"[${res[0]},${res[1]}]\")\n}"}'::jsonb
    WHERE problem_id = p1_id;
    
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '2 7 11 15
9', '[0,1]', TRUE, 0);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '3 2 4
6', '[1,2]', TRUE, 1);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '3 3
6', '[0,1]', TRUE, 2);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '1 2 3 4 5
9', '[3,4]', FALSE, 3);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '0 4 3 0
0', '[0,3]', FALSE, 4);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '-1 -2 -3 -4 -5
-8', '[2,4]', FALSE, 5);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '10 20 30 40 50
90', '[3,4]', FALSE, 6);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '5 7 9 11 13 15
28', '[4,5]', FALSE, 7);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '1 1 1 1 1 2 3
5', '[5,6]', FALSE, 8);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '100 200 300
500', '[1,2]', FALSE, 9);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '-10 10
0', '[0,1]', FALSE, 10);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '99 99
198', '[0,1]', FALSE, 11);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p1_id, '2 5 5 11
10', '[1,2]', FALSE, 12);
        
    UPDATE problems SET is_published = TRUE WHERE problem_id = p1_id;
    
    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p2_id, 'valid-palindrome', 'Valid Palindrome', 'A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string `s`, return `true` if it is a **palindrome**, or `false` otherwise.', 'EASY', 2000, 262144, FALSE, NOW(), NOW(), admin_id);
    
    UPDATE problems 
    SET starter_code = '{"JAVA":"class Solution {\n    public boolean isPalindrome(String s) {\n        \n    }\n}","PYTHON":"class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass","CPP":"#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};","C":"#include <stdbool.h>\n\nbool isPalindrome(char* s) {\n    \n}","JAVASCRIPT":"class Solution {\n    isPalindrome(s) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    isPalindrome(s: string): boolean {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn is_palindrome(s: String) -> bool {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun isPalindrome(s: String): Boolean {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextLine()) return;\n        String s = sc.nextLine();\n        System.out.println(new Solution().isPalindrome(s) ? \"true\" : \"false\");\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    s = sys.stdin.read().strip(''\\n'')\n    res = Solution().isPalindrome(s)\n    print(\"true\" if res else \"false\")","CPP":"#include <iostream>\n#include <string>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s;\n    getline(cin, s);\n    Solution sol;\n    cout << (sol.isPalindrome(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}","C":"#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\n{{USER_CODE}}\n\nint main() {\n    char s[200000];\n    if (fgets(s, sizeof(s), stdin) != NULL) {\n        size_t len = strlen(s);\n        if (len > 0 && s[len-1] == ''\\n'') s[len-1] = ''\\0'';\n        if (isPalindrome(s)) printf(\"true\\n\");\n        else printf(\"false\\n\");\n    }\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst input = fs.readFileSync(0, ''utf-8'').replace(/\\r?\\n$/, '''');\nconsole.log(new Solution().isPalindrome(input) ? \"true\" : \"false\");","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst input = fs.readFileSync(0, ''utf-8'').replace(/\\r?\\n$/, '''');\nconsole.log(new Solution().isPalindrome(input) ? \"true\" : \"false\");","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let s = input.trim_end_matches(|c| c == ''\\r'' || c == ''\\n'').to_string();\n    if Solution::is_palindrome(s) { println!(\"true\"); } else { println!(\"false\"); }\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.in)\n    if(!sc.hasNextLine()) return\n    val s = sc.nextLine()\n    println(if(Solution().isPalindrome(s)) \"true\" else \"false\")\n}"}'::jsonb
    WHERE problem_id = p2_id;
    
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'A man, a plan, a canal: Panama', 'true', TRUE, 0);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'race a car', 'false', TRUE, 1);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, ' ', 'true', TRUE, 2);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, '0P', 'false', FALSE, 3);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'a.', 'true', FALSE, 4);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'ab@a', 'true', FALSE, 5);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, '!!!', 'true', FALSE, 6);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'A man, a plan, a canal: Panama!', 'true', FALSE, 7);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'Marge, let''s \"[went].\" I await {news} telegram.', 'true', FALSE, 8);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'No lemon, no melon', 'true', FALSE, 9);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'Was it a car or a cat I saw?', 'true', FALSE, 10);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'Step on no pets', 'true', FALSE, 11);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p2_id, 'Not a palindrome', 'false', FALSE, 12);
        
    UPDATE problems SET is_published = TRUE WHERE problem_id = p2_id;
    
    INSERT INTO problems (problem_id, slug, title, description, difficulty, time_limit_ms, memory_limit_kb, is_published, created_at, updated_at, created_by)
    VALUES (p3_id, 'reverse-integer', 'Reverse Integer', 'Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**', 'MEDIUM', 2000, 262144, FALSE, NOW(), NOW(), admin_id);
    
    UPDATE problems 
    SET starter_code = '{"JAVA":"class Solution {\n    public int reverse(int x) {\n        \n    }\n}","PYTHON":"class Solution:\n    def reverse(self, x: int) -> int:\n        pass","CPP":"class Solution {\npublic:\n    int reverse(int x) {\n        \n    }\n};","C":"int reverse(int x) {\n    \n}","JAVASCRIPT":"class Solution {\n    reverse(x) {\n        \n    }\n}","TYPESCRIPT":"class Solution {\n    reverse(x: number): number {\n        \n    }\n}","RUST":"impl Solution {\n    pub fn reverse(x: i32) -> i32 {\n        \n    }\n}","KOTLIN":"class Solution {\n    fun reverse(x: Int): Int {\n        \n    }\n}"}'::jsonb,
        solution_code = '{"JAVA":"import java.util.*;\n\n{{USER_CODE}}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int x = sc.nextInt();\n        System.out.println(new Solution().reverse(x));\n    }\n}","PYTHON":"{{USER_CODE}}\n\nimport sys\nif __name__ == ''__main__'':\n    s = sys.stdin.read().split()\n    if s:\n        x = int(s[0])\n        print(Solution().reverse(x))","CPP":"#include <iostream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int x;\n    if (cin >> x) {\n        Solution sol;\n        cout << sol.reverse(x) << endl;\n    }\n    return 0;\n}","C":"#include <stdio.h>\n\n{{USER_CODE}}\n\nint main() {\n    int x;\n    if (scanf(\"%d\", &x) == 1) {\n        printf(\"%d\\n\", reverse(x));\n    }\n    return 0;\n}","JAVASCRIPT":"{{USER_CODE}}\n\nconst fs = require(''fs'');\nconst input = fs.readFileSync(0, ''utf-8'').trim();\nif (input) {\n    console.log(new Solution().reverse(parseInt(input, 10)));\n}","TYPESCRIPT":"{{USER_CODE}}\n\nimport * as fs from ''fs'';\nconst input = fs.readFileSync(0, ''utf-8'').trim();\nif (input) {\n    console.log(new Solution().reverse(parseInt(input, 10)));\n}","RUST":"use std::io::{self, Read};\nstruct Solution;\n\n{{USER_CODE}}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    if let Ok(x) = input.trim().parse::<i32>() {\n        println!(\"{}\", Solution::reverse(x));\n    }\n}","KOTLIN":"import java.util.Scanner\n\n{{USER_CODE}}\n\nfun main() {\n    val sc = Scanner(System.in)\n    if(!sc.hasNextInt()) return\n    val x = sc.nextInt()\n    println(Solution().reverse(x))\n}"}'::jsonb
    WHERE problem_id = p3_id;
    
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '123', '321', TRUE, 0);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '-123', '-321', TRUE, 1);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '120', '21', TRUE, 2);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '0', '0', FALSE, 3);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '1534236469', '0', FALSE, 4);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '-2147483648', '0', FALSE, 5);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '2147483647', '0', FALSE, 6);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '-2147483412', '-2143847412', FALSE, 7);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '1463847412', '2147483641', FALSE, 8);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '-1534236469', '0', FALSE, 9);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '901000', '109', FALSE, 10);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '-901000', '-109', FALSE, 11);
        
        INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, order_index)
        VALUES (gen_random_uuid(), p3_id, '10', '1', FALSE, 12);
        
    UPDATE problems SET is_published = TRUE WHERE problem_id = p3_id;
    
END $$;
