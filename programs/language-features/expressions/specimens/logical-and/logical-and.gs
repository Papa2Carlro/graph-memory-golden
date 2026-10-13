module example.syntax.logical_and

private fn both(left: Bool, right: Bool) -> Bool {
    return left and right
}

fn logical_and_sample() -> Bool {
    return both(true, false)
}

fn logical_and_verify() -> Bool {
    let tt Bool = both(true, true)
    let tf Bool = both(true, false)
    let ft Bool = both(false, true)
    let ff Bool = both(false, false)
    let okTT Bool = tt is true
    let okTF Bool = tf is false
    let okFT Bool = ft is false
    let okFF Bool = ff is false
    return okTT and okTF and okFT and okFF
}
