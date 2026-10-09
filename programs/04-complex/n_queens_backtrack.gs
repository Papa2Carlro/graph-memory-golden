fn init_n_queens_board(n: Int) -> [Int] {
    var board [Int] = []
    var i Int = 0
    each i in 0..n:
        board.append(-1)
    return board
}

fn board_all_unassigned(board: [Int]) -> Bool {
    var i Int = 0
    each i in 0..board.count():
        var col Int = board.get(i)
        if col != -1:
            return false
    return true
}

fn queens_safe_at(board: [Int], row: Int, col: Int) -> Bool {
    var r Int = 0
    each r in 0..row:
        var prevCol Int = board.get(r)
        if prevCol == col:
            return false

        var rowDelta Int = row - r
        var colDelta Int = col - prevCol
        if colDelta < 0:
            colDelta = 0 - colDelta
        if rowDelta == colDelta:
            return false
    return true
}

fn queens_search_from_row(board: [Int], n: Int, row: Int) -> Int {
    if row >= n:
        return 1

    var solutions Int = 0
    var col Int = 0
    each col in 0..n:
        if queens_safe_at(board, row, col):
            board.set(row, col)
            var found Int = queens_search_from_row(board, n, row + 1)
            solutions = solutions + found
            board.set(row, -1)
    return solutions
}

fn count_n_queens_solutions(n: Int) -> Int? {
    if n < 0:
        return null

    if n == 0:
        return 1

    var board [Int] = init_n_queens_board(n)
    var total Int = queens_search_from_row(board, n, 0)
    return total
}

fn count_matches_expected(n: Int, expected: Int) -> Bool {
    var got Int? = count_n_queens_solutions(n)
    if not exists got:
        return false
    var value Int = got
    return value == expected
}

fn negative_n_policy_absent(n: Int) -> Bool {
    var got Int? = count_n_queens_solutions(n)
    return not exists got
}

fn search_restores_board(n: Int) -> Bool {
    if n <= 0:
        return true

    var board [Int] = init_n_queens_board(n)
    queens_search_from_row(board, n, 0)
    return board_all_unassigned(board)
}

fn n_queens_backtrack_verify() -> Bool {
    var okZero Bool = count_matches_expected(0, 1)
    var okOne Bool = count_matches_expected(1, 1)
    var okTwo Bool = count_matches_expected(2, 0)
    var okThree Bool = count_matches_expected(3, 0)
    var okFour Bool = count_matches_expected(4, 2)
    var okFive Bool = count_matches_expected(5, 10)
    var okSix Bool = count_matches_expected(6, 4)
    var okSeven Bool = count_matches_expected(7, 40)
    var okEight Bool = count_matches_expected(8, 92)

    var negAbsent Bool = negative_n_policy_absent(-1)
    var restoreFour Bool = search_restores_board(4)
    var restoreEight Bool = search_restores_board(8)

    return okZero and okOne and okTwo and okThree and okFour and okFive
        and okSix and okSeven and okEight and negAbsent
        and restoreFour and restoreEight
}

fn n_queens_backtrack_sample() -> Int {
    var last Int? = count_n_queens_solutions(8)
    if not exists last:
        return 0
    return last
}
