module example.syntax.each_string

private fn countChars(text: String) -> Int {
    var count Int = 0

    each char in text:
        count = count + 1

    return count
}

fn each_string_sample() -> Int {
    return countChars("abc")
}

fn each_string_verify() -> Bool {
    let nonempty Int = countChars("abc")
    let empty Int = countChars("")

    let okNonempty Bool = nonempty is 3
    let okEmpty Bool = empty is 0

    return okNonempty and okEmpty
}
