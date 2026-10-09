module example.relative.lib

use ./support::part_b

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

public fn tag_line() -> String {
    if strings_equal(part_b(), "local"):
        return "relative-tag-local"
    return "relative-tag-miss"
}
