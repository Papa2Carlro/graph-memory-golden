fn merge_sorted(a: [Int], b: [Int]) -> [Int] {
    var merged [Int] = []
    var i Int = 0
    var j Int = 0
    var limit Int = a.count() + b.count()
    var step Int = 0
    each step in 0..limit:
        if i >= a.count() and j >= b.count():
            break
        if j >= b.count():
            merged.append(a.get(i))
            i = i + 1
        else:
            if i >= a.count():
                merged.append(b.get(j))
                j = j + 1
            else:
                var left Int = a.get(i)
                var right Int = b.get(j)
                if left <= right:
                    merged.append(left)
                    i = i + 1
                else:
                    merged.append(right)
                    j = j + 1
    return merged
}

fn merge_sorted_sample() -> Int {
    var left [Int] = [1, 3, 5]
    var right [Int] = [2, 4, 6]
    var result [Int] = merge_sorted(left, right)
    return result.count()
}
