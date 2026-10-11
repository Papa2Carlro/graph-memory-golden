fn scalar_count(text: String) -> Int {
    return text.count()
}

fn scalar_count_sample() -> Int {
    var text String = "é"
    return scalar_count(text)
}
