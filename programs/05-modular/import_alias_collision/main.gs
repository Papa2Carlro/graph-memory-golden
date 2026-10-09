module example.alias.main

use example.alias.a::token as token_from_a
use example.alias.b::token as token_from_b

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

fn import_alias_collision_verify() -> Bool {
    var alpha String = token_from_a()
    var beta String = token_from_b()
    var okAlpha Bool = strings_equal(alpha, "alias-alpha")
    var okBeta Bool = strings_equal(beta, "alias-beta")
    return okAlpha and okBeta
}

fn import_alias_collision_sample() -> String {
    var alpha String = token_from_a()
    var beta String = token_from_b()
    var wireAlpha Int = alpha.count()
    var wireBeta Int = beta.count()
    return beta
}
