fn copy_collection(items: [Int]) -> [Int] {
    var copy [Int] = []
    var i Int = 0
    each i in 0..items.count():
        copy.append(items.get(i))
    return copy
}

fn append_all(into: [Int], from: [Int]) -> Int {
    var i Int = 0
    each i in 0..from.count():
        into.append(from.get(i))
    return 0
}

fn concat_three(first: [Int], second: [Int], third: [Int]) -> [Int] {
    var combined [Int] = []
    append_all(combined, first)
    append_all(combined, second)
    append_all(combined, third)
    return combined
}

fn choose_pivot(items: [Int]) -> Int {
    return items.get(0)
}

fn partition_three(
    items: [Int],
    pivot: Int,
    less: [Int],
    equal: [Int],
    greater: [Int],
) -> Int {
    var i Int = 0
    each i in 0..items.count():
        var value Int = items.get(i)
        if value < pivot:
            less.append(value)
        else:
            if value > pivot:
                greater.append(value)
            else:
                equal.append(value)
    return 0
}

fn is_non_decreasing(items: [Int]) -> Bool {
    if items.count() <= 1:
        return true
    var i Int = 1
    each i in 1..items.count():
        var prev Int = items.get(i - 1)
        var curr Int = items.get(i)
        if curr < prev:
            return false
    return true
}

fn quicksort_partition(items: [Int]) -> [Int] {
    if items.count() <= 1:
        return copy_collection(items)

    var pivot Int = choose_pivot(items)

    var less [Int] = []
    var equal [Int] = []
    var greater [Int] = []
    var partitioned Int = partition_three(items, pivot, less, equal, greater)

    var sortedLess [Int] = quicksort_partition(less)
    var sortedGreater [Int] = quicksort_partition(greater)

    var ignored Int = partitioned
    return concat_three(sortedLess, equal, sortedGreater)
}

fn quicksort_partition_sample() -> [Int] {
    var empty [Int] = []
    var sortedEmpty [Int] = quicksort_partition(empty)

    var one [Int] = [1]
    var sortedOne [Int] = quicksort_partition(one)

    var ascending [Int] = [1, 2, 3, 4, 5]
    var sortedAsc [Int] = quicksort_partition(ascending)

    var descending [Int] = [5, 4, 3, 2, 1]
    var sortedDesc [Int] = quicksort_partition(descending)

    var alternating [Int] = [2, 1, 2, 1, 2, 1]
    var sortedAlt [Int] = quicksort_partition(alternating)

    var allSame [Int] = [7, 7, 7, 7]
    var sortedSame [Int] = quicksort_partition(allSame)

    var mixedSigns [Int] = [3, -1, 0, -4, 2, -2]
    var sortedMixed [Int] = quicksort_partition(mixedSigns)

    var deep [Int] = [8, 3, 6, 1, 9, 2, 7, 4, 5, 0]
    var sortedDeep [Int] = quicksort_partition(deep)

    var okEmpty Bool = is_non_decreasing(sortedEmpty)
    var okOne Bool = is_non_decreasing(sortedOne)
    var okAsc Bool = is_non_decreasing(sortedAsc)
    var okDesc Bool = is_non_decreasing(sortedDesc)
    var okAlt Bool = is_non_decreasing(sortedAlt)
    var okSame Bool = is_non_decreasing(sortedSame)
    var okMixed Bool = is_non_decreasing(sortedMixed)
    var okDeep Bool = is_non_decreasing(sortedDeep)

    var ignored Bool = okEmpty
    ignored = okOne
    ignored = okAsc
    ignored = okDesc
    ignored = okAlt
    ignored = okSame
    ignored = okMixed
    ignored = okDeep

    return sortedDeep
}
