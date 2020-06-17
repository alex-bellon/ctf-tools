import socket

def format(num):
    pos = 1
    result = ''
    for x in num:
        result += str(x)
        if pos % 4 == 0 and pos is not 16:
            result += '-'
        pos += 1
    return result

def check_card(card):
    result = ''

    pos = 0
    for num in card:
        num = int(num)
        if pos % 2 == 0:
            temp = num * 2
            if temp > 9:
                temp = (temp % 10) + (temp // 10)
        else:
            temp = num
        result += str(temp)
        pos += 1

    for i in range(0, 10):
        sum = 0
        curr = result
        curr += str(i)
        for num in curr:
            sum += int(num);
        if sum % 10 == 0:
            card_str = format(str(card) + '' + str(i))
            return card_str

def main():
    s = socket.socket()         # Create a socket object
    host = 'stack.overflow.fail'
    port = 7000 
    
    s.connect((host, port))
    print(s.recv(1024).decode('ascii'))

    for i in range (0,1000):
        print('CARD #' + str(i))
        recv = s.recv(1024).decode('ascii')

        curr = recv.split("Number: ")[1][:9].split("-")[:]
        curr = curr[0] + '' + curr[1] + '0000000'
        print('Message: ' + curr)

        match = str(check_card(curr))

        resp = match + '\n'
        print('Response: ' + str(resp))
        s.send(resp.encode('ascii'))
    
    print(s.recv(1024).decode('ascii'))

    s.close()

main()
