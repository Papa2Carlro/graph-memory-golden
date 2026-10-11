fn count_value(items: [Int], target: Int) -> Int {
    var count Int = 0
    var i Int = 0
    each i in 0..items.count():
        var value Int = items.get(i)
        if value == target:
            count = count + 1
    return count
}

fn count_value_sample() -> Int {
    var data [Int] = [1, 2, 3, 2, 2]
    return count_value(data, 2)
}
