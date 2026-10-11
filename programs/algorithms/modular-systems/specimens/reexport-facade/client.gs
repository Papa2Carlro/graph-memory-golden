module example.reexport.client

use example.reexport.api::compute_value

fn reexport_facade_verify() -> Bool {
    var sample Int = compute_value(5)
    var okFive Bool = sample is 15
    var baseline Int = compute_value(0)
    var okZero Bool = baseline is 10
    return okFive and okZero
}

fn reexport_facade_sample() -> Int {
    return compute_value(1)
}
