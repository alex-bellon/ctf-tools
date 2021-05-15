
def check_card():
    card = input('Please input the credit card number without any spaces or dashes: ')
    result = ''
    sum = 0

    if len(card) % 2 == 0:
        mod = 0
    else:
        mod = 1
    
    #card = int(card)

    pos = 1
    for num in card:
        num = int(num)
        if pos % 2 == mod:
            temp = num * 2
            if temp > 9:
                temp = (temp % 10) + (temp // 10)
        else:
            temp = num
        result += str(temp)
        pos += 1

    for num in result:
        sum += int(num);

    if sum % 10 == 0:
        print(str(card) + ' is valid')
    else:
        print(str(card) + ' is INVALID')

def main():
    while 1:
        check_card()

main()
