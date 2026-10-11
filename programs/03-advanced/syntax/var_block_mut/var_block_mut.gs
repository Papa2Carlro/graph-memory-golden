module example.syntax.var_block_mut

private fn sumAfterReassign() -> Int {
    var:
        first Int = 10
        second Int = 20

    first = 30

    return first + second
}

fn var_block_mut_sample() -> Int {
    return sumAfterReassign()
}

fn var_block_mut_verify() -> Bool {
    let result Int = var_block_mut_sample()
    let expected Int = 50
    let initialSum Int = 30

    let okSum Bool = result is expected
    let okNotInitialSum Bool = result is not initialSum
    let okNotSecondAlone Bool = result is not 20

    return okSum and okNotInitialSum and okNotSecondAlone
}
