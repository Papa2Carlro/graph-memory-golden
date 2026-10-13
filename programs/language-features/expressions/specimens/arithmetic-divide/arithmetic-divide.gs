module example.syntax.arithmetic_divide

private fn checkDivision() -> Bool {
    let positive Int = 7
    let negative Int = -7

    let divisorPositive Int = 3
    let divisorNegative Int = -3

    let exactDividend Int = 8
    let exactDivisor Int = 2

    let expectedPositive Int = 2
    let expectedNegative Int = -2
    let expectedExact Int = 4

    let q1 Int = positive / divisorPositive
    let q2 Int = negative / divisorPositive
    let q3 Int = positive / divisorNegative
    let q4 Int = negative / divisorNegative
    let q5 Int = exactDividend / exactDivisor

    let case1 Bool = q1 is expectedPositive
    let case2 Bool = q2 is expectedNegative
    let case3 Bool = q3 is expectedNegative
    let case4 Bool = q4 is expectedPositive
    let case5 Bool = q5 is expectedExact

    let firstGroup Bool = case1 and case2
    let secondGroup Bool = case3 and case4
    let allCases Bool = firstGroup and secondGroup

    return allCases and case5
}

fn arithmetic_divide_sample() -> Bool {
    return checkDivision()
}

fn arithmetic_divide_verify() -> Bool {
    return checkDivision()
}
