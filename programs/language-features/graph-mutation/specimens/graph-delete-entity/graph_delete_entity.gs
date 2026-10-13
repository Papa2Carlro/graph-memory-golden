module example.syntax.graph_delete_entity

action graph_delete_entity_sample() -> Bool {
    let node RemovableNode = create RemovableNode:
        tag = "sample-target"

    delete node

    return true
}

action graph_delete_entity_verify() -> Bool {
    let node RemovableNode = create RemovableNode:
        tag = "verify-target"

    delete node

    return true
}
