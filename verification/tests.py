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
            "answer": "01,12,02"
        },
        {
            "input": [6, 3],
            "answer": "012,012"
        },
        {
            "input": [3, 6],
            "answer": "012,012,345,345"
        },
        {
            "input": [1, 4],
            "answer": "0,0,1,1,2,2,3,3",
        },
        {
            "input": [2, 5],
            "answer": "01,01,23,42,34",
        },

    ]
}
