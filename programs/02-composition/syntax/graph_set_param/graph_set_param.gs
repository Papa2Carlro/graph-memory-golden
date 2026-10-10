module example.syntax.graph_set_param

private action writeLabel(holder: LabelHolder) {
    set holder.label = "wired"
}

action graph_set_param_sample() -> Bool {
    let holder LabelHolder = create LabelHolder:
        label: "seed"

    writeLabel(holder)

    let ok Bool = holder.label is "wired"
    return ok
}

action graph_set_param_verify() -> Bool {
    let holder LabelHolder = create LabelHolder:
        label: "base"

    writeLabel(holder)

    let okValue Bool = holder.label is "wired"
    let okNotSeed Bool = holder.label is not "base"

    return okValue and okNotSeed
}
