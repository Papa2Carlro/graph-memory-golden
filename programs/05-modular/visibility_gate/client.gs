module example.visibility.client

use example.visibility.internal::public_label
use example.visibility.internal::internal_visibility_self_test

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

fn visibility_gate_verify() -> Bool {
    var okPublic Bool = strings_equal(public_label(), "gate-open")
    var okInternal Bool = internal_visibility_self_test()
    return okPublic and okInternal
}

fn visibility_gate_sample() -> String {
    return public_label()
}
