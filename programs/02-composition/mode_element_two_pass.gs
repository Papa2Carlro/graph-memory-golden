fn is_present(items: [Int], target: Int) -> Bool {
    var i Int = 0
    each i in 0..items.count():
        var value Int = items.get(i)
        if value == target:
            return true
    return false
}

fn collect_uniques(items: [Int]) -> [Int] {
    var uniques [Int] = []
    var i Int = 0
    each i in 0..items.count():
        var value Int = items.get(i)
        if is_present(uniques, value):
            var noop Int = 0
        else:
            uniques.append(value)
    return uniques
}

fn frequency_of(items: [Int], candidate: Int) -> Int {
    var count Int = 0
    var i Int = 0
    each i in 0..items.count():
        var value Int = items.get(i)
        if value == candidate:
            count = count + 1
    return count
}

fn pick_max_freq(items: [Int], uniques: [Int]) -> Int {
    var bestValue Int = uniques.get(0)
    var bestCount Int = frequency_of(items, bestValue)

    var u Int = 1
    each u in 1..uniques.count():
        var candidate Int = uniques.get(u)
        var freq Int = frequency_of(items, candidate)
        if freq > bestCount:
            bestCount = freq
            bestValue = candidate

    return bestValue
}

fn mode_element(items: [Int]) -> Int {
    if items.count() == 0:
        return -1

    var uniques [Int] = collect_uniques(items)
    return pick_max_freq(items, uniques)
}

fn mode_element_two_pass_sample() -> Int {
    var empty [Int] = []
    var absentMode Int = mode_element(empty)

    var single [Int] = [1]
    var oneMode Int = mode_element(single)

    var simple [Int] = [1, 2, 2, 3]
    var simpleMode Int = mode_element(simple)

    var tie [Int] = [1, 2, 2, 3, 3]
    var tieMode Int = mode_element(tie)

    var dominant [Int] = [3, 3, 2, 2, 2, 3]
    return mode_element(dominant)
}
