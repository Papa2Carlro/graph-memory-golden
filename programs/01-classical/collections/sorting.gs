fn sort(items: [Int]) -> [Int] {
    var sorted [Int] = []
    var sortedAlias [Int] = sorted

    var remaining [Int] = []
    var i Int = 0
    each i in 0..items.count():
        remaining.append(items.get(i))

    var n Int = remaining.count()
    var pass Int = 0
    each pass in 0..n:
        var minIdx Int = 0
        var j Int = 0
        each j in 1..remaining.count():
            var lhs Int = remaining.get(j)
            var rhs Int = remaining.get(minIdx)
            if lhs < rhs:
                minIdx = j

        sortedAlias.append(remaining.get(minIdx))

        var nextRemaining [Int] = []
        var k Int = 0
        each k in 0..remaining.count():
            if k == minIdx:
                var noop Int = 0
            else:
                nextRemaining.append(remaining.get(k))
        remaining = nextRemaining

    return sorted
}

fn sort_sample() -> [Int] {
    var data [Int] = [5, 3, 1, 4, 2]
    return sort(data)
}
