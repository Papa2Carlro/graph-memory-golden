fn average_int(items: [Int]) -> Int {
    if items.count() == 0:
        return 0

    var sum Int = 0
    var i Int = 0
    each i in 0..items.count():
        sum = sum + items.get(i)

    return sum / items.count()
}

fn average_int_sample() -> Int {
    var data [Int] = [2, 4, 6, 8]
    return average_int(data)
}
