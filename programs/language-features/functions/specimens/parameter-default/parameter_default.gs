module example.syntax.parameter_default

private fn withPad(value: Int, pad: Int = 5) -> Int {
    return value + pad
}

fn parameter_default_sample() -> Int {
    return withPad(10)
}

fn parameter_default_verify() -> Bool {
    let defaulted Int = withPad(10)
    let explicit Int = withPad(10, 5)

    let okDefaulted Bool = defaulted is 15
    let okExplicit Bool = explicit is 15

    return okDefaulted and okExplicit
}
