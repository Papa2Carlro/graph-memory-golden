fn fibonacci(n: Int) -> Int {
    var:
        a Int = 0
        b Int = 1
        i Int = 0

    if n == 0:
        return 0

    if n == 1:
        return 1

    each i in 2..(n + 1):
        var temp Int = a + b
        a = b
        b = temp

    return b
}
