module example.syntax.ordering_comparisons

private fn checkOrdering() -> Bool {
    let a Int = 5
    let b Int = 10

    let belowTrue Bool = a is below b
    let belowFalse Bool = b is below a
    let belowEqual Bool = a is below a

    let aboveTrue Bool = b is above a
    let aboveFalse Bool = a is above b
    let aboveEqual Bool = a is above a

    let atLeastTrue Bool = b is at least a
    let atLeastFalse Bool = a is at least b
    let atLeastEqual Bool = a is at least a

    let atMostTrue Bool = a is at most b
    let atMostFalse Bool = b is at most a
    let atMostEqual Bool = a is at most a

    let belowCorrect Bool = belowTrue and not belowFalse and not belowEqual
    let aboveCorrect Bool = aboveTrue and not aboveFalse and not aboveEqual
    let atLeastCorrect Bool = atLeastTrue and not atLeastFalse and atLeastEqual
    let atMostCorrect Bool = atMostTrue and not atMostFalse and atMostEqual

    let strictCorrect Bool = belowCorrect and aboveCorrect
    let inclusiveCorrect Bool = atLeastCorrect and atMostCorrect

    return strictCorrect and inclusiveCorrect
}

fn ordering_comparisons_sample() -> Bool {
    return checkOrdering()
}

fn ordering_comparisons_verify() -> Bool {
    return checkOrdering()
}
