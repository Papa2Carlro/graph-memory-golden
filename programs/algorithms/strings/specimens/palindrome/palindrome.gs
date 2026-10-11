fn is_palindrome(text: String) -> Bool {
    var n Int = text.count()

    if n is 0:
        return true

    var i Int = 0
    each i in 0..n:
        if i * 2 >= n:
            break
        var left Char = text.get(i)
        var right Char = text.get(n - i - 1)
        if left is not right:
            return false

    return true
}
