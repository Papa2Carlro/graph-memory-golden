module example.syntax.graph_connect

action graph_connect_sample() -> Bool {
    let left EndpointA = create EndpointA:
        label = "sample-left"

    let right EndpointB = create EndpointB:
        label = "sample-right"

    let edge LINK = connect left -LINK-> right:
        weight = 1

    let okLeft Bool = left.label is "sample-left"
    let okRight Bool = right.label is "sample-right"

    return okLeft and okRight
}

action graph_connect_verify() -> Bool {
    let left EndpointA = create EndpointA:
        label = "verify-left"

    let right EndpointB = create EndpointB:
        label = "verify-right"

    let edge LINK = connect left -LINK-> right:
        weight = 2

    let okLeft Bool = left.label is "verify-left"
    let okRight Bool = right.label is "verify-right"
    let okNotSample Bool = left.label is not "sample-left"

    return okLeft and okRight and okNotSample
}
