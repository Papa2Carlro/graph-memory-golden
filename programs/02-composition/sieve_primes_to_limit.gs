fn init_flags(limit: Int) -> [Bool] {
    if limit < 2:
        var empty [Bool] = []
        return empty

    var flags [Bool] = []
    var i Int = 0
    each i in 0..(limit + 1):
        flags.append(true)

    flags.set(0, false)
    flags.set(1, false)
    return flags
}

fn mark_composites(flags: [Bool], limit: Int) -> Int {
    var p Int = 2
    each p in 2..(limit + 1):
        var candidate Bool = flags.get(p)
        if candidate:
            if p * p <= limit:
                var span Int = ((limit - p * p) / p) + 1
                var k Int = 0
                each k in 0..span:
                    var j Int = p * p + k * p
                    flags.set(j, false)
    return 0
}

fn collect_primes(flags: [Bool], limit: Int) -> [Int] {
    var primes [Int] = []
    var i Int = 2
    each i in 2..(limit + 1):
        var stillPrime Bool = flags.get(i)
        if stillPrime:
            primes.append(i)
    return primes
}

fn sieve_primes_to_limit(limit: Int) -> [Int] {
    if limit < 2:
        return []

    var flags [Bool] = init_flags(limit)
    var marked Int = mark_composites(flags, limit)
    return collect_primes(flags, limit)
}

fn sieve_primes_to_limit_sample() -> [Int] {
    var atZero [Int] = sieve_primes_to_limit(0)
    var atOne [Int] = sieve_primes_to_limit(1)
    var atTwo [Int] = sieve_primes_to_limit(2)
    var atTen [Int] = sieve_primes_to_limit(10)
    return sieve_primes_to_limit(20)
}
