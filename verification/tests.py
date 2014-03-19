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
            "answer": [2, 3, 3]
        },
        {
            "input": [3, 6],
            "answer": [4, 3, 6],
        },
        {
            "input": [1, 4],
            "answer": [8, 1, 4],
        },
        {
            "input": [2, 5],
            "answer": [5, 2, 5],
        },

    ],
    "Extra": [


        {
            "input": [1, 7],
            "answer": [14, 1, 7],
        },

        {
            "input": [2, 7],
            "answer": [7, 2, 7],
        },
        {
            "input": [2, 8],
            "answer": [8, 2, 8],
        },
        {
            "input": [2, 9],
            "answer": [9, 2, 9],
        },


        {
            "input": [3, 4],
            "answer": [3, 3, 4],
        },

        {
            "input": [4, 4],
            "answer": [2, 4, 4],
        },

        {
            "input": [4, 6],
            "answer": [3, 4, 6],
        },

        {
            "input": [5, 3],
            "answer": [2, 5, 3],
        },


    ],
    "Extra2": [
        {
            "input": [5, 6],
            "answer": [3, 5, 6],
        },

        {
            "input": [6, 9],
            "answer": [3, 6, 9],
        },

        {
            "input": [7, 9],
            "answer": [3, 7, 9],
        },

        {
            "input": [8, 9],
            "answer": [3, 8, 9],
        },
        {
            "input": [10, 10],
            "answer": [2, 10, 10],
        },
    ]

}
