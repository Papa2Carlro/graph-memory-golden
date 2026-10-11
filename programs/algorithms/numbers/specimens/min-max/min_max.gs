fn min_value(items: [Int]) -> Int {
    if items.count() == 0:
        return 0

    var result Int = items.get(0)
    var i Int = 1
    each i in 1..items.count():
        var value Int = items.get(i)
        if value < result:
            result = value
    return result
}

fn max_value(items: [Int]) -> Int {
    if items.count() == 0:
        return 0

    var result Int = items.get(0)
    var i Int = 1
    each i in 1..items.count():
        var value Int = items.get(i)
        if value > result:
            result = value
    return result
}

fn min_max_sample() -> Int {
    var data [Int] = [7, 2, 9, 4, 1]
    return max_value(data)
}
