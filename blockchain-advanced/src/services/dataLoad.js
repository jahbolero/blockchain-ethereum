let blockchain = localStorage.getItem("blockchain");
let transactions = localStorage.getItem("transactions");
let blocks = localStorage.getItem("blocks");
//Instantiaties the blockchain.
if (blockchain == null) {
  let initialBlockchain = [];
  let genesisBlock = {
    state: {
      candidates: [
        { name: "Jake", votes: 0 },
        { name: "Valero", votes: 0 },
      ],
    },
    blockNumber: 0,
    nonce: 0,
    hash: "",
    previousBlockHash: "",
    signature: null,
    transactionList: null,
    transactionListHash: null,
  };
  initialBlockchain.push(genesisBlock);
  localStorage.setItem("blockchain", JSON.stringify(initialBlockchain));
}

if (transactions == null) {
  localStorage.setItem("transactions", JSON.stringify([]));
}
if (blocks == null) {
  localStorage.setItem("blocks", JSON.stringify([]));
}
