module example.syntax.each_range_reversed_bounds

private fn observeReversedBounds() -> Bool {
    var iterations Int = 0
    var sentinel Int = 17

    each i in 5..3:
        iterations = iterations + 1
        sentinel = 99

    let okIterations Bool = iterations is 0
    let okSentinel Bool = sentinel is 17

    return okIterations and okSentinel
}

fn each_range_reversed_bounds_sample() -> Bool {
    return observeReversedBounds()
}

fn each_range_reversed_bounds_verify() -> Bool {
    let result Bool = each_range_reversed_bounds_sample()

    return result is true
}
