fn gcd(a: Int, b: Int) -> Int {
    if b == 0:
        return a
    return gcd(b, a % b)
}

fn lcm(a: Int, b: Int) -> Int {
    if a == 0:
        return 0
    if b == 0:
        return 0
    return a / gcd(a, b) * b
}

fn gcd_lcm_sample() -> Int {
    return lcm(12, 18)
}
