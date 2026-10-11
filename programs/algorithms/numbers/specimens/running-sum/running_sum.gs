fn running_sum(items: [Int]) -> Int {
    var sum Int = 0
    var i Int = 0
    each i in 0..items.count():
        var value Int = items.get(i)
        sum = sum + value
    return sum
}

fn running_sum_sample() -> Int {
    var data [Int] = [1, 2, 3, 4, 5]
    return running_sum(data)
}
