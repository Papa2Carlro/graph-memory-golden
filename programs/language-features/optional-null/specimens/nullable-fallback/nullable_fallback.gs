module example.syntax.nullable_fallback

private fn explodingBackup() -> String? {
    fail "backup evaluated"

    return null
}

private fn textOrMark(value: String?, mark: String) -> String {
    if value is not null:
        return value

    return mark
}

private fn coalescePair(primary: String?, backup: String?) -> String? {
    var result String? = primary ?? backup

    return result
}

private fn keptPrimary() -> String? {
    let primary String? = "kept"
    var result String? = primary ?? explodingBackup()

    return result
}

fn nullable_fallback_sample() -> String? {
    let primary String? = null
    let backup String? = null

    return coalescePair(primary, backup)
}

fn nullable_fallback_verify() -> Bool {
    let kept String? = keptPrimary()

    let primary String? = null
    let backup String? = null
    let cleared String? = coalescePair(primary, backup)

    let okKept Bool = textOrMark(kept, "missing") is "kept"
    let okCleared Bool = cleared is null

    return okKept and okCleared
}
