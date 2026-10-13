module example.syntax.optional_member_basic

private fn textOrMark(value: String?, mark: String) -> String {
    if value is not null:
        return value

    return mark
}

action optional_member_basic_sample() -> Bool {
    let created Person = create Person:
        name = "ada"

    let person Person? = created
    let found String? = person?.name

    return textOrMark(found, "missing") is "ada"
}

action optional_member_basic_verify() -> Bool {
    let created Person = create Person:
        name = "ada"

    let person Person? = created
    let found String? = person?.name

    let missing Person? = null
    let missingName String? = missing?.name

    let okPresent Bool = textOrMark(found, "missing") is "ada"
    let okAbsent Bool = missingName is null
    let okAbsentNotName Bool = textOrMark(missingName, "missing") is "missing"

    return okPresent and okAbsent and okAbsentNotName
}
