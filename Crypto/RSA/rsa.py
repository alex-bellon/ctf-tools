def extendedEuclid(a, b):
   u = 1
   g = a
   x = 0
   y = b
   while True:
       if y == 0:
           v = (g - a * u) // b
           return (u, v)
       t = g % y
       q = g // y
       s = u - q * x
       u = x
       g = y
       x = s
       y = t

def inverse(base, prime):
   inv = extendedEuclid(base, prime)[0]
   if inv <= 0:
       return inv + prime
   return inv

def fastPrime(base, exp, mod):
   num1 = base
   result = 1
   while exp > 0:
       if exp % 2 == 1:
           result *= num1
           result %= mod
       num1 *= num1
       num1 %= mod
       exp = exp//2

   return result % mod

def encryptRSA(N, e, m):
   return fastPrime(m, e, N)

def decryptRSA(p, q, e, c):
   return fastPrime(c, inverse(e, (p-1)*(q-1)), p*q)

opt = input("Encrypt or decrypt? [e/d] :")
if (opt = 'e'):
    e
else if (opt = 'd'):

else:
    print("bye :)")
