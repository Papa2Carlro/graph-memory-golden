fn sum_1_to_n(n: Int) -> Int {
    var total Int = 0
    var i Int = 0
    each i in 1..(n + 1):
        total = total + i
    return total
}

fn sum_1_to_n_sample() -> Int {
    return sum_1_to_n(5)
}
