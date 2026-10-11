module example.reexport.implementation

private fn scale_seed() -> Int {
    return 10
}

public fn compute_value(base: Int) -> Int {
    return base + scale_seed()
}
