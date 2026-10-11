fn optional_get_sample() -> String? {
    let rows [String] = ["only"]

    return rows.get(0)
}

fn optional_get_verify() -> Bool {
    let present String? = "ok"
    let absent String? = null

    let rows [String] = ["only"]
    let hit String? = rows.get(0)
    let miss String? = rows.get(1)

    let okPresent Bool = exists present
    let okAbsent Bool = not exists absent
    let okHit Bool = exists hit
    let okMiss Bool = not exists miss

    return okPresent and okAbsent and okHit and okMiss
}
