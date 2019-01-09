flag = input("Flag: ")
output = open("output.cpp", "w")
methods = int(input("Number of methods: "))

files = ['calculator.cpp', 'fibonacci.cpp', 'reverse.cpp', 'string-length.cpp']

for i in range(methods):
    index = i % len(files)
    curr = open(files[0])
    for line in curr:
        output.write(line)
    if i == methods/2:
        output.write('//' + flag)
        output.write(' ')

