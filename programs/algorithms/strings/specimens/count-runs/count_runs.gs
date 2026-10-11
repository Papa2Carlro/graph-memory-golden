fn count_runs(text: String) -> Int {
    if text.count() == 0:
        return 0

    var runs Int = 1
    var i Int = 1
    each i in 1..text.count():
        var current Char = text.get(i)
        var previous Char = text.get(i - 1)
        if current is not previous:
            runs = runs + 1
    return runs
}

fn count_runs_sample() -> Int {
    return count_runs("aabbbcc")
}
