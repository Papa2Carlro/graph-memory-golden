module example.syntax.module_public_let

public let base Int = 10

private fn readBase() -> Int {
    return base
}

fn module_public_let_sample() -> Int {
    return readBase()
}

fn module_public_let_verify() -> Bool {
    let first Int = readBase()
    let second Int = readBase()
    let okFirst Bool = first is 10
    let okSecond Bool = second is 10
    return okFirst and okSecond
}
