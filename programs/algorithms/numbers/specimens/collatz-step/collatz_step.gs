fn collatz_step(n: Int) -> Int {
    if n == 0:
        return 0
    if n % 2 == 0:
        return n / 2
    return n * 3 + 1
}

fn collatz_step_sample() -> Int {
    return collatz_step(7)
}
