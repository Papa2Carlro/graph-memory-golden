module example.syntax.each_early_return

private fn findFirst(target: Int) -> Int {
    each value in 0..5:
        if value is target:
            return value

    return 5
}

fn each_early_return_sample() -> Int {
    return findFirst(2)
}

fn each_early_return_verify() -> Bool {
    let early Int = findFirst(2)
    let missing Int = findFirst(7)
    let first Int = findFirst(0)
    let okEarly Bool = early is 2
    let okMissing Bool = missing is 5
    let okFirst Bool = first is 0
    return okEarly and okMissing and okFirst
}
