fn pair_start(flat: [Int], pairIdx: Int) -> Int {
    return flat.get(2 * pairIdx)
}

fn pair_end(flat: [Int], pairIdx: Int) -> Int {
    return flat.get(2 * pairIdx + 1)
}

fn pair_less_than(flat: [Int], lhs: Int, rhs: Int) -> Bool {
    var startL Int = pair_start(flat, lhs)
    var startR Int = pair_start(flat, rhs)
    if startL < startR:
        return true
    if startL > startR:
        return false
    var endL Int = pair_end(flat, lhs)
    var endR Int = pair_end(flat, rhs)
    return endL < endR
}

fn normalize_intervals(intervals: [Int]) -> [Int] {
    var normalized [Int] = []
    if intervals.count() == 0:
        return normalized

    var pairCount Int = intervals.count() / 2
    var p Int = 0
    each p in 0..pairCount:
        var lo Int = intervals.get(2 * p)
        var hi Int = intervals.get(2 * p + 1)
        if lo > hi:
            var swappedLo Int = hi
            var swappedHi Int = lo
            lo = swappedLo
            hi = swappedHi
        normalized.append(lo)
        normalized.append(hi)
    return normalized
}

fn sort_intervals(intervals: [Int]) -> [Int] {
    var sorted [Int] = []
    var remaining [Int] = []
    var i Int = 0
    each i in 0..intervals.count():
        remaining.append(intervals.get(i))

    var pairCount Int = remaining.count() / 2
    if pairCount == 0:
        return sorted

    var pass Int = 0
    each pass in 0..pairCount:
        var minPair Int = 0
        var numPairs Int = remaining.count() / 2
        var j Int = 1
        each j in 1..numPairs:
            if pair_less_than(remaining, j, minPair):
                minPair = j

        sorted.append(pair_start(remaining, minPair))
        sorted.append(pair_end(remaining, minPair))

        var nextRemaining [Int] = []
        var k Int = 0
        each k in 0..numPairs:
            if k == minPair:
                var noop Int = 0
            else:
                nextRemaining.append(pair_start(remaining, k))
                nextRemaining.append(pair_end(remaining, k))
        remaining = nextRemaining

    return sorted
}

fn merge_sorted_intervals(intervals: [Int]) -> [Int] {
    var merged [Int] = []
    if intervals.count() == 0:
        return merged

    var pairCount Int = intervals.count() / 2
    var currentLo Int = pair_start(intervals, 0)
    var currentHi Int = pair_end(intervals, 0)

    var p Int = 1
    each p in 1..pairCount:
        var nextLo Int = pair_start(intervals, p)
        var nextHi Int = pair_end(intervals, p)
        if nextLo <= currentHi:
            if nextHi > currentHi:
                currentHi = nextHi
        else:
            merged.append(currentLo)
            merged.append(currentHi)
            currentLo = nextLo
            currentHi = nextHi

    merged.append(currentLo)
    merged.append(currentHi)
    return merged
}

fn merge_overlapping_intervals(intervals: [Int]) -> [Int] {
    var normalized [Int] = normalize_intervals(intervals)
    var sorted [Int] = sort_intervals(normalized)
    return merge_sorted_intervals(sorted)
}

fn merge_overlapping_intervals_sample() -> [Int] {
    var empty [Int] = []
    var fromEmpty [Int] = merge_overlapping_intervals(empty)

    var single [Int] = [1, 3]
    var fromSingle [Int] = merge_overlapping_intervals(single)

    var chain [Int] = [1, 3, 2, 6, 8, 10, 9, 12]
    var fromChain [Int] = merge_overlapping_intervals(chain)

    var touch [Int] = [1, 4, 4, 5]
    var fromTouch [Int] = merge_overlapping_intervals(touch)

    var mixed [Int] = [5, 7, 1, 3, 2, 6, 10, 12]
    return merge_overlapping_intervals(mixed)
}
