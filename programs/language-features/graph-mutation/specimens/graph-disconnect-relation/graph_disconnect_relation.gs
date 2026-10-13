module example.syntax.graph_disconnect_relation

action graph_disconnect_relation_sample() -> Bool {
    let left DisconnectEndpointA = create DisconnectEndpointA:
        label = "sample-left"

    let right DisconnectEndpointB = create DisconnectEndpointB:
        label = "sample-right"

    let edge DISCONNECT_LINK = connect left -DISCONNECT_LINK-> right:
        weight = 1

    disconnect edge

    return true
}

action graph_disconnect_relation_verify() -> Bool {
    let left DisconnectEndpointA = create DisconnectEndpointA:
        label = "verify-left"

    let right DisconnectEndpointB = create DisconnectEndpointB:
        label = "verify-right"

    let edge DISCONNECT_LINK = connect left -DISCONNECT_LINK-> right:
        weight = 2

    disconnect edge

    return true
}
