module example.syntax.logical_short_circuit

private var hits Int = 0

private fn mark() -> Bool {
    hits = hits + 1
    return true
}

fn logical_short_circuit_sample() -> Bool {
    return logical_short_circuit_verify()
}

fn logical_short_circuit_verify() -> Bool {
    hits = 0
    let skipAnd Bool = false and mark()
    let skipOr Bool = true or mark()
    let evalAnd Bool = true and mark()
    let evalOr Bool = false or mark()
    let okSkipAnd Bool = skipAnd is false
    let okSkipOr Bool = skipOr is true
    let okEvalAnd Bool = evalAnd is true
    let okEvalOr Bool = evalOr is true
    let okHits Bool = hits is 2
    return okSkipAnd and okSkipOr and okEvalAnd and okEvalOr and okHits
}
