fn flat_edge_index(n: Int, u: Int, v: Int) -> Int {
    return u * n + v
}

fn make_zero_adjacency(cellCount: Int) -> [Int] {
    var adjacency [Int] = []
    var i Int = 0
    each i in 0..cellCount:
        adjacency.append(0)
    return adjacency
}

fn adjacency_set(adjacency: [Int], n: Int, u: Int, v: Int, value: Int) -> Int {
    var idx Int = flat_edge_index(n, u, v)
    adjacency.set(idx, value)
    return 0
}

fn adjacency_get(adjacency: [Int], n: Int, u: Int, v: Int) -> Int {
    var idx Int = flat_edge_index(n, u, v)
    return adjacency.get(idx)
}

fn adjacency_shape_valid(n: Int, adjacency: [Int]) -> Bool {
    if n < 0:
        return false
    var expected Int = n * n
    return adjacency.count() == expected
}

fn vertex_indices_valid(n: Int, source: Int, target: Int) -> Bool {
    if source < 0:
        return false
    if target < 0:
        return false
    if source >= n:
        return false
    if target >= n:
        return false
    return true
}

fn adjacency_cells_binary_valid(adjacency: [Int]) -> Bool {
    var i Int = 0
    each i in 0..adjacency.count():
        var cell Int = adjacency.get(i)
        if cell == 0:
            var zeroOk Int = 0
        else:
            if cell == 1:
                var oneOk Int = 0
            else:
                return false
    return true
}

fn bfs_input_valid(adjacency: [Int], n: Int, source: Int, target: Int) -> Bool {
    if not adjacency_shape_valid(n, adjacency):
        return false
    if not vertex_indices_valid(n, source, target):
        return false
    if not adjacency_cells_binary_valid(adjacency):
        return false
    return true
}

fn init_distance_unvisited(n: Int) -> [Int] {
    var distance [Int] = []
    var i Int = 0
    each i in 0..n:
        distance.append(-1)
    return distance
}

fn init_predecessor_missing(n: Int) -> [Int] {
    var predecessor [Int] = []
    var i Int = 0
    each i in 0..n:
        predecessor.append(-1)
    return predecessor
}

fn init_visited_false(n: Int) -> [Bool] {
    var visited [Bool] = []
    var i Int = 0
    each i in 0..n:
        visited.append(false)
    return visited
}

fn queue_has_pending(head: Int, queue: [Int]) -> Bool {
    return head < queue.count()
}

fn enqueue_vertex(queue: [Int], vertex: Int) -> Int {
    queue.append(vertex)
    return 0
}

fn make_singleton_path(vertex: Int) -> [Int] {
    var path [Int] = []
    path.append(vertex)
    return path
}

fn reverse_into_path(chain: [Int]) -> [Int] {
    var path [Int] = []
    var len Int = chain.count()
    var j Int = 0
    each j in 0..len:
        var idx Int = len - 1 - j
        path.append(chain.get(idx))
    return path
}

fn reconstruct_shortest_path(
    predecessor: [Int],
    source: Int,
    target: Int,
    n: Int,
) -> [Int]? {
    var chain [Int] = []
    var cur Int = target
    var step Int = 0
    each step in 0..n:
        chain.append(cur)
        if cur == source:
            var built [Int] = reverse_into_path(chain)
            return built
        cur = predecessor.get(cur)
        if cur == -1:
            return null
    return null
}

fn run_bfs_flat(
    n: Int,
    adjacency: [Int],
    source: Int,
    target: Int,
    distance: [Int],
    predecessor: [Int],
    visited: [Bool],
    queue: [Int],
) -> Int {
    distance.set(source, 0)
    visited.set(source, true)
    enqueue_vertex(queue, source)

    var head Int = 0
    each step in 0..(n * n + 1):
        if not queue_has_pending(head, queue):
            break

        var u Int = queue.get(head)
        head = head + 1

        var v Int = 0
        each v in 0..n:
            var edge Int = adjacency_get(adjacency, n, u, v)
            if edge != 1:
                var skip Int = 0
            else:
                var seen Bool = visited.get(v)
                if seen:
                    var noop Int = 0
                else:
                    visited.set(v, true)
                    var distU Int = distance.get(u)
                    distance.set(v, distU + 1)
                    predecessor.set(v, u)
                    enqueue_vertex(queue, v)

    return head
}

fn bfs_shortest_path_flat(
    n: Int,
    adjacency: [Int],
    source: Int,
    target: Int,
) -> [Int]? {
    if not bfs_input_valid(adjacency, n, source, target):
        return null

    if source == target:
        return make_singleton_path(source)

    var distance [Int] = init_distance_unvisited(n)
    var predecessor [Int] = init_predecessor_missing(n)
    var visited [Bool] = init_visited_false(n)
    var queue [Int] = []

    run_bfs_flat(
        n,
        adjacency,
        source,
        target,
        distance,
        predecessor,
        visited,
        queue,
    )

    var targetDist Int = distance.get(target)
    if targetDist == -1:
        return null

    return reconstruct_shortest_path(predecessor, source, target, n)
}

fn paths_equal(left: [Int], right: [Int]) -> Bool {
    if left.count() != right.count():
        return false
    var i Int = 0
    each i in 0..left.count():
        if left.get(i) != right.get(i):
            return false
    return true
}

