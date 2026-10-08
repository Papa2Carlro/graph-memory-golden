fn hyphen_char() -> Char {
    var minus String = "-"
    return minus.get(0)
}

fn is_ascii_digit(ch: Char) -> Bool {
    var digits String = "0123456789"
    var i Int = 0
    each i in 0..digits.count():
        var digitChar Char = digits.get(i)
        if ch is digitChar:
            return true
    return false
}

fn ascii_digit_value(ch: Char) -> Int {
    var digits String = "0123456789"
    var i Int = 0
    each i in 0..digits.count():
        var digitChar Char = digits.get(i)
        if ch is digitChar:
            return i
    return 0
}

fn decimal_lexical_valid(text: String) -> Bool {
    var length Int = text.count()
    if length == 0:
        return false

    var start Int = 0
    var first Char = text.get(0)
    var minus Char = hyphen_char()

    if first is minus:
        if length == 1:
            return false
        start = 1
    else:
        if is_ascii_digit(first):
            var noop Int = 0
        else:
            return false

    var i Int = start
    each i in start..length:
        var ch Char = text.get(i)
        if is_ascii_digit(ch):
            var noopDigit Int = 0
        else:
            return false

    return true
}

fn magnitude_would_overflow(value: Int, digit: Int, negative: Bool) -> Bool {
    var limitLeading Int = 922337203685477580
    if negative:
        if value > limitLeading:
            return true
        if value == limitLeading:
            if digit >= 8:
                return true
        return false

    if value > limitLeading:
        return true
    if value == limitLeading:
        if digit > 7:
            return true
    return false
}

fn accumulate_magnitude(text: String, start: Int, negative: Bool) -> Int? {
    var length Int = text.count()
    var value Int = 0
    var i Int = start
    each i in start..length:
        var ch Char = text.get(i)
        var digit Int = ascii_digit_value(ch)
        if magnitude_would_overflow(value, digit, negative):
            return null
        value = value * 10 + digit
    return value
}

fn zero_char() -> Char {
    var zeroText String = "0"
    return zeroText.get(0)
}

fn significant_digit_start(text: String, start: Int) -> Int {
    var length Int = text.count()
    var zero Char = zero_char()
    var i Int = start
    each i in start..length:
        var ch Char = text.get(i)
        if ch is zero:
            var noop Int = 0
        else:
            return i
    return length
}

fn magnitude_lexeme_equals(text: String, start: Int, pattern: String) -> Bool {
    var sig Int = significant_digit_start(text, start)
    var remain Int = text.count() - sig
    if remain != pattern.count():
        return false
    var j Int = 0
    each j in 0..pattern.count():
        var a Char = text.get(sig + j)
        var b Char = pattern.get(j)
        if a is not b:
            return false
    return true
}

fn apply_sign(magnitude: Int, negative: Bool) -> Int? {
    if negative:
        if magnitude == 0:
            return 0

        var maxPositive Int = 9223372036854775807
        if magnitude <= maxPositive:
            var zero Int = 0
            return zero - magnitude

        return null

    return magnitude

}

fn parse_decimal_digits(text: String) -> Int? {
    if decimal_lexical_valid(text):
        var lexOk Int = 0
    else:
        return null

    var negative Bool = false
    var start Int = 0

    var first Char = text.get(0)
    var minus Char = hyphen_char()
    if first is minus:
        negative = true
        start = 1

    var intMinMag String = "9223372036854775808"
    if negative:
        if magnitude_lexeme_equals(text, start, intMinMag):
            var minValue Int = -9223372036854775808
            return minValue

    var magnitude Int? = accumulate_magnitude(text, start, negative)
    if not exists magnitude:
        return null

    var mag Int = magnitude
    return apply_sign(mag, negative)
}

fn parse_decimal_strict(text: String) -> Int? {
    return parse_decimal_digits(text)
}

fn parse_matches(text: String, expected: Int) -> Bool {
    var parsed Int? = parse_decimal_strict(text)
    if not exists parsed:
        return false
    var value Int = parsed
    return value == expected
}

fn parse_rejects(text: String) -> Bool {
    var parsed Int? = parse_decimal_strict(text)
    return not exists parsed
}

fn parse_decimal_strict_sample() -> Int {
    var rejectEmpty Bool = parse_rejects("")
    var rejectSignOnly Bool = parse_rejects("-")
    var rejectPlus Bool = parse_rejects("+")
    var rejectPlusOne Bool = parse_rejects("+1")
    var rejectSpaceLead Bool = parse_rejects(" 1")
    var rejectSpaceTrail Bool = parse_rejects("1 ")
    var rejectDot Bool = parse_rejects("1.0")
    var rejectAlpha Bool = parse_rejects("12a")
    var rejectEmbeddedSign Bool = parse_rejects("1-2")
    var rejectArabic Bool = parse_rejects("١٢٣")

    var okZero Bool = parse_matches("0", 0)
    var okNegZero Bool = parse_matches("-0", 0)
    var okSeven Bool = parse_matches("7", 7)
    var okPositive Bool = parse_matches("123", 123)
    var okNegative Bool = parse_matches("-123", -123)
    var okLeading Bool = parse_matches("0007", 7)
    var okLeadingNeg Bool = parse_matches("-0007", -7)

    var maxInt Int = 9223372036854775807
    var minInt Int = -9223372036854775808
    var okMax Bool = parse_matches("9223372036854775807", maxInt)
    var rejectMaxPlusOne Bool = parse_rejects("9223372036854775808")
    var okMin Bool = parse_matches("-9223372036854775808", minInt)
    var rejectMinMinusOne Bool = parse_rejects("-9223372036854775809")
    var okMinLeading Bool = parse_matches("-0009223372036854775808", minInt)
    var okMaxLeading Bool = parse_matches("0009223372036854775807", maxInt)
    var rejectMaxLeadingPlus Bool = parse_rejects("0009223372036854775808")

    var ignored Bool = rejectEmpty
    ignored = rejectSignOnly
    ignored = rejectPlus
    ignored = rejectPlusOne
    ignored = rejectSpaceLead
    ignored = rejectSpaceTrail
    ignored = rejectDot
    ignored = rejectAlpha
    ignored = rejectEmbeddedSign
    ignored = rejectArabic
    ignored = okZero
    ignored = okNegZero
    ignored = okSeven
    ignored = okPositive
    ignored = okNegative
    ignored = okLeading
    ignored = okLeadingNeg
    ignored = okMax
    ignored = rejectMaxPlusOne
    ignored = okMin
    ignored = rejectMinMinusOne
    ignored = okMinLeading
    ignored = okMaxLeading
    ignored = rejectMaxLeadingPlus

    var last Int? = parse_decimal_strict("123")
    if not exists last:
        return 0
    return last
}
