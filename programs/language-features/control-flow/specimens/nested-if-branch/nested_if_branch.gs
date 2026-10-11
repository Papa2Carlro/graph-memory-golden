module example.syntax.nested_if_branch

private fn classify(value Int) -> String {
    if value is at most 0:
        return "non-positive"

    if value is above 0:
        if value is at most 10:
            return "positive"

    return "large"
}

fn nested_if_branch_sample() -> String {
    return classify(15)
}

fn nested_if_branch_verify() -> Bool {
    let large String = classify(15)
    let positive String = classify(5)
    let zero String = classify(0)
    let negative String = classify(-5)

    let okLarge Bool = large is "large"
    let okPositive Bool = positive is "positive"
    let okZero Bool = zero is "non-positive"
    let okNegative Bool = negative is "non-positive"

    return okLarge and okPositive and okZero and okNegative
}