fn path_matches_expected(
    n: Int,
    adjacency: [Int],
    source: Int,
    target: Int,
    expected: [Int],
) -> Bool {
    var got [Int]? = bfs_shortest_path_flat(n, adjacency, source, target)
    if not exists got:
        return false
    var path [Int] = got
    return paths_equal(path, expected)
}

fn path_is_absent(
    n: Int,
    adjacency: [Int],
    source: Int,
    target: Int,
) -> Bool {
    var got [Int]? = bfs_shortest_path_flat(n, adjacency, source, target)
    return not exists got
}

fn path_edge_count(path: [Int]) -> Int {
    if path.count() <= 1:
        return 0
    return path.count() - 1
}

fn path_follows_directed_edges(
    n: Int,
    adjacency: [Int],
    path: [Int],
) -> Bool {
    if path.count() <= 1:
        return true
    var i Int = 0
    each i in 0..(path.count() - 1):
        var u Int = path.get(i)
        var v Int = path.get(i + 1)
        var edge Int = adjacency_get(adjacency, n, u, v)
        if edge != 1:
            return false
    return true
}

fn bfs_shortest_path_flat_verify() -> Bool {
    var adjTwo [Int] = make_zero_adjacency(4)
    var nTwo Int = 2
    adjacency_set(adjTwo, nTwo, 0, 1, 1)
    var validReachInput Bool = bfs_input_valid(adjTwo, nTwo, 0, 1)
    var okDirectPath Bool = path_matches_expected(nTwo, adjTwo, 0, 1, [0, 1])
    var okDirect Bool = validReachInput and okDirectPath

    var adjChain [Int] = make_zero_adjacency(16)
    var nFour Int = 4
    adjacency_set(adjChain, nFour, 0, 1, 1)
    adjacency_set(adjChain, nFour, 1, 2, 1)
    adjacency_set(adjChain, nFour, 2, 3, 1)
    var okChain Bool = path_matches_expected(nFour, adjChain, 0, 3, [0, 1, 2, 3])

    var adjDiamond [Int] = make_zero_adjacency(16)
    adjacency_set(adjDiamond, nFour, 0, 1, 1)
    adjacency_set(adjDiamond, nFour, 0, 2, 1)
    adjacency_set(adjDiamond, nFour, 1, 3, 1)
    adjacency_set(adjDiamond, nFour, 2, 3, 1)
    var okTie Bool = path_matches_expected(nFour, adjDiamond, 0, 3, [0, 1, 3])

    var adjUnreachable [Int] = make_zero_adjacency(4)
    var validUnreachableInput Bool = bfs_input_valid(adjUnreachable, nTwo, 0, 1)
    var okNoRouteAbsent Bool = path_is_absent(nTwo, adjUnreachable, 0, 1)
    var okNoRoute Bool = validUnreachableInput and okNoRouteAbsent

    var okSame Bool = path_matches_expected(nTwo, adjTwo, 0, 0, [0])

    var adjAsym [Int] = make_zero_adjacency(4)
    adjacency_set(adjAsym, nTwo, 1, 0, 1)
    var okAsym Bool = path_is_absent(nTwo, adjAsym, 0, 1)

    var okBadSource Bool = not bfs_input_valid(adjTwo, nTwo, 2, 1)

    var okBadTarget Bool = not bfs_input_valid(adjTwo, nTwo, 0, 2)

    var badShape [Int] = [0, 1, 0]
    var okBadShape Bool = not bfs_input_valid(badShape, nTwo, 0, 1)

    var emptyAdj [Int] = []
    var nZero Int = 0
    var okEmpty Bool = not bfs_input_valid(emptyAdj, nZero, 0, 0)

    var adjBadCell [Int] = make_zero_adjacency(4)
    adjacency_set(adjBadCell, nTwo, 0, 1, 2)
    var okBadCellTwo Bool = not bfs_input_valid(adjBadCell, nTwo, 0, 1)

    var adjBadNeg [Int] = make_zero_adjacency(4)
    adjacency_set(adjBadNeg, nTwo, 1, 0, -1)
    var okBadCellNeg Bool = not bfs_input_valid(adjBadNeg, nTwo, 0, 1)

    var chainPath [Int]? = bfs_shortest_path_flat(nFour, adjChain, 0, 3)
    var okDist Bool = false
    var okEdges Bool = false
    if exists chainPath:
        var chain [Int] = chainPath
        okDist = path_edge_count(chain) == 3
        okEdges = path_follows_directed_edges(nFour, adjChain, chain)

    return okDirect and okChain and okTie and okNoRoute and okSame and okAsym
        and okBadSource and okBadTarget and okBadShape and okEmpty
        and okBadCellTwo and okBadCellNeg and okDist and okEdges
}

fn bfs_shortest_path_flat_sample() -> Int {
    var adjDiamond [Int] = make_zero_adjacency(16)
    var nFour Int = 4
    adjacency_set(adjDiamond, nFour, 0, 1, 1)
    adjacency_set(adjDiamond, nFour, 0, 2, 1)
    adjacency_set(adjDiamond, nFour, 1, 3, 1)
    adjacency_set(adjDiamond, nFour, 2, 3, 1)

    var last [Int]? = bfs_shortest_path_flat(nFour, adjDiamond, 0, 3)
    if not exists last:
        return 0
    return last.count()
}
