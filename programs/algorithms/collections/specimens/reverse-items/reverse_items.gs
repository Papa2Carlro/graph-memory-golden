fn reverse_items(items: [Int]) -> [Int] {
    var reversed [Int] = []
    var n Int = items.count()
    var i Int = 0
    each i in 0..n:
        var index Int = n - 1 - i
        reversed.prepend(items.get(index))
    return reversed
}

fn reverse_items_sample() -> Int {
    var data [Int] = [1, 2, 3, 4]
    var result [Int] = reverse_items(data)
    return result.get(0)
}
