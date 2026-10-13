module example.syntax.enum_qualified

private fn pickOpen() -> JobState {
    return JobState::open
}

fn enum_qualified_sample() -> String {
    let state JobState = JobState::open
    let also JobState = pickOpen()

    if state is JobState::open and also is JobState::open:
        return "open"

    return "closed"
}

fn enum_qualified_verify() -> Bool {
    let label String = enum_qualified_sample()
    let direct JobState = JobState::closed

    let okLabel Bool = label is "open"
    let okDirect Bool = direct is JobState::closed

    return okLabel and okDirect
}
