from fractions import gcd

def encode():
    plain = input('Input your message using only letters [A-Z]: ').lower()
    a = 25
    b = 25
    cipher = ''
    for letter in plain:
        temp = chr((a * ord(letter) - 97 + b) % 26 + 97)
        cipher += temp
    print("\n\t  :\n\t [\"]  -[ " + cipher + " ]\n\t/[_]\\\n\t ] [")

def decode():
    a = 25
    b = 25
    cipher = input('Input your ciphertext: ').lower()
    plain = ''
    for letter in cipher:
        temp = chr(int(((ord(letter) - 97 - b) / a) % 26 + 97))
        plain += temp
    print("\n\t  :\n\t [\"]  -[ " + plain + " ]\n\t/[_]\\\n\t ] [")


def main():
    while(1):
        choice = input('\nEncode or decode? [e/d] ')
        if choice == 'e' or choice == 'E':
            encode()
            break
        elif choice == 'd' or choise == 'D':
            decode()
            break
        else: 
            print('Please choose [e] or [d]')

main()
