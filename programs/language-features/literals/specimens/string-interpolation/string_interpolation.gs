module example.syntax.string_interpolation

fn string_interpolation_sample() -> String {
    let code Int = 7
    return "code {code}"
}

fn string_interpolation_verify() -> Bool {
    let rendered String = string_interpolation_sample()
    let expected String = "code 7"

    return rendered is expected
}
