mod = 2**32

def rotateLeft(word, shift):
    return ((word << shift) | (word >> (32 - shift))) % mod

def littleEndian(word): # 4 byte input
    return word[0] ^ (word[1] << 8) ^ (word[2] << 16) ^ (word[3] << 24)

def quarterRound(words): # 4 byte input
    result = [0] * 4
    result[1] = words[1] ^ rotateLeft((words[0] + words[3]) % mod, 7)
    result[2] = words[2] ^ rotateLeft((result[1] + words[0]) % mod, 9)
    result[3] = words[3] ^ rotateLeft((result[2] + result[1]) % mod, 13)
    result[0] = words[0] ^ rotateLeft((result[3] + result[2]) % mod, 18)
    return result

def evenRound(words): # 16 byte input
    result = [0] * 16
    result[0], result[1], result[2], result[3] = quarterRound([words[0], words[1], words[2], words[3]])
    result[5], result[6], result[7], result[4] = quarterRound([words[5], words[6], words[7], words[4]])
    result[10], result[11], result[8], result[9] = quarterRound([words[10], words[11], words[8], words[9]])
    result[15], result[12], result[13], result[14] = quarterRound([words[15], words[12], words[13], words[14]])
    return result

def oddRound(words): # 16 byte input
    result = [0] * 16
    result[0], result[4], result[8], result[12] = quarterRound([words[0], words[4], words[8], words[12]])
    result[5], result[9], result[13], result[1] = quarterRound([words[5], words[9], words[13], words[1]])
    result[10], result[14], result[2], result[6] = quarterRound([words[10], words[14], words[2], words[6]])
    result[15], result[3], result[7], result[11] = quarterRound([words[15], words[3], words[7], words[11]])
    return result

def doubleRound(words): # 16 byte input
    return evenRound(oddRound(words))

def salsaHash(block): # 64 byte input
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
    result = salsaHash(plain)
    print(result)

main()
