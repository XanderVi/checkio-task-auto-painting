"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [2, 3],
            "answer": [3, 2, 3]
        },
        {
            "input": [6, 3],
            "answer": [6, 3, 3]
        },

    ],
    "Extra": [
        {
            "input": [6, 3],
            "answer": [4, 6, 3],
        }
    ]
}
