module example.hello.main

use example.hello.greet::greet

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

fn two_module_hello_verify() -> Bool {
    var expected String = "Hello, Graph Script!"
    var actual String = greet()
    var okGreeting Bool = strings_equal(actual, expected)
    return okGreeting
}

fn two_module_hello_sample() -> String {
    return greet()
}
