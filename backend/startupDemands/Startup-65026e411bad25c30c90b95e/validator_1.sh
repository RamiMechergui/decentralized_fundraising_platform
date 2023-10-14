#!/bin/sh

# Get the enode address of the bootnode
bootnode_enode="enode://$(bootnode -nodekey boot.key -writeaddress)@$(nslookup bootnode | awk '/^Address: / { print $2 }'):0?discport=30310"

echo $bootnode_enode

# Start Node1 and connect it to the bootnode and other nodes in the private network
NETWORK_ID=12345
DATA_DIRECTORY='./Node1/'
SYNCMODE='full' 
Node_PORT=30311
HTTP_ADDRESS=0.0.0.0
HTTP_PORT=8545
HTTP_API='eth,net,web3,txpool,miner'
HTTP_CORSDOMAIN="\*"
WS_PORT=3334
WS_API='eth,net,web3'
WS_CORSDOMAIN="\*"
PASSWORD_DIRECTORY='./Node1/password.txt'
MINER_GAS_PRICE=0
NODE_ADDRESS='0xBA8F96DBDfBBEa9d5CC6D06e9957477fE1ec1c17'

#geth --datadir $DATA_DIRECTORY --syncmode $SYNCMODE --port $Node_PORT --http --http.addr $HTTP_ADDRESS --http.corsdomain $HTTP_CORSDOMAIN --http.port $HTTP_PORT --http.api $HTTP_API --ws --ws.port $WS_PORT --ws.api $WS_API --ws.origins $WS_CORSDOMAIN --bootnodes $bootnode_enode --networkid $NETWORK_ID -unlock $NODE_ADDRESS --allow-insecure-unlock --password $PASSWORD_DIRECTORY --miner.etherbase $NODE_ADDRESS --miner.gasprice $MINER_GAS_PRICE --mine
geth --datadir './Node1/' --syncmode $SYNCMODE --port "${Node_PORT}" --nat "any" --http --http.addr "0.0.0.0" --http.port "${HTTP_PORT}" --http.corsdomain=* --http.vhosts=* --http.api "eth,net,web3,personal,txpool" --ws --ws.addr "0.0.0.0" --ws.port "${WS_PORT}" --ws.origins=* --rpc.enabledeprecatedpersonal --ws.api "eth,net,web3,txpool" --networkid $NETWORK_ID -unlock $NODE_ADDRESS  --allow-insecure-unlock --password $PASSWORD_DIRECTORY --miner.etherbase $NODE_ADDRESS --miner.gasprice $MINER_GAS_PRICE --mine