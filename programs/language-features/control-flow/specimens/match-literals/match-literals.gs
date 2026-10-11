fn classify_status(code Int) -> String {
    match code:
        0:
            return "idle"
        1:
            return "running"
        2:
            return "finished"
        else:
            return "unknown"
}

fn match_literals_sample() -> String {
    return classify_status(1)
}

fn match_literals_verify() -> Bool {
    let idle String = classify_status(0)
    let running String = classify_status(1)
    let finished String = classify_status(2)
    let unknown String = classify_status(99)

    let okIdle Bool = idle is "idle"
    let okRunning Bool = running is "running"
    let okFinished Bool = finished is "finished"
    let okUnknown Bool = unknown is "unknown"

    return okIdle and okRunning and okFinished and okUnknown
}
