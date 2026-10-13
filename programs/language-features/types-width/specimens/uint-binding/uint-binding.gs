module example.syntax.uint_binding

private fn observeCount() -> UInt{32} {
    let count UInt{32} = 10
    return count
}

fn uint_binding_sample() -> UInt{32} {
    return observeCount()
}

fn uint_binding_verify() -> Bool {
    let observed UInt{32} = observeCount()
    let expected UInt{32} = 10
    return observed is expected
}
