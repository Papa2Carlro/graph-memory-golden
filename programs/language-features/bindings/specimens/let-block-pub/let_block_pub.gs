module example.syntax.let_block_pub

private fn calculate() -> Int {
    let:
        first Int = 10
        second Int = 20
        pub total Int = first + second

    return total
}

fn let_block_pub_sample() -> Int {
    return calculate()
}

fn let_block_pub_verify() -> Bool {
    let result Int = let_block_pub_sample()
    let expected Int = 30

    let okSum Bool = result is expected
    let okNotFirst Bool = result is not 10
    let okNotSecond Bool = result is not 20

    return okSum and okNotFirst and okNotSecond
}
