module example.relative.main

use ./lib/helper::tag_line

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

fn relative_local_use_verify() -> Bool {
    var line String = tag_line()
    var okLine Bool = strings_equal(line, "relative-tag-local")
    return okLine
}

fn relative_local_use_sample() -> String {
    return tag_line()
}
