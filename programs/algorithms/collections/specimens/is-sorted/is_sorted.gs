fn is_sorted(items: [Int]) -> Bool {
    if items.count() == 0:
        return true
    if items.count() == 1:
        return true

    var i Int = 1
    each i in 1..items.count():
        var prev Int = items.get(i - 1)
        var curr Int = items.get(i)
        if curr < prev:
            return false
    return true
}

fn is_sorted_sample() -> Bool {
    var data [Int] = [1, 2, 3, 4]
    return is_sorted(data)
}
