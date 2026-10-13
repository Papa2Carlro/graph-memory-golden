module example.syntax.arithmetic_multiply

private fn multiplied(left: Int, right: Int) -> Int {
    return left * right
}

fn arithmetic_multiply_sample() -> Int {
    return multiplied(3, 4)
}

fn arithmetic_multiply_verify() -> Bool {
    let result Int = multiplied(3, 4)
    return result is 12
}
