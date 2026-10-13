module example.syntax.inline_if_null_expected

private fn pick(flag: Bool) -> Int? {
    var result Int? = if flag then 10 else null
    return result
}

private fn presentOrZero(value: Int?) -> Int {
    if value is not null:
        return value
    return 0
}

fn inline_if_null_expected_sample() -> Int? {
    return pick(true)
}

fn inline_if_null_expected_verify() -> Bool {
    let present Int? = pick(true)
    let absent Int? = pick(false)
    let okPresent Bool = presentOrZero(present) is 10
    let okAbsent Bool = absent is null
    return okPresent and okAbsent
}
