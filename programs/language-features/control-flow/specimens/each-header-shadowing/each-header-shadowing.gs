module example.syntax.each_header_shadowing

private fn observeShadowing() -> Int {
    var innerTotal Int = 0
    var outerTotal Int = 0
    each item in 0..4:
        each item in 0..2:
            innerTotal = innerTotal + item
        outerTotal = outerTotal + item
    return innerTotal + outerTotal
}

fn each_header_shadowing_sample() -> Int {
    return observeShadowing()
}

fn each_header_shadowing_verify() -> Bool {
    let result Int = observeShadowing()
    return result is 10
}
