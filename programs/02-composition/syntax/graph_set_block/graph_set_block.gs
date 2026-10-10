module example.syntax.graph_set_block

action graph_set_block_sample() -> Bool {
    let holder TagHolder = create TagHolder:
        label: "seed"
        code: "v0"

    set:
        holder.label = "alpha"
        holder.code = "v1"

    let okLabel Bool = holder.label is "alpha"
    let okCode Bool = holder.code is "v1"
    return okLabel and okCode
}

action graph_set_block_verify() -> Bool {
    let holder TagHolder = create TagHolder:
        label: "base"
        code: "old"

    set:
        holder.label = "checked"
        holder.code = "new"

    let okLabel Bool = holder.label is "checked"
    let okCode Bool = holder.code is "new"
    let okNotSeed Bool = holder.label is not "base"
    return okLabel and okCode and okNotSeed
}
