fn sample_char_from(text: String) -> Char {
    return text.get(0)
}

fn finalize_run(
    runChar: Char,
    runLen: Int,
    outChars: [Char],
    outLens: [Int],
) -> Int {
    if runLen <= 0:
        return 0
    outChars.append(runChar)
    outLens.append(runLen)
    return 0
}

fn rle_encode(text: String, outChars: [Char], outLens: [Int]) -> Int {
    if text.count() == 0:
        return 0

    var runChar Char = text.get(0)
    var runLen Int = 0

    each char in text:
        if runLen == 0:
            runChar = char
            runLen = 1
        else:
            if char is runChar:
                runLen = runLen + 1
            else:
                var closed Int = finalize_run(runChar, runLen, outChars, outLens)
                runChar = char
                runLen = 1

    var finished Int = finalize_run(runChar, runLen, outChars, outLens)
    return finished
}

fn encoded_length_sum(lens: [Int]) -> Int {
    var total Int = 0
    var i Int = 0
    each i in 0..lens.count():
        total = total + lens.get(i)
    return total
}

fn validate_encoded_rle(chars: [Char], lens: [Int]) -> Bool {
    if chars.count() != lens.count():
        return false

    var i Int = 0
    each i in 0..lens.count():
        var runLen Int = lens.get(i)
        if runLen <= 0:
            return false

    if chars.count() <= 1:
        return true

    var j Int = 1
    each j in 1..chars.count():
        var prev Char = chars.get(j - 1)
        var curr Char = chars.get(j)
        if curr is prev:
            return false

    return true
}

fn append_char_repeated(out: [Char], ch: Char, count: Int) -> Int {
    var k Int = 0
    each k in 0..count:
        out.append(ch)
    return 0
}

fn decode_rle(chars: [Char], lens: [Int], out: [Char]) -> Bool {
    if validate_encoded_rle(chars, lens):
        var gate Int = 0
    else:
        return false

    var i Int = 0
    each i in 0..chars.count():
        var ch Char = chars.get(i)
        var runLen Int = lens.get(i)
        append_char_repeated(out, ch, runLen)

    return true
}

fn text_equals_chars(text: String, chars: [Char]) -> Bool {
    if text.count() != chars.count():
        return false

    var i Int = 0
    each i in 0..text.count():
        var left Char = text.get(i)
        var right Char = chars.get(i)
        if left is not right:
            return false

    return true
}

fn rle_roundtrip_verified(text: String) -> Bool {
    var encChars [Char] = []
    var encLens [Int] = []
    rle_encode(text, encChars, encLens)

    if validate_encoded_rle(encChars, encLens):
        var encOk Int = 0
    else:
        return false

    var decodedLen Int = encoded_length_sum(encLens)
    if decodedLen != text.count():
        return false

    var decChars [Char] = []
    if decode_rle(encChars, encLens, decChars):
        var decOk Int = 0
    else:
        return false

    return text_equals_chars(text, decChars)
}

fn encode_run_count(text: String) -> Int {
    var encChars [Char] = []
    var encLens [Int] = []
    rle_encode(text, encChars, encLens)
    return encChars.count()
}

fn roundtrip_with_run_count(text: String, expectedRuns: Int) -> Bool {
    if rle_roundtrip_verified(text):
        var rtOk Int = 0
    else:
        return false
    var runs Int = encode_run_count(text)
    return runs == expectedRuns
}

fn validate_rejects(chars: [Char], lens: [Int]) -> Bool {
    if validate_encoded_rle(chars, lens):
        return false
    return true
}

fn decode_rejects(chars: [Char], lens: [Int], out: [Char]) -> Bool {
    if decode_rle(chars, lens, out):
        return false
    return true
}

fn rle_roundtrip_verify() -> Bool {
    var okEmpty Bool = roundtrip_with_run_count("", 0)
    var okOne Bool = roundtrip_with_run_count("a", 1)
    var okFour Bool = roundtrip_with_run_count("aaaa", 1)
    var okSpread Bool = roundtrip_with_run_count("abc", 3)
    var okClassic Bool = roundtrip_with_run_count("aabbbcc", 3)
    var okMixed Bool = roundtrip_with_run_count("aaabbbaa", 3)

    var unicodeText String = "aπb"
    var okUnicode Bool = rle_roundtrip_verified(unicodeText)

    var charA Char = sample_char_from("a")

    var badChars [Char] = []
    var badLens [Int] = []
    badChars.append(charA)
    var rejectMismatch Bool = validate_rejects(badChars, badLens)

    var zeroChars [Char] = []
    var zeroLens [Int] = []
    zeroChars.append(charA)
    zeroLens.append(0)
    var rejectZero Bool = validate_rejects(zeroChars, zeroLens)

    var negChars [Char] = []
    var negLens [Int] = []
    negChars.append(charA)
    negLens.append(-1)
    var rejectNeg Bool = validate_rejects(negChars, negLens)

    var dupChars [Char] = []
    var dupLens [Int] = []
    dupChars.append(charA)
    dupChars.append(charA)
    dupLens.append(1)
    dupLens.append(1)
    var rejectDup Bool = validate_rejects(dupChars, dupLens)

    var decOut [Char] = []
    var rejectDecode Bool = decode_rejects(dupChars, dupLens, decOut)
    var decStillEmpty Bool = decOut.count() == 0

    return okEmpty and okOne and okFour and okSpread and okClassic and okMixed
        and okUnicode and rejectMismatch and rejectZero and rejectNeg
        and rejectDup and rejectDecode and decStillEmpty
}

fn rle_roundtrip_sample() -> Int {
    var mixedChars [Char] = []
    var mixedLens [Int] = []
    rle_encode("aaabbbaa", mixedChars, mixedLens)
    return encoded_length_sum(mixedLens)
}
