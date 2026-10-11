module example.visibility.internal

fn strings_equal(left: String, right: String) -> Bool {
    if left.count() != right.count():
        return false

    var i Int = 0
    each i in 0..left.count():
        var a Char = left.get(i)
        var b Char = right.get(i)
        if a is not b:
            return false

    return true
}

public fn public_label() -> String {
    return "gate-open"
}

private fn secret_token() -> String {
    return "gate-secret-explicit"
}

fn default_token() -> String {
    return "gate-secret-default"
}

public fn internal_visibility_self_test() -> Bool {
    var okExplicit Bool = strings_equal(secret_token(), "gate-secret-explicit")
    var okDefault Bool = strings_equal(default_token(), "gate-secret-default")
    return okExplicit and okDefault
}
