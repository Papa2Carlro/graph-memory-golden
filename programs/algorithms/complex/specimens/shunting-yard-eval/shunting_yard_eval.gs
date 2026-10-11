fn int64_max() -> Int {
    return 9223372036854775807
}

fn int64_min() -> Int {
    return -9223372036854775808
}

fn space_char() -> Char {
    var spaceText String = " "
    return spaceText.get(0)
}

fn plus_char() -> Char {
    var text String = "+"
    return text.get(0)
}

fn minus_char() -> Char {
    var text String = "-"
    return text.get(0)
}

fn star_char() -> Char {
    var text String = "*"
    return text.get(0)
}

fn slash_char() -> Char {
    var text String = "/"
    return text.get(0)
}

fn left_paren_char() -> Char {
    var text String = "("
    return text.get(0)
}

fn right_paren_char() -> Char {
    var text String = ")"
    return text.get(0)
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

fn is_whitespace(ch: Char) -> Bool {
    var space Char = space_char()
    return ch is space
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

fn parse_uint_lexeme(text: String, start: Int, end: Int) -> Int? {
    var value Int = 0
    var i Int = start
    each i in start..end:
        var ch Char = text.get(i)
        var digit Int = ascii_digit_value(ch)
        if magnitude_would_overflow(value, digit, false):
            return null
        value = value * 10 + digit
    return value
}

fn digit_run_end(text: String, start: Int) -> Int {
    var len Int = text.count()
    var j Int = start
    each step in 0..(len - start + 1):
        if j >= len:
            break
        var ch Char = text.get(j)
        if is_ascii_digit(ch):
            j = j + 1
        else:
            break
    return j
}

fn token_kind_int() -> Int {
    return 0
}

fn token_kind_op() -> Int {
    return 1
}

fn token_kind_lparen() -> Int {
    return 2
}

fn token_kind_rparen() -> Int {
    return 3
}

fn op_plus() -> Int {
    return 0
}

fn op_minus() -> Int {
    return 1
}

fn op_mul() -> Int {
    return 2
}

fn op_div() -> Int {
    return 3
}

fn stack_marker_lparen() -> Int {
    return 10
}

fn append_token(kinds: [Int], values: [Int], kind: Int, value: Int) -> Int {
    kinds.append(kind)
    values.append(value)
    return 0
}

fn lex_expression(text: String, kinds: [Int], values: [Int]) -> Bool {
    var pos Int = 0
    var len Int = text.count()
    each step in 0..(len + len + 1):
        if pos >= len:
            break

        each skip in 0..len:
            if pos >= len:
                break
            var ws Char = text.get(pos)
            if is_whitespace(ws):
                pos = pos + 1
            else:
                break

        if pos >= len:
            break

        var ch Char = text.get(pos)
        if is_ascii_digit(ch):
            var end Int = digit_run_end(text, pos)
            var parsed Int? = parse_uint_lexeme(text, pos, end)
            if not exists parsed:
                return false
            var intValue Int = parsed
            append_token(kinds, values, token_kind_int(), intValue)
            pos = end
        else:
            var plus Char = plus_char()
            var minus Char = minus_char()
            var star Char = star_char()
            var slash Char = slash_char()
            var lparen Char = left_paren_char()
            var rparen Char = right_paren_char()

            if ch is plus:
                append_token(kinds, values, token_kind_op(), op_plus())
                pos = pos + 1
            else:
                if ch is minus:
                    append_token(kinds, values, token_kind_op(), op_minus())
                    pos = pos + 1
                else:
                    if ch is star:
                        append_token(kinds, values, token_kind_op(), op_mul())
                        pos = pos + 1
                    else:
                        if ch is slash:
                            append_token(kinds, values, token_kind_op(), op_div())
                            pos = pos + 1
                        else:
                            if ch is lparen:
                                append_token(kinds, values, token_kind_lparen(), 0)
                                pos = pos + 1
                            else:
                                if ch is rparen:
                                    append_token(kinds, values, token_kind_rparen(), 0)
                                    pos = pos + 1
                                else:
                                    return false

    if pos != len:
        return false
    return true
}

fn validate_token_stream(kinds: [Int], values: [Int]) -> Bool {
    var count Int = kinds.count()
    if count == 0:
        return false

    var depth Int = 0
    var prevKind Int = -1
    var i Int = 0
    each i in 0..count:
        var kind Int = kinds.get(i)

        if kind == token_kind_lparen():
            if prevKind == token_kind_int():
                return false
            if prevKind == token_kind_rparen():
                return false
            depth = depth + 1
            if depth == 1 and prevKind == token_kind_op():
                return false
            prevKind = kind
        else:
            if kind == token_kind_rparen():
                depth = depth - 1
                if depth < 0:
                    return false
                if prevKind == token_kind_op():
                    return false
                if prevKind == token_kind_lparen():
                    return false
                prevKind = kind
            else:
                if kind == token_kind_int():
                    if prevKind == token_kind_int():
                        return false
                    if prevKind == token_kind_rparen():
                        return false
                    prevKind = kind
                else:
                    if kind == token_kind_op():
                        if i == 0:
                            return false
                        if prevKind == token_kind_op():
                            return false
                        if prevKind == token_kind_lparen():
                            return false
                        prevKind = kind
                    else:
                        return false

    if depth != 0:
        return false

    if prevKind == token_kind_op():
        return false
    if prevKind == token_kind_lparen():
        return false

    return true
}

fn op_precedence(op: Int) -> Int {
    if op == op_mul():
        return 2
    if op == op_div():
        return 2
    return 1
}

fn stack_peek(stack: [Int], size: Int) -> Int {
    return stack.get(size - 1)
}

fn pop_op_to_postfix(
    opStack: [Int],
    stackSize: Int,
    postKinds: [Int],
    postValues: [Int],
) -> Int {
    var op Int = stack_peek(opStack, stackSize)
    append_token(postKinds, postValues, token_kind_op(), op)
    return stackSize - 1
}

fn shunting_yard(
    kinds: [Int],
    values: [Int],
    postKinds: [Int],
    postValues: [Int],
) -> Bool {
    var opStack [Int] = []
    var stackSize Int = 0
    var i Int = 0
    each i in 0..kinds.count():
        var kind Int = kinds.get(i)
        if kind == token_kind_int():
            append_token(postKinds, postValues, token_kind_int(), values.get(i))
        else:
            if kind == token_kind_op():
                var op Int = values.get(i)
                each drain in 0..kinds.count():
                    if stackSize == 0:
                        break
                    var top Int = stack_peek(opStack, stackSize)
                    if top == stack_marker_lparen():
                        break
                    if op_precedence(top) < op_precedence(op):
                        break
                    stackSize = pop_op_to_postfix(opStack, stackSize, postKinds, postValues)
                opStack.append(op)
                stackSize = stackSize + 1
            else:
                if kind == token_kind_lparen():
                    opStack.append(stack_marker_lparen())
                    stackSize = stackSize + 1
                else:
                    if kind == token_kind_rparen():
                        var found Bool = false
                        each drainParen in 0..kinds.count():
                            if stackSize == 0:
                                return false
                            var top Int = stack_peek(opStack, stackSize)
                            if top == stack_marker_lparen():
                                stackSize = stackSize - 1
                                found = true
                                break
                            stackSize = pop_op_to_postfix(opStack, stackSize, postKinds, postValues)
                        if not found:
                            return false
                    else:
                        return false

    each flush in 0..kinds.count():
        if stackSize == 0:
            break
        var top Int = stack_peek(opStack, stackSize)
        if top == stack_marker_lparen():
            return false
        stackSize = pop_op_to_postfix(opStack, stackSize, postKinds, postValues)

    if stackSize != 0:
        return false
    return true
}

fn add_int64(left: Int, right: Int) -> Int? {
    var maxVal Int = int64_max()
    var minVal Int = int64_min()
    if right > 0:
        if left > maxVal - right:
            return null
    else:
        if right < 0:
            if left < minVal - right:
                return null
    return left + right
}

fn sub_int64(left: Int, right: Int) -> Int? {
    var maxVal Int = int64_max()
    var minVal Int = int64_min()
    if right < 0:
        if left > maxVal + right:
            return null
    else:
        if right > 0:
            if left < minVal + right:
                return null
    return left - right
}

fn mul_pos_would_overflow(a: Int, b: Int) -> Bool {
    var maxVal Int = int64_max()
    if a > maxVal / b:
        return true
    return false
}

fn mul_int64(left: Int, right: Int) -> Int? {
    if left == 0:
        return 0
    if right == 0:
        return 0

    var minVal Int = int64_min()

    if left == minVal:
        if right == 1:
            return minVal
        if right == -1:
            return null
        return null

    if right == minVal:
        if left == 1:
            return minVal
        if left == -1:
            return null
        return null

    if right == -1:
        return sub_int64(0, left)
    if left == -1:
        return sub_int64(0, right)

    if left > 0:
        if right > 0:
            if mul_pos_would_overflow(left, right):
                return null
        else:
            var rightMag Int? = sub_int64(0, right)
            if not exists rightMag:
                return null
            var mag Int = rightMag
            if mul_pos_would_overflow(left, mag):
                return null
    else:
        if right > 0:
            var leftMag Int? = sub_int64(0, left)
            if not exists leftMag:
                return null
            var mag Int = leftMag
            if mul_pos_would_overflow(mag, right):
                return null
        else:
            var leftMag Int? = sub_int64(0, left)
            if not exists leftMag:
                return null
            var rightMag Int? = sub_int64(0, right)
            if not exists rightMag:
                return null
            var a Int = leftMag
            var b Int = rightMag
            if mul_pos_would_overflow(a, b):
                return null

    return left * right
}

fn div_int64(left: Int, right: Int) -> Int? {
    if right == 0:
        return null
    var minVal Int = int64_min()
    if left == minVal:
        if right == -1:
            return null
    return left / right
}

fn apply_binary_op(op: Int, left: Int, right: Int) -> Int? {
    if op == op_plus():
        return add_int64(left, right)
    if op == op_minus():
        return sub_int64(left, right)
    if op == op_mul():
        return mul_int64(left, right)
    if op == op_div():
        return div_int64(left, right)
    return null
}

fn eval_postfix(postKinds: [Int], postValues: [Int]) -> Int? {
    var stack [Int] = []
    var stackSize Int = 0
    var i Int = 0
    each i in 0..postKinds.count():
        var kind Int = postKinds.get(i)
        if kind == token_kind_int():
            stack.append(postValues.get(i))
            stackSize = stackSize + 1
        else:
            if kind == token_kind_op():
                if stackSize < 2:
                    return null
                var right Int = stack_peek(stack, stackSize)
                stackSize = stackSize - 1
                var left Int = stack_peek(stack, stackSize)
                stackSize = stackSize - 1
                var op Int = postValues.get(i)
                var applied Int? = apply_binary_op(op, left, right)
                if not exists applied:
                    return null
                var result Int = applied
                stack.append(result)
                stackSize = stackSize + 1
            else:
                return null

    if stackSize != 1:
        return null
    return stack_peek(stack, stackSize)
}

fn evaluate_expression(text: String) -> Int? {
    var kinds [Int] = []
    var values [Int] = []
    if not lex_expression(text, kinds, values):
        return null
    if not validate_token_stream(kinds, values):
        return null

    var postKinds [Int] = []
    var postValues [Int] = []
    if not shunting_yard(kinds, values, postKinds, postValues):
        return null

    return eval_postfix(postKinds, postValues)
}

fn eval_matches(text: String, expected: Int) -> Bool {
    var got Int? = evaluate_expression(text)
    if not exists got:
        return false
    var value Int = got
    return value == expected
}

fn eval_rejects(text: String) -> Bool {
    var got Int? = evaluate_expression(text)
    return not exists got
}

fn shunting_yard_eval_verify() -> Bool {
    var okTwoPlusThree Bool = eval_matches("2+3", 5)
    var okPrecedence Bool = eval_matches("2+3*4", 14)
    var okParen Bool = eval_matches("(2+3)*4", 20)
    var okLeftAssoc Bool = eval_matches("8-3-2", 3)
    var okDiv Bool = eval_matches("20/5", 4)
    var okSpace Bool = eval_matches("12 + 34", 46)
    var okNested Bool = eval_matches("7*(2+3)", 35)
    var okMixed Bool = eval_matches("1+2*3-4", 3)
    var okNestedParen Bool = eval_matches("((2+3))", 5)
    var okNegative Bool = eval_matches("3-5", -2)
    var maxInt Int = int64_max()
    var minVal Int = int64_min()
    var okMaxLiteral Bool = eval_matches("9223372036854775807", maxInt)

    var rejectEmpty Bool = eval_rejects("")
    var rejectTrailing Bool = eval_rejects("1+")
    var rejectUnaryPlus Bool = eval_rejects("+1")
    var rejectDoubleOp Bool = eval_rejects("1++2")
    var rejectImplicitMul Bool = eval_rejects("2(3)")
    var rejectOpen Bool = eval_rejects("(1+2")
    var rejectClose Bool = eval_rejects("1+2)")
    var rejectEmptyParen Bool = eval_rejects("()")
    var rejectDivZero Bool = eval_rejects("1/0")
    var rejectAlpha Bool = eval_rejects("1+a")
    var rejectLexOverflow Bool = eval_rejects("9223372036854775808")
    var rejectAddOverflow Bool = eval_rejects("9223372036854775807+1")
    var rejectMulOverflow Bool = eval_rejects("9223372036854775807*2")

    var okPosPosMul Bool = eval_matches("12*34", 408)
    var okPosNegMul Bool = eval_matches("(0-25)*4", -100)
    var okNegPosMul Bool = eval_matches("4*(0-25)", -100)
    var okNegNegMul Bool = eval_matches("(0-6)*(0-7)", 42)
    var okZeroMulLeft Bool = eval_matches("0*12345", 0)
    var okZeroMulRight Bool = eval_matches("9223372036854775807*0", 0)
    var okMaxTimesOne Bool = eval_matches("9223372036854775807*1", maxInt)
    var okMinTimesOne Bool = eval_matches("(0-9223372036854775807-1)*1", minVal)
    var rejectMinTimesTwo Bool = eval_rejects("(0-9223372036854775807-1)*2")
    var rejectMinTimesNegOne Bool = eval_rejects("(0-9223372036854775807-1)*(0-1)")
    var rejectMaxSquared Bool = eval_rejects("9223372036854775807*9223372036854775807")

    return okTwoPlusThree and okPrecedence and okParen and okLeftAssoc and okDiv
        and okSpace and okNested and okMixed and okNestedParen and okNegative
        and okMaxLiteral and rejectEmpty and rejectTrailing and rejectUnaryPlus
        and rejectDoubleOp and rejectImplicitMul and rejectOpen and rejectClose
        and rejectEmptyParen and rejectDivZero and rejectAlpha and rejectLexOverflow
        and rejectAddOverflow and rejectMulOverflow and okPosPosMul and okPosNegMul
        and okNegPosMul and okNegNegMul and okZeroMulLeft and okZeroMulRight
        and okMaxTimesOne and okMinTimesOne and rejectMinTimesTwo
        and rejectMinTimesNegOne and rejectMaxSquared
}

fn shunting_yard_eval_sample() -> Int {
    var last Int? = evaluate_expression("1+2*3-4")
    if not exists last:
        return 0
    return last
}
