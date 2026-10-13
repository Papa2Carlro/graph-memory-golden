module example.syntax.if_logical_condition

private fn evaluateAnd(a: Bool, b: Bool) -> Int {
    if a and b:
        return 1
    return 0
}

private fn evaluateOr(a: Bool, b: Bool) -> Int {
    if a or b:
        return 1
    return 0
}

private fn evaluateNot(a: Bool) -> Int {
    if not a:
        return 1
    return 0
}

fn if_logical_condition_sample() -> Int {
    return evaluateAnd(true, true)
}

fn if_logical_condition_verify() -> Bool {
    let andTrue Int = evaluateAnd(true, true)
    let andFalse Int = evaluateAnd(true, false)
    let orTrue Int = evaluateOr(false, true)
    let orFalse Int = evaluateOr(false, false)
    let notTrue Int = evaluateNot(false)
    let notFalse Int = evaluateNot(true)
    let okAndTrue Bool = andTrue is 1
    let okAndFalse Bool = andFalse is 0
    let okOrTrue Bool = orTrue is 1
    let okOrFalse Bool = orFalse is 0
    let okNotTrue Bool = notTrue is 1
    let okNotFalse Bool = notFalse is 0
    return okAndTrue and okAndFalse and okOrTrue and okOrFalse and okNotTrue and okNotFalse
}
