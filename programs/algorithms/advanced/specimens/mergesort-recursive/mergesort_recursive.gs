fn copy_subrange(items: [Int], start: Int, end: Int) -> [Int] {
    var slice [Int] = []
    var i Int = start
    each i in start..end:
        slice.append(items.get(i))
    return slice
}

fn copy_collection(items: [Int]) -> [Int] {
    return copy_subrange(items, 0, items.count())
}

fn merge_two_sorted(left: [Int], right: [Int]) -> [Int] {
    var merged [Int] = []
    var i Int = 0
    var j Int = 0
    var limit Int = left.count() + right.count()
    var step Int = 0
    each step in 0..limit:
        if i >= left.count() and j >= right.count():
            break
        if j >= right.count():
            merged.append(left.get(i))
            i = i + 1
        else:
            if i >= left.count():
                merged.append(right.get(j))
                j = j + 1
            else:
                var lhs Int = left.get(i)
                var rhs Int = right.get(j)
                if lhs <= rhs:
                    merged.append(lhs)
                    i = i + 1
                else:
                    merged.append(rhs)
                    j = j + 1
    return merged
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

fn mergesort_recursive(items: [Int]) -> [Int] {
    if items.count() <= 1:
        return copy_collection(items)

    var length Int = items.count()
    var mid Int = length / 2

    var leftHalf [Int] = copy_subrange(items, 0, mid)
    var rightHalf [Int] = copy_subrange(items, mid, length)

    var sortedLeft [Int] = mergesort_recursive(leftHalf)
    var sortedRight [Int] = mergesort_recursive(rightHalf)

    return merge_two_sorted(sortedLeft, sortedRight)
}

fn mergesort_recursive_verify() -> Bool {
    var empty [Int] = []
    var sortedEmpty [Int] = mergesort_recursive(empty)

    var one [Int] = [7]
    var sortedOne [Int] = mergesort_recursive(one)

    var alreadySorted [Int] = [1, 2, 3, 4, 5]
    var sortedAscending [Int] = mergesort_recursive(alreadySorted)

    var descending [Int] = [5, 4, 3, 2, 1]
    var sortedDescending [Int] = mergesort_recursive(descending)

    var duplicates [Int] = [2, 1, 2, 1, 2, 1]
    var sortedDuplicates [Int] = mergesort_recursive(duplicates)

    var mixedSigns [Int] = [3, -1, 0, -4, 2, -2]
    var sortedMixed [Int] = mergesort_recursive(mixedSigns)

    var deep [Int] = [8, 3, 6, 1, 9, 2, 7, 4]
    var sortedDeep [Int] = mergesort_recursive(deep)

    var emptyOk Bool = is_non_decreasing(sortedEmpty)
    var oneOk Bool = is_non_decreasing(sortedOne)
    var ascOk Bool = is_non_decreasing(sortedAscending)
    var descOk Bool = is_non_decreasing(sortedDescending)
    var dupOk Bool = is_non_decreasing(sortedDuplicates)
    var mixOk Bool = is_non_decreasing(sortedMixed)
    var deepOk Bool = is_non_decreasing(sortedDeep)

    return emptyOk and oneOk and ascOk and descOk and dupOk and mixOk and deepOk
}

fn mergesort_recursive_sample() -> [Int] {
    var deep [Int] = [8, 3, 6, 1, 9, 2, 7, 4]
    return mergesort_recursive(deep)
}
