import base64
import binascii
import os
import struct

def xorstrings(a, b):
    result = b''
    for i in range(len(a)):
        result += struct.pack("B", (ord(a[i]) ^ ord(b[i])))
    return result

def main():

    a = input("First decrypted string: ")
    b = input("Second decrypted string: ")
    aCipher = input("First encrypted string (hex): ")
    bCipher = input("Second encrypted string (hex): ")

    aCipher = binascii.unhexlify(aCipher)[0:len(a)]
    bCipher = binascii.unhexlify(bCipher)[0:len(b)]

    print("a XOR aCipher: " + xorstrings(aCipher.decode('ascii'), a).decode('ascii'))
    print("b XOR bCipher: " + xorstrings(bCipher.decode('ascii'), b).decode('ascii'))

main()
