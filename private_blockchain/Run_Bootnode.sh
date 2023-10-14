#!/bin/sh

# Start the bootnode for the private Ethereum blockchain

ip_address=$(ip -4 addr show scope global dev eth0 | grep inet | awk '{print $2}' | cut -d '/' -f 1)

echo $ip_address

bootnode -nodekey boot.key -verbosity 9 -addr :30310