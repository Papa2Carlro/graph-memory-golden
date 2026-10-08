fn two_sum(items: [Int], target: Int) -> Int {
    var i Int = 0
    each i in 0..items.count():
        var j Int = i + 1
        each j in i + 1..items.count():
            var left Int = items.get(i)
            var right Int = items.get(j)
            if left + right == target:
                return i
    return -1
}

fn two_sum_sample() -> Int {
    var data [Int] = [2, 7, 11, 15]
    return two_sum(data, 9)
}
