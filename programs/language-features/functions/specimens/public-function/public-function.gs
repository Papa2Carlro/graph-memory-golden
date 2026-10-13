module example.syntax.public_function

public fn exportedValue() -> Int {
    return 10
}

fn public_function_sample() -> Int {
    return exportedValue()
}

fn public_function_verify() -> Bool {
    let observed Int = exportedValue()
    return observed is 10
}
