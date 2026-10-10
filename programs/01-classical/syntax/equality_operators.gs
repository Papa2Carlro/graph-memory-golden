fn equality_operators_sample() -> Bool {
    let left Int = 10
    let right Int = 20

    let equal Bool = left is right
    let different Bool = left is not right
    let negated Bool = not equal

    return different and negated
}

fn equality_operators_verify() -> Bool {
    let result Bool = equality_operators_sample()

    return result is true
}
