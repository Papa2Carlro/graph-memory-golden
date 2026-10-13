module example.syntax.each_nested_control

private fn nestedBreak() -> Int {
    var total Int = 0

    each outer in 0..3:
        each inner in 0..2:
            total = total + 1
            break

    return total
}

private fn nestedContinue() -> Int {
    var total Int = 0

    each outer in 0..3:
        each inner in 0..3:
            if inner is 1:
                continue
            total = total + 1

    return total
}

fn each_nested_control_sample() -> Int {
    return nestedBreak()
}

fn each_nested_control_verify() -> Bool {
    let stopped Int = nestedBreak()
    let skipped Int = nestedContinue()
    let okStopped Bool = stopped is 3
    let okSkipped Bool = skipped is 6
    return okStopped and okSkipped
}
