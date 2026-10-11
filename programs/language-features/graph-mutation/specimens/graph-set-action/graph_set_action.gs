module example.syntax.graph_set

action graph_set_action_sample() -> Bool {
    let holder LabelHolder = create LabelHolder:
        label: "seed"

    set holder.label = "wired"

    let ok Bool = holder.label is "wired"
    return ok
}

action graph_set_action_verify() -> Bool {
    let holder LabelHolder = create LabelHolder:
        label: "base"

    set holder.label = "checked"

    let okValue Bool = holder.label is "checked"
    let okNotSeed Bool = holder.label is not "base"

    return okValue and okNotSeed
}
