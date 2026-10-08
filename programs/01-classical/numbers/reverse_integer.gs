fn reverse_integer(n: Int) -> Int {
    var value Int = n
    var result Int = 0
    var i Int = 0
    each i in 0..10:
        if value == 0:
            break
        var digit Int = value % 10
        result = result * 10 + digit
        value = value / 10
    return result
}

fn reverse_integer_sample() -> Int {
    return reverse_integer(12345)
}
