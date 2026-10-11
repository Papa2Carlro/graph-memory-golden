module example.syntax.null_narrowing

private fn presentOrFallback(candidate String?, fallback String) -> String {
    if candidate is not null:
        return candidate

    return fallback
}

private fn nullGuardOrValue(candidate String?, fallback String) -> String {
    if candidate is null:
        return fallback

    return candidate
}

fn null_narrowing_sample() -> String {
    let hit String? = "nn-sample-value"

    return presentOrFallback(hit, "nn-sample-fallback")
}

fn null_narrowing_verify() -> Bool {
    let present String? = "nn-verify-present"
    let absent String? = null

    let fromNotNullPresent String = presentOrFallback(present, "nn-verify-fallback")
    let fromNotNullAbsent String = presentOrFallback(absent, "nn-verify-fallback")

    let fromNullGuardOnAbsent String = nullGuardOrValue(absent, "nn-verify-null-fallback")
    let fromNullGuardOnPresent String = nullGuardOrValue(present, "nn-verify-null-fallback")

    let okNotNullPresent Bool = fromNotNullPresent is "nn-verify-present"
    let okNotNullAbsent Bool = fromNotNullAbsent is "nn-verify-fallback"
    let okNullGuardAbsent Bool = fromNullGuardOnAbsent is "nn-verify-null-fallback"
    let okNullGuardPresent Bool = fromNullGuardOnPresent is "nn-verify-present"

    return okNotNullPresent and okNotNullAbsent and okNullGuardAbsent and okNullGuardPresent
}
