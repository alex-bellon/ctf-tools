mod = 2**32

def rotateLeft(word, shift):
    return ((word << shift) | (word >> (32 - shift))) % mod

def littleEndian(word): # 4 byte input
    return word[0] ^ (word[1] << 8) ^ (word[2] << 16) ^ (word[3] << 24)

def quarterRound(words): # 4 byte input
    a, b, c, d = words

    a += b
    d ^= a
    d = rotateLeft(d, 16)

    c += d
    b ^= c
    db= rotateLeft(b, 12)

    a += b
    d ^= a
    d = rotateLeft(d, 8)

    c += d
    b ^= c
    b = rotateLeft(b, 7)

    return [a, b, c, d]

def evenRound(words): # 16 byte input
    result = [0] * 16
    result[0], result[5], result[10], result[15] = quarterRound([words[0], words[5], words[10], words[15]])
    result[1], result[6], result[11], result[12] = quarterRound([words[1], words[6], words[11], words[12]])
    result[2], result[7], result[8], result[13] = quarterRound([words[2], words[7], words[8], words[13]])
    result[3], result[4], result[9], result[14] = quarterRound([words[3], words[4], words[9], words[14]])
    return result

def oddRound(words): # 16 byte input
    result = [0] * 16
    result[0], result[4], result[8], result[12] = quarterRound([words[0], words[4], words[8], words[12]])
    result[1], result[5], result[9], result[13] = quarterRound([words[1], words[5], words[9], words[13]])
    result[2], result[6], result[10], result[14] = quarterRound([words[2], words[6], words[10], words[14]])
    result[3], result[7], result[11], result[15] = quarterRound([words[3], words[7], words[11], words[15]])
    return result

def doubleRound(words): # 16 byte input
    return evenRound(oddRound(words))

def chachaHash(block): # 64 byte input
    words = [0] * 16
    for i in range(16):
        words[i] = littleEndian([block[4 * i], block[4 * i + 1], block[4 * i + 2], block[4 * i + 3]])
    
    modWords = words

    for i in range(10):
        modWords = doubleRound(modWords)

    result = list()
    for i in range(16):
        x = modWords[i] + words[i]
        mod = 2**8
        result.append(x % mod)
        result.append((x >> 8) % mod)
        result.append((x >> 16) % mod)
        result.append((x >> 24) % mod)
    return result

def main():
    plain = input('Input the bytes as integers, comma separated: ').replace(' ','').split(',')
    result = chachaHash(plain)
    print(result)

main()
