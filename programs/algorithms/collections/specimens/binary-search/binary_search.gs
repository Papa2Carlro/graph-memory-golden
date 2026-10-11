fn binary_search_range(items: [Int], target: Int, lo: Int, hi: Int) -> Int {
    if lo >= hi:
        return -1

    var mid Int = lo + (hi - lo) / 2
    var value Int = items.get(mid)

    if value == target:
        return mid
    if value < target:
        return binary_search_range(items, target, mid + 1, hi)
    return binary_search_range(items, target, lo, mid)
}

fn binary_search(items: [Int], target: Int) -> Int {
    return binary_search_range(items, target, 0, items.count())
}

fn binary_search_sample() -> Int {
    var data [Int] = [1, 3, 5, 7, 9]
    return binary_search(data, 7)
}
