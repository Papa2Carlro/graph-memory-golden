module example.syntax.exists_if_present

private fn presentOrFallback(candidate String?, fallback String) -> String {
    if exists candidate:
        return candidate

    return fallback
}

fn exists_if_present_sample() -> String {
    let hit String? = "sample-present"

    return presentOrFallback(hit, "sample-fallback")
}

fn exists_if_present_verify() -> Bool {
    let present String? = "verify-present"
    let absent String? = null

    let fromPresent String = presentOrFallback(present, "verify-fallback")
    let fromAbsent String = presentOrFallback(absent, "verify-fallback")

    let okPresent Bool = fromPresent is "verify-present"
    let okAbsent Bool = fromAbsent is "verify-fallback"
    let okAbsentNotPresent Bool = fromAbsent is not "verify-present"

    return okPresent and okAbsent and okAbsentNotPresent
}
