fn is_prime(n: Int) -> Bool {
    if n < 2:
        return false

    var i Int = 2
    each i in 2..(n):
        if n % i == 0:
            return false

    return true
}
