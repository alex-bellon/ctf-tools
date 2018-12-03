#Diffie-Hellman Solver

mod = int(input('Mod (hex): '), 16)
base = int(input('Base (hex): '), 16)

m1str = input('\nFirst message (text): ')
m2str = input('Second message (text): ')

m1 = m1str.encode('ascii').hex()
m2 = m2str.encode('ascii').hex()

#https://www.alpertron.com.ar/DILOG.HTM
print('\n\tGo to [https://www.alpertron.com.ar/DILOG.HTM] to calculate the discrete logs with: \n\tBase: ' + str(base) + '\n\tMod: ' + str(mod) + '\n\tMessage 1: ' + str(m1) + '\n\tMessage 2: ' + str(m2))

a = int(input('\nFirst discrete log (int): '))
b = int(input('Second discrete log (int): '))

key = pow(base, (a * b), mod)

message = int(input('\nMessage to decode (hex): '), 16)
message = hex((message ^ key))
message = bytes.fromhex(message[2:len(message)]).decode('ascii')

result = "\n\t  :\n\t [\"]  -[ " + message + " ]\n\t/[_]\\\n\t ] ["
print(result)
