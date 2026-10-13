module example.syntax.logical_or

private fn either(left: Bool, right: Bool) -> Bool {
    return left or right
}

fn logical_or_sample() -> Bool {
    return either(false, true)
}

fn logical_or_verify() -> Bool {
    let tt Bool = either(true, true)
    let tf Bool = either(true, false)
    let ft Bool = either(false, true)
    let ff Bool = either(false, false)
    let okTT Bool = tt is true
    let okTF Bool = tf is true
    let okFT Bool = ft is true
    let okFF Bool = ff is false
    return okTT and okTF and okFT and okFF
}
