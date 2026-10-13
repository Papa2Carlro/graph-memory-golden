module example.syntax.inline_if_nested

private fn pick(outer: Bool, inner: Bool) -> Int {
    var result Int = if outer
        then if inner
            then 10
            else 20
        else 30
    return result
}

fn inline_if_nested_sample() -> Int {
    return pick(true, true)
}

fn inline_if_nested_verify() -> Bool {
    let both Int = pick(true, true)
    let innerFalse Int = pick(true, false)
    let outerFalse Int = pick(false, true)
    let okBoth Bool = both is 10
    let okInnerFalse Bool = innerFalse is 20
    let okOuterFalse Bool = outerFalse is 30
    return okBoth and okInnerFalse and okOuterFalse
}
