module example.syntax.pair

fn make_pair() -> Pair {
    return:
        left = 2
        right = 3
}

fn sum_pair() -> Int {
    let { left, right } = make_pair()
    return left + right
}

fn destructuring_flat_sample() -> Int {
    return sum_pair()
}

fn destructuring_flat_verify() -> Bool {
    let result Int = destructuring_flat_sample()
    let expected Int = 5

    return result is expected
}
