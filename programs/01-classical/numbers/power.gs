fn power(base: Int, exponent: Int) -> Int {
    if exponent == 0:
        return 1

    var result Int = 1
    var i Int = 0
    each i in 0..exponent:
        result = result * base

    return result
}

fn power_sample() -> Int {
    return power(2, 10)
}
