fn starts_with(text: String, prefix: String) -> Bool {
    var n Int = prefix.count()
    if n > text.count():
        return false
    if n is 0:
        return true

    var i Int = 0
    each i in 0..n:
        var left Char = text.get(i)
        var right Char = prefix.get(i)
        if left is not right:
            return false
    return true
}

fn starts_with_sample() -> Bool {
    return starts_with("banana", "ban")
}
