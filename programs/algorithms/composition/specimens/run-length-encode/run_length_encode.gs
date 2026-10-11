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

fn scan_runs(text: String, outChars: [Char], outLens: [Int]) -> Int {
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

fn encode_to_pairs(text: String, outChars: [Char], outLens: [Int]) -> Int {
    return scan_runs(text, outChars, outLens)
}

fn encoded_length_sum(lens: [Int]) -> Int {
    var total Int = 0
    var i Int = 0
    each i in 0..lens.count():
        total = total + lens.get(i)
    return total
}

fn run_length_encode(text: String) -> [Int] {
    var chars [Char] = []
    var lens [Int] = []
    encode_to_pairs(text, chars, lens)
    return lens
}

fn run_length_encode_sample() -> Int {
    var emptyChars [Char] = []
    var emptyLens [Int] = []
    encode_to_pairs("", emptyChars, emptyLens)

    var oneCharChars [Char] = []
    var oneCharLens [Int] = []
    encode_to_pairs("a", oneCharChars, oneCharLens)

    var pairChars [Char] = []
    var pairLens [Int] = []
    encode_to_pairs("aa", pairChars, pairLens)

    var classicChars [Char] = []
    var classicLens [Int] = []
    encode_to_pairs("aabbbcc", classicChars, classicLens)

    var spreadChars [Char] = []
    var spreadLens [Int] = []
    encode_to_pairs("abc", spreadChars, spreadLens)

    var mixedChars [Char] = []
    var mixedLens [Int] = []
    encode_to_pairs("aaabbbaa", mixedChars, mixedLens)

    return encoded_length_sum(mixedLens)
}
