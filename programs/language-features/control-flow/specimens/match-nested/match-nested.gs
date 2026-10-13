module example.syntax.match_nested

private fn classify(outer: Int, inner: Int) -> Int {
    match outer:
        1:
            match inner:
                2:
                    return 12
                else:
                    return 10
        else:
            return 20
}

fn match_nested_sample() -> Int {
    return classify(1, 2)
}

fn match_nested_verify() -> Bool {
    let both Int = classify(1, 2)
    let innerElse Int = classify(1, 3)
    let outerElse Int = classify(3, 2)
    let okBoth Bool = both is 12
    let okInnerElse Bool = innerElse is 10
    let okOuterElse Bool = outerElse is 20
    return okBoth and okInnerElse and okOuterElse
}
