fn count_char(text: String, target: Char) -> Int {
    var count Int = 0
    each char in text:
        if char is target:
            count = count + 1
    return count
}

fn count_char_sample() -> Int {
    var text String = "banana"
    var target Char = text.get(1)
    return count_char(text, target)
}
