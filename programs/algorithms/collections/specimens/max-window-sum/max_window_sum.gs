fn max_window_sum(items: [Int]) -> Int {
    if items.count() < 3:
        return 0

    var window Int = items.get(0) + items.get(1) + items.get(2)
    var best Int = window
    var i Int = 3
    each i in 3..items.count():
        window = window - items.get(i - 3) + items.get(i)
        if window > best:
            best = window
    return best
}

fn max_window_sum_sample() -> Int {
    var data [Int] = [1, 2, 3, 4, 5]
    return max_window_sum(data)
}
