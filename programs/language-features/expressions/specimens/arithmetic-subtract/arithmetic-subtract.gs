module example.syntax.arithmetic_subtract

private fn subtracted(left: Int, right: Int) -> Int {
    return left - right
}

fn arithmetic_subtract_sample() -> Int {
    return subtracted(9, 4)
}

fn arithmetic_subtract_verify() -> Bool {
    let result Int = subtracted(9, 4)
    return result is 5
}
