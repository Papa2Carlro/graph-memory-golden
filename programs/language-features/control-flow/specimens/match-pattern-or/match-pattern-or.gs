module example.syntax.match_pattern_or

private fn classify(value: Int) -> Int {
    match value:
        1 or 2:
            return 10
        else:
            return 20
}

fn match_pattern_or_sample() -> Int {
    return classify(1)
}

fn match_pattern_or_verify() -> Bool {
    let first Int = classify(1)
    let second Int = classify(2)
    let other Int = classify(3)
    let okFirst Bool = first is 10
    let okSecond Bool = second is 10
    let okOther Bool = other is 20
    return okFirst and okSecond and okOther
}
