module example.syntax.if_multiple_elif

private fn classify(value: Int) -> Int {
    if value is 1:
        return 10
    elif value is 2:
        return 20
    elif value is 3:
        return 30
    else:
        return 40
}

fn if_multiple_elif_sample() -> Int {
    return classify(2)
}

fn if_multiple_elif_verify() -> Bool {
    let first Int = classify(1)
    let second Int = classify(2)
    let third Int = classify(3)
    let other Int = classify(4)
    let okFirst Bool = first is 10
    let okSecond Bool = second is 20
    let okThird Bool = third is 30
    let okOther Bool = other is 40
    return okFirst and okSecond and okThird and okOther
}
