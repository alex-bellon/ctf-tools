# Operating System and Users
echo -e "\n# Hostname: \n\`$(hostname)\`"
echo -e "\n# User: \n\`$(whoami)\`"
echo -e "\n# Operating System: \n\`$(uname -a)\`"
echo -e "\n# Other Users:\n\n\`\`\`\n$(w)\n\`\`\`\n"
# cat /etc/os-release

# Networking
echo -e "\n# Network:\n\n\`\`\`\n$(ip a)\n\`\`\`\n"
echo -e "\n# Connections (netstat):\n\n\`\`\`\n$(netstat -pluent)\n\`\`\`\n" #problem
# -p shows PID, -l show listening sockets, -u UDP, -e extended information, -n show numerical addresses, -t TCP
echo -e "\n# Connections (ss):\n\n\`\`\`\n$(ss -an)\n\`\`\`\n" #problem
# -a all, -n numeric, -p process (edited)

# Processes
echo -e "\n# Processes:\n\n\`\`\`\n$(ps -ef)\n\`\`\`\n"
# -e (or -A) is all processes, -f is full format
# ps -aux

#ASLR
ASLR=$(cat /proc/sys/kernel/randomize_va_space)
if [ $ASLR == 0 ]
then
  echo -e "\n# ASLR: Not enabled (0)"
else
  echo -e "\n# ASLR: Enabled ($ASLR)"
fi

# Aliases and Symlinks
echo -e "\n# Aliases:\n\n\`\`\`\n$(alias)\n\`\`\`\n" #problem
# find symlinks - don't know the best way to do this

# Bash files
echo -e "\n# Bash History\n\n\`\`\`\n$(cat ~/.bash_history)\n\`\`\`\n"
echo -e "\n# bashrc:\n\n\`\`\`\n$(cat ~/.bashrc)\n\`\`\`\n"
echo -e "\n# Bash Profile:\n\n\`\`\`\n$(cat ~/.bash_profile)\n\`\`\`\n"
echo -e "\n# Profile:\n\n\`\`\`\n$(cat ~/.profile)\n\`\`\`\n"
