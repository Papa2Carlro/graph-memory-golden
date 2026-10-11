module example.syntax.fail_guard

private fn requireNonNegative(value Int) -> Int {
    if value is below 0:
        fail "Negative value"

    return value
}

action fail_guard_sample() -> Bool {
    let n Int = requireNonNegative(5)

    let ok Bool = n is 5
    return ok
}

action fail_guard_verify() -> Bool {
    let n Int = requireNonNegative(10)

    let okValue Bool = n is 10
    let okNotSample Bool = n is not 5

    return okValue and okNotSample
}
