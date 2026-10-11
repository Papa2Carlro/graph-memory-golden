module example.syntax.on_emit

private fn acknowledgeSignal(code: String) -> Bool {
    return code is not ""
}

on SignalRaised(event: SignalRaised) {
    acknowledgeSignal(event.code)
}

action on_emit_sample() -> Bool {
    let stage StageHolder = create StageHolder:
        tag: "sample-fixture"

    emit SignalRaised:
        code: "sample"

    let okFixture Bool = stage.tag is "sample-fixture"
    return okFixture
}

action on_emit_verify() -> Bool {
    let stage StageHolder = create StageHolder:
        tag: "verify-fixture"

    emit SignalRaised:
        code: "verify"

    let okTag Bool = stage.tag is "verify-fixture"
    let okNotSample Bool = stage.tag is not "sample-fixture"

    return okTag and okNotSample
}
