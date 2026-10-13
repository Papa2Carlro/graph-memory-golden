module example.syntax.graph_disconnect_endpoint

action graph_disconnect_endpoint_sample() -> Bool {
    let left PatternEndpointA = create PatternEndpointA:
        label = "sample-left"

    let right PatternEndpointB = create PatternEndpointB:
        label = "sample-right"

    let edge PATTERN_LINK = connect left -PATTERN_LINK-> right:
        weight = 1

    disconnect left -PATTERN_LINK-> right

    return true
}

action graph_disconnect_endpoint_verify() -> Bool {
    let left PatternEndpointA = create PatternEndpointA:
        label = "verify-left"

    let right PatternEndpointB = create PatternEndpointB:
        label = "verify-right"

    let edge PATTERN_LINK = connect left -PATTERN_LINK-> right:
        weight = 2

    disconnect left -PATTERN_LINK-> right

    return true
}
