fn find_char(text: String, target: Char) -> Int {
    var i Int = 0
    each i in 0..text.count():
        var value Char = text.get(i)
        if value is target:
            return i
    return -1
}

fn find_char_sample() -> Int {
    var text String = "banana"
    var target Char = text.get(1)
    return find_char(text, target)
}
