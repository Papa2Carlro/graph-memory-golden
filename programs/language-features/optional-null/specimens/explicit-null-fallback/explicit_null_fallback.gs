module example.syntax.explicit_null_fallback

private fn textOrMark(value: String?, mark: String) -> String {
    if value is not null:
        return value

    return mark
}

private fn explicitNull(primary: String?) -> String? {
    var result String? = primary ?? null

    return result
}

fn explicit_null_fallback_sample() -> String? {
    let primary String? = "kept"

    return explicitNull(primary)
}

fn explicit_null_fallback_verify() -> Bool {
    let present String? = "kept"
    let absent String? = null

    let fromPresent String? = explicitNull(present)
    let fromAbsent String? = explicitNull(absent)

    let okPresent Bool = textOrMark(fromPresent, "missing") is "kept"
    let okAbsent Bool = fromAbsent is null

    return okPresent and okAbsent
}
