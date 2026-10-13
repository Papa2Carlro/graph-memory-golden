module example.syntax.arithmetic_precedence_associativity

private fn precedence() -> Int {
    return 2 + 3 * 4
}

private fn associativity() -> Int {
    return 8 - 3 - 2
}

fn arithmetic_precedence_associativity_sample() -> Int {
    return precedence()
}

fn arithmetic_precedence_associativity_verify() -> Bool {
    let precedenceResult Int = precedence()
    let associativityResult Int = associativity()
    let okPrecedence Bool = precedenceResult is 14
    let okAssociativity Bool = associativityResult is 3
    return okPrecedence and okAssociativity
}
