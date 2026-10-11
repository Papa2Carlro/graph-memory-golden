fn let_vs_var_sample() -> Int {
    let fixed Int = 10
    var counter Int = 0

    counter = counter + 1

    return fixed + counter
}

fn let_vs_var_verify() -> Bool {
    let result Int = let_vs_var_sample()
    let expected Int = 11

    return result is expected
}
