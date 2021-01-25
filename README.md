#  Advanced task for Ethereum and Blockchain

## Ethereum

This is an Ethereum project for smart contracts where product instances can be created,transfered, or moved.

`1.cd ethereum-advanced`

`2.npm install`

`3.ganache-cli -d`

`4.npm start`


## Blockchain

This is a simple custom voting blockchain implementation.

`1.cd blockchain-advanced`

`2.npm install`

`3.npm start`

### How it works

`1. Transactions are created when an upvote or downvote is made.`

`2. "Create a block" function will copy currently existing transactions and add it to its transaction list.`

`3. "Consume Random Block" will randomly select a block to process and add to the chain. The remaining pending blocks will disappear and the transactions that aren't processed will remain "floating" awaiting for another block to take them.`