module example.syntax.each_break

private fn stoppedCount(limit: Int) -> Int {
    var total Int = 0

    each i in 0..limit:
        if i is 2:
            break

        total = total + 1

    return total
}

fn each_break_sample() -> Int {
    return stoppedCount(5)
}

fn each_break_verify() -> Bool {
    let result Int = stoppedCount(5)
    let okStopped Bool = result is 2
    let okNotFull Bool = result is not 5

    return okStopped and okNotFull
}
