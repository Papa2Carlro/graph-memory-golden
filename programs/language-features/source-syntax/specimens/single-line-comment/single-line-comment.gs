module example.syntax.single_line_comment

// This comment has no runtime effect.
private fn calculate() -> Int {
    // The next declaration remains active.
    let value Int = 10 // Inline comment after a complete statement.
    // return 999
    return value
}

fn single_line_comment_sample() -> Int {
    return calculate()
}

fn single_line_comment_verify() -> Bool {
    let result Int = calculate()
    return result is 10
}
