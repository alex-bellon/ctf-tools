#!/bin/sh

sudo apt-get install vagrant virtualbox
mkdir Kali
cd Kali/
vagrant init offensive-security/kali-linux
echo 'Everything is installed. Run 'vagrant up' to start machine.'
