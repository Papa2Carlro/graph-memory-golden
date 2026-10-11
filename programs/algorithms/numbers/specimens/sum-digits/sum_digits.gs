fn sum_digits(n: Int) -> Int {
    var value Int = n
    var total Int = 0
    var i Int = 0
    each i in 0..10:
        if value == 0:
            break
        total = total + value % 10
        value = value / 10
    return total
}

fn sum_digits_sample() -> Int {
    return sum_digits(12345)
}
