module example.syntax.arithmetic_remainder

private fn checkRemainder() -> Bool {
    let positive Int = 7
    let negative Int = -7

    let divisorPositive Int = 3
    let divisorNegative Int = -3

    let exactDividend Int = 8
    let exactDivisor Int = 2
    let zeroDividend Int = 0

    let expectedPositive Int = 1
    let expectedNegative Int = -1
    let expectedZero Int = 0

    let r1 Int = positive % divisorPositive
    let r2 Int = negative % divisorPositive
    let r3 Int = positive % divisorNegative
    let r4 Int = negative % divisorNegative
    let r5 Int = exactDividend % exactDivisor
    let r6 Int = zeroDividend % divisorPositive

    let case1 Bool = r1 is expectedPositive
    let case2 Bool = r2 is expectedNegative
    let case3 Bool = r3 is expectedPositive
    let case4 Bool = r4 is expectedNegative
    let case5 Bool = r5 is expectedZero
    let case6 Bool = r6 is expectedZero

    let firstGroup Bool = case1 and case2
    let secondGroup Bool = case3 and case4
    let thirdGroup Bool = case5 and case6

    let allNonZero Bool = firstGroup and secondGroup

    return allNonZero and thirdGroup
}

fn arithmetic_remainder_sample() -> Bool {
    return checkRemainder()
}

fn arithmetic_remainder_verify() -> Bool {
    return checkRemainder()
}
