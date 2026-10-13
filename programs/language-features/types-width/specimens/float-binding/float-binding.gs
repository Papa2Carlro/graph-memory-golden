module example.syntax.float_binding

private fn observeRatio() -> Float {
    let ratio Float = 1.5
    return ratio
}

fn float_binding_sample() -> Float {
    return observeRatio()
}

fn float_binding_verify() -> Bool {
    let ratio Float = observeRatio()
    let okLow Bool = ratio is at least 1.5
    let okHigh Bool = ratio is at most 1.5
    return okLow and okHigh
}
