module example.syntax.exists_if_guard

private fn requireOrFallback(candidate String?, fallback String) -> String {
    if not exists candidate:
        return fallback

    return candidate
}

fn exists_if_guard_sample() -> String {
    let hit String? = "guard-sample-hit"

    return requireOrFallback(hit, "guard-sample-miss")
}

fn exists_if_guard_verify() -> Bool {
    let present String? = "guard-verify-hit"
    let absent String? = null

    let fromPresent String = requireOrFallback(present, "guard-verify-miss")
    let fromAbsent String = requireOrFallback(absent, "guard-verify-miss")

    let okPresent Bool = fromPresent is "guard-verify-hit"
    let okAbsent Bool = fromAbsent is "guard-verify-miss"
    let okAbsentNotHit Bool = fromAbsent is not "guard-verify-hit"

    return okPresent and okAbsent and okAbsentNotHit
}
