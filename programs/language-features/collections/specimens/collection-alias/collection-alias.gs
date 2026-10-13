module example.syntax.collection_alias

private fn observeAlias() -> Bool {
    var original [Int] = [1, 2, 3]
    let alias [Int] = original
    let written [Int] = original.set(1, 20)
    let observed Int = alias.get(1) ?? 0
    let fromWritten Int = written.get(1) ?? 0
    let okAlias Bool = observed is 20
    let okWritten Bool = fromWritten is 20
    return okAlias and okWritten
}

fn collection_alias_sample() -> Bool {
    return observeAlias()
}

fn collection_alias_verify() -> Bool {
    return observeAlias()
}
