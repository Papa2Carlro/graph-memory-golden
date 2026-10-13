module example.syntax.each_continue

private fn skippedCount(limit: Int) -> Int {
    var total Int = 0

    each i in 0..limit:
        if i is 2:
            continue

        total = total + 1

    return total
}

fn each_continue_sample() -> Int {
    return skippedCount(5)
}

fn each_continue_verify() -> Bool {
    let result Int = skippedCount(5)
    let okSkipped Bool = result is 4
    let okNotBreak Bool = result is not 2
    let okNotFull Bool = result is not 5

    return okSkipped and okNotBreak and okNotFull
}
