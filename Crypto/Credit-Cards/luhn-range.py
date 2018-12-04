def format(num):
    pos = 1
    result = ''
    for x in num:
        result += str(x)
        if pos % 4 == 0 and pos is not 16:
            result += '-'
        pos += 1
    return result

def check_card(output, card):
    print('Checking ' + str(card))
    result = ''
    sum = 0

    if len(str(card)) % 2 == 0:
        mod = 0
    else:
        mod = 1
    
    card = str(card)

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
        card_str = format(card)
        output.write(card_str + '\n')

def main():
    start = input('Input starting numbers (no spaces or dashes): ')
    min = int(start) * 100000000
    max = min + 99999999
    print('MIN: ' + str(min) + ' MAX: ' + str(max))
    output = open("valid-cards.txt", "w")
    for curr in range (min, max):
        check_card(output, curr)

main()
