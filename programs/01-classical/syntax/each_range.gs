fn sum_range(n Int) -> Int {
    var total Int = 0

    each i in 0..n:
        total = total + i

    return total
}

fn each_range_sample() -> Int {
    return sum_range(4)
}

fn each_range_verify() -> Bool {
    let result Int = each_range_sample()
    let expected Int = 6

    return result is expected
}
