module example.syntax.collection_set

private fn presentOrZero(value: Int?) -> Int {
    if value is not null:
        return value

    return 0
}

fn collection_set_sample() -> Int {
    let items [Int] = [10, 20, 30]
    let returned [Int] = items.set(1, 90)

    return presentOrZero(returned.get(1))
}

fn collection_set_verify() -> Bool {
    let items [Int] = [10, 20, 30]
    let alias [Int] = items
    let returned [Int] = items.set(1, 90)

    let fromItems Int = presentOrZero(items.get(1))
    let fromAlias Int = presentOrZero(alias.get(1))
    let fromReturned Int = presentOrZero(returned.get(1))
    let left Int = presentOrZero(items.get(0))
    let right Int = presentOrZero(items.get(2))

    let okItems Bool = fromItems is 90
    let okAlias Bool = fromAlias is 90
    let okReturned Bool = fromReturned is 90
    let okLeft Bool = left is 10
    let okRight Bool = right is 30
    let okNotOld Bool = fromItems is not 20

    return okItems and okAlias and okReturned and okLeft and okRight and okNotOld
}
