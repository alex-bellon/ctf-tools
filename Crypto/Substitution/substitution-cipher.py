import random

lower = 'abcdefghijklmnopqrstuvwxyz'
upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

newLower = ''.join(random.sample(lower, len(lower)))
newUpper = newLower.upper()

plain = open('plain.txt', 'r').read()
cipher = ''

for letter in plain:
    if letter in lower:
        cipher += newLower[lower.index(letter)]
    elif letter in upper:
        cipher += newUpper[upper.index(letter)]
    else:
        cipher += letter

alphabet = open('alphabet.txt', 'w')
alphabet.write(lower + '\n' + newLower + '\n\n' + upper + '\n' + newUpper + '\n')

output = open('output.txt', 'w')
output.write(cipher + '\n')
