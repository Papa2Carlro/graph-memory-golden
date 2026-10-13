module example.syntax.inline_if_basic

private fn pick(flag: Bool) -> Int {
    var result Int = if flag then 10 else 20
    return result
}

fn inline_if_basic_sample() -> Int {
    return pick(true)
}

fn inline_if_basic_verify() -> Bool {
    let whenTrue Int = pick(true)
    let whenFalse Int = pick(false)
    let okTrue Bool = whenTrue is 10
    let okFalse Bool = whenFalse is 20
    return okTrue and okFalse
}
