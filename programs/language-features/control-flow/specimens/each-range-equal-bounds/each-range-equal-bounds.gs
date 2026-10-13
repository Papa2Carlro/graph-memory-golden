module example.syntax.each_range_equal_bounds

private fn observeEqualBounds() -> Bool {
    var iterations Int = 0
    var sentinel Int = 17

    each i in 3..3:
        iterations = iterations + 1
        sentinel = 99

    let okIterations Bool = iterations is 0
    let okSentinel Bool = sentinel is 17

    return okIterations and okSentinel
}

fn each_range_equal_bounds_sample() -> Bool {
    return observeEqualBounds()
}

fn each_range_equal_bounds_verify() -> Bool {
    let result Bool = each_range_equal_bounds_sample()

    return result is true
}
