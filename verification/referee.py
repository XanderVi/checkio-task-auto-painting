from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import cover_codes
from checkio.referees import checkers

from tests import TESTS


def checker(info, result):
    steps, k, n = info
    if not isinstance(result, str):
        return False, "This is not a string."
    actions = result.split(",")
    if len(actions) > steps:
        return False, "It can be shorter."
    details = [0 for _ in range(n)]
    good_ch = "".join(str(r) for r in range(n))
    good_ch += ","
    if any(ch not in good_ch for ch in result):
        return False, "Wrong symbol in the result."
    for act in actions:
        if len(act) > k:
            return False, "The system can contain {0} detail(s).".format(k)
        if len(set(act)) < len(act):
            return False, "You can not place one detail twice in one load"
        for ch in act:
            details[int(ch)] += 1
    if any(d < 2 for d in details):
        return False, "I see no painted details."
    if any(d > 2 for d in details):
        return False, "I see over painted details."
    return True, "All ok"


api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        cover_code={
            'python-27': cover_codes.unwrap_args,
            'python-3': cover_codes.unwrap_args
        },
        checker=checker
    ).on_ready)
