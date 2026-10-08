fn longest_run(text: String) -> Int {
    if text.count() == 0:
        return 0
    if text.count() == 1:
        return 1

    var best Int = 1
    var run Int = 1
    var i Int = 1
    each i in 1..text.count():
        var current Char = text.get(i)
        var previous Char = text.get(i - 1)
        if current is previous:
            run = run + 1
        else:
            run = 1
        if run > best:
            best = run
    return best
}

fn longest_run_sample() -> Int {
    return longest_run("aabbbcc")
}
