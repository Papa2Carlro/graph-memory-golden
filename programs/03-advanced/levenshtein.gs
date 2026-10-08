fn flat_index(row: Int, col: Int, width: Int) -> Int {
    return row * width + col
}

fn table_get(table: [Int], row: Int, col: Int, width: Int) -> Int {
    var idx Int = flat_index(row, col, width)
    return table.get(idx)
}

fn table_set(table: [Int], row: Int, col: Int, width: Int, value: Int) -> Int {
    var idx Int = flat_index(row, col, width)
    table.set(idx, value)
    return 0
}

fn min_int(left: Int, right: Int) -> Int {
    if left < right:
        return left
    return right
}

fn min_three(a: Int, b: Int, c: Int) -> Int {
    var ab Int = min_int(a, b)
    return min_int(ab, c)
}

fn make_zero_table(cellCount: Int) -> [Int] {
    var table [Int] = []
    var i Int = 0
    each i in 0..cellCount:
        table.append(0)
    return table
}

fn init_dp_base_row_column(table: [Int], rows: Int, cols: Int) -> Int {
    var i Int = 0
    each i in 0..rows:
        table_set(table, i, 0, cols, i)

    var j Int = 0
    each j in 0..cols:
        table_set(table, 0, j, cols, j)

    return 0
}

fn substitution_cost(left: String, right: String, row: Int, col: Int) -> Int {
    var leftChar Char = left.get(row - 1)
    var rightChar Char = right.get(col - 1)
    if leftChar is rightChar:
        return 0
    return 1
}

fn fill_dp_table(table: [Int], left: String, right: String, rows: Int, cols: Int) -> Int {
    var i Int = 1
    each i in 1..rows:
        var j Int = 1
        each j in 1..cols:
            var deleteCost Int = table_get(table, i - 1, j, cols) + 1
            var insertCost Int = table_get(table, i, j - 1, cols) + 1
            var replaceStep Int = substitution_cost(left, right, i, j)
            var matchCost Int = table_get(table, i - 1, j - 1, cols) + replaceStep
            var best Int = min_three(deleteCost, insertCost, matchCost)
            table_set(table, i, j, cols, best)
    return 0
}

fn levenshtein_distance(left: String, right: String) -> Int {
    var rows Int = left.count() + 1
    var cols Int = right.count() + 1
    var cellCount Int = rows * cols

    var table [Int] = make_zero_table(cellCount)
    var inited Int = init_dp_base_row_column(table, rows, cols)
    var filled Int = fill_dp_table(table, left, right, rows, cols)

    var ignored Int = inited
    ignored = filled

    var lastRow Int = rows - 1
    var lastCol Int = cols - 1
    return table_get(table, lastRow, lastCol, cols)
}

fn levenshtein_sample() -> Int {
    var bothEmpty Int = levenshtein_distance("", "")
    var insertAll Int = levenshtein_distance("", "abc")
    var deleteAll Int = levenshtein_distance("abc", "")
    var identical Int = levenshtein_distance("abc", "abc")

    var kitten Int = levenshtein_distance("kitten", "sitting")
    var flawLawn Int = levenshtein_distance("flaw", "lawn")
    var bookBack Int = levenshtein_distance("book", "back")

    var ignored0 Int = bothEmpty
    var ignored1 Int = insertAll
    var ignored2 Int = deleteAll
    var ignored3 Int = identical
    var ignored4 Int = flawLawn
    var ignored5 Int = bookBack

    return kitten
}
