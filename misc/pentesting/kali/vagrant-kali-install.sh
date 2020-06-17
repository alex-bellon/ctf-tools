#!/bin/sh

#sudo apt-get install vagrant virtualbox
mkdir Kali
cd Kali/
vagrant init offensive-security/kali-linux
echo 'Everything is installed. 'cd' into the Kali directory and run 'vagrant up' to start machine.'
