fn classify_number(value Int) -> String {
    if value is below 0:
        return "negative"
    elif value is 0:
        return "zero"
    else:
        return "positive"
}

fn if_elif_else_sample() -> String {
    return classify_number(0)
}

fn if_elif_else_verify() -> Bool {
    let negative String = classify_number(-1)
    let zero String = classify_number(0)
    let positive String = classify_number(1)

    let okNegative Bool = negative is "negative"
    let okZero Bool = zero is "zero"
    let okPositive Bool = positive is "positive"

    return okNegative and okZero and okPositive
}
