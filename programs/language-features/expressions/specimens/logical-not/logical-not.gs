module example.syntax.logical_not

private fn inverted(value: Bool) -> Bool {
    return not value
}

fn logical_not_sample() -> Bool {
    return inverted(false)
}

fn logical_not_verify() -> Bool {
    let fromFalse Bool = inverted(false)
    let fromTrue Bool = inverted(true)
    let okFalse Bool = fromFalse is true
    let okTrue Bool = fromTrue is false
    return okFalse and okTrue
}
