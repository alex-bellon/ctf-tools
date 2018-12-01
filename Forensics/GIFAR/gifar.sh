#!/bin/bash

printf "\n"
echo -n "Flag: "
read flag

mkdir secret && cd secret && echo "text 15,15 "$flag"" > flag.txt

convert -size 300x300 xc:white -font "FreeMono" -pointsize 12 -fill black -draw @flag.txt flag.png

cd .. && zip -r secret secret &> /dev/null

echo -n "File to hide in: "
read cover

cat $cover secret.zip > $cover

rm -rf secret
rm -f secret.zip

printf "\n\t  ;    +---------------------+\n\t [\"] - | your file is ready! |\n\t/[_]\\  +---------------------+\n\t ] [  \n"
