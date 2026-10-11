fn copy_collection(items: [Int]) -> [Int] {
    var copy [Int] = []
    var i Int = 0
    each i in 0..items.count():
        copy.append(items.get(i))
    return copy
}

fn copy_collection_sample() -> Int {
    var data [Int] = [1, 2, 3]
    var snapshot [Int] = copy_collection(data)
    return snapshot.count()
}
