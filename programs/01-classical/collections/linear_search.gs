fn linear_search(items: [Int], target: Int) -> Int {
    var i Int = 0
    each i in 0..items.count():
        var value Int = items.get(i)
        if value == target:
            return i
    return -1
}

fn linear_search_sample() -> Int {
    var data [Int] = [4, 7, 2, 9, 7]
    return linear_search(data, 7)
}
