fn ends_with(text: String, suffix: String) -> Bool {
    var m Int = suffix.count()
    var n Int = text.count()
    if m > n:
        return false
    if m is 0:
        return true

    var offset Int = n - m
    var i Int = 0
    each i in 0..m:
        var left Char = text.get(offset + i)
        var right Char = suffix.get(i)
        if left is not right:
            return false
    return true
}

fn ends_with_sample() -> Bool {
    return ends_with("banana", "ana")
}
