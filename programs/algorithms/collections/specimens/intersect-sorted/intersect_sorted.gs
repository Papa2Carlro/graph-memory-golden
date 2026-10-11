fn intersect_sorted(a: [Int], b: [Int]) -> [Int] {
    var common [Int] = []
    var i Int = 0
    var j Int = 0
    var limit Int = a.count() + b.count()
    var step Int = 0
    each step in 0..limit:
        if i >= a.count() or j >= b.count():
            break
        var left Int = a.get(i)
        var right Int = b.get(j)
        if left == right:
            common.append(left)
            i = i + 1
            j = j + 1
        else:
            if left < right:
                i = i + 1
            else:
                j = j + 1
    return common
}

fn intersect_sorted_sample() -> Int {
    var left [Int] = [1, 2, 2, 3, 5]
    var right [Int] = [2, 2, 4, 5]
    var result [Int] = intersect_sorted(left, right)
    return result.count()
}
