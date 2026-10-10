fn int32_bounds_sample() -> Int{32} {
    let low Int{32} = 40
    let high Int{32} = 2

    return low + high
}

fn int32_bounds_verify() -> Bool {
    let result Int{32} = int32_bounds_sample()
    let expected Int{32} = 42

    return result is expected
}
