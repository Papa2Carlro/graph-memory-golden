fn dedupe_sorted(items: [Int]) -> [Int] {
    if items.count() == 0:
        return []

    var unique [Int] = []
    unique.append(items.get(0))
    var i Int = 1
    each i in 1..items.count():
        var value Int = items.get(i)
        var previous Int = items.get(i - 1)
        if value == previous:
            var noop Int = 0
        else:
            unique.append(value)
    return unique
}

fn dedupe_sorted_sample() -> Int {
    var data [Int] = [1, 1, 2, 2, 2, 3]
    var result [Int] = dedupe_sorted(data)
    return result.count()
}
