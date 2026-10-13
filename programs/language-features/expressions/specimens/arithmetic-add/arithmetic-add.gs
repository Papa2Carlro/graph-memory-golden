module example.syntax.arithmetic_add

private fn added(left: Int, right: Int) -> Int {
    return left + right
}

fn arithmetic_add_sample() -> Int {
    return added(2, 3)
}

fn arithmetic_add_verify() -> Bool {
    let result Int = added(2, 3)
    return result is 5
}
