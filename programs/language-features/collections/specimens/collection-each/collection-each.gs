module example.syntax.collection_each

private fn sumItems(items: [Int]) -> Int {
    var total Int = 0

    each item in items:
        total = total + item

    return total
}

fn collection_each_sample() -> Int {
    let items [Int] = [10, 20, 30]

    return sumItems(items)
}

fn collection_each_verify() -> Bool {
    let items [Int] = [10, 20, 30]
    let empty [Int] = []

    let sum Int = sumItems(items)
    let emptySum Int = sumItems(empty)

    let okSum Bool = sum is 60
    let okEmpty Bool = emptySum is 0

    return okSum and okEmpty
}
