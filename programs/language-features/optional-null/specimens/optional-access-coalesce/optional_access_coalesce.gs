module example.syntax.optional_access_coalesce

private fn explodingLabel() -> String {
    fail "fallback evaluated"

    return "Unknown"
}

action optional_access_coalesce_sample() -> Bool {
    let created Person = create Person:
        name = "ada"

    let person Person? = created
    let label String = person?.name ?? explodingLabel()

    return label is "ada"
}

action optional_access_coalesce_verify() -> Bool {
    let created Person = create Person:
        name = "ada"

    let person Person? = created
    let label String = person?.name ?? explodingLabel()

    let missing Person? = null
    let blank String = missing?.name ?? "Unknown"

    let okPresent Bool = label is "ada"
    let okPresentNotFallback Bool = label is not "Unknown"
    let okAbsent Bool = blank is "Unknown"

    return okPresent and okPresentNotFallback and okAbsent
}
