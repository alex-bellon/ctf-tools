#!/bin/bash

echo -e "Flag: "
read flag

mkdir secret && cd secret && echo "text 15,15 "$flag"" > flag.txt

convert -size 300x300 xc:white -font "FreeMono" -pointsize 12 -fill black -draw @flag.txt flag.png

cd .. && zip -r secret secret

echo -e "File to hide in: "
read cover

cat $cover secret.zip > $cover

rm -rf secret-tmp
rm -f secret.zip

echo "beep boop i'm done"
