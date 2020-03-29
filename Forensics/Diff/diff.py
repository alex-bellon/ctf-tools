aName = input('File A: ')
bName = input('File B: ')

a = open(aName, 'r')
b = open(bName, 'r')

aContents = list(a.read())
bContents = list(b.read())

larger = bContents if len(aContents) < len(bContents) else aContents
smaller = aContents if len(aContents) < len(bContents) else bContents

result = ''

otherIndex = 0
for index in range(len(smaller)):
    while smaller[index] != larger[otherIndex]:
        result += larger[otherIndex]
        otherIndex += 1
    otherIndex += 1

print(result)
