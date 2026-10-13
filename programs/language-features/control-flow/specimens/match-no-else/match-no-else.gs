module example.syntax.match_no_else

private fn evaluate(value: Int) -> Int {
    match value:
        1:
            return 10
    return 20
}

fn match_no_else_sample() -> Int {
    return evaluate(5)
}

fn match_no_else_verify() -> Bool {
    let missed Int = evaluate(5)
    let matched Int = evaluate(1)
    let okMissed Bool = missed is 20
    let okMatched Bool = matched is 10
    return okMissed and okMatched
}
