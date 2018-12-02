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
    #a = "What would you like on your pizza? Sausage or Pepperoni"
    #b = "I would prefer cheese actually, can we get extra-large "
   
    #aCipher = "221c0718411014055d01600a0a2a4e5c361b544e0a2e50090310017f45504b1b530c1332571446591a1054091e41371e004100321c0b3651"
    #bCipher = "3c541103140b1f5041172515002d4e533715541d006011131810123359401d4151525d414104155f180154031415151a5d5d043214007f1a5830"

    a = input("First decrypted string: ")
    b = input("Second decrypted string: ")
    aCipher = input("First encrypted string: ")
    bCipher = input("Second encrypted string: ")

    aCipher = binascii.unhexlify(aCipher)[0:len(a)]
    bCipher = binascii.unhexlify(bCipher)[0:len(b)]

    print("a XOR aCipher: " + xorstrings(aCipher.decode('ascii'), a).decode('ascii'))
    print("b XOR bCipher: " + xorstrings(bCipher.decode('ascii'), b).decode('ascii'))

main()
