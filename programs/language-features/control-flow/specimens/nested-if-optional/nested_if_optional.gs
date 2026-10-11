module example.syntax.nested_if_optional

private fn labelOptional(candidate String?, innerTag String) -> String {
    if exists candidate:
        if candidate is innerTag:
            return candidate

        return "present-other"

    return "absent"
}

fn nested_if_optional_sample() -> String {
    let hit String? = "nio-sample-hit"

    return labelOptional(hit, "nio-sample-hit")
}

fn nested_if_optional_verify() -> Bool {
    let presentHit String? = "nio-verify-hit"
    let presentOther String? = "nio-verify-other"
    let absent String? = null

    let fromHit String = labelOptional(presentHit, "nio-verify-hit")
    let fromOther String = labelOptional(presentOther, "nio-verify-hit")
    let fromAbsent String = labelOptional(absent, "nio-verify-hit")

    let okHit Bool = fromHit is "nio-verify-hit"
    let okOther Bool = fromOther is "present-other"
    let okAbsent Bool = fromAbsent is "absent"
    let okHitNotOther Bool = fromHit is not "present-other"

    return okHit and okOther and okAbsent and okHitNotOther
}
