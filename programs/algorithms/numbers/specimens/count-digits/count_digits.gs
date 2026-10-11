fn count_digits(n: Int) -> Int {
    if n == 0:
        return 1

    var value Int = n
    var count Int = 0
    var i Int = 0
    each i in 0..10:
        if value == 0:
            break
        count = count + 1
        value = value / 10
    return count
}

fn count_digits_sample() -> Int {
    return count_digits(1200)
}
