fn filter_positive(items: [Int]) -> [Int] {
    var kept [Int] = []
    var i Int = 0
    each i in 0..items.count():
        var value Int = items.get(i)
        if value > 0:
            kept.append(value)
    return kept
}

fn filter_positive_sample() -> Int {
    var data [Int] = [-1, 2, 0, 3, -4, 5]
    var result [Int] = filter_positive(data)
    return result.count()
}
