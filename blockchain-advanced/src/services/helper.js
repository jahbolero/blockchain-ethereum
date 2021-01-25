import { sha256 } from "js-sha256";
let cryptico = require("cryptico");

let bits = 1024;
let phraseProducer = "I am the producer.";
let privateKeyProducer = cryptico.generateRSAKey(phraseProducer, bits);
let publicKeyProducer = cryptico.publicKeyString(privateKeyProducer);

let phraseConsumer = "I am the consumer";
let privateKeyConsumer = cryptico.generateRSAKey(phraseConsumer, bits);
let publicKeyConsumer = cryptico.publicKeyString(privateKeyConsumer);

var newProducer = {
  privateKey: privateKeyProducer,
  publicKey: publicKeyProducer,
  consumerPublicKey: publicKeyConsumer,
};

let newConsumer = {
  privateKey: privateKeyConsumer,
  publicKey: privateKeyProducer,
  producerPublicKey: publicKeyProducer,
};

export function merkleHash(transactionList) {
  let root;
  let tempList = [];
  let i = 0;
  let firstLayer = true;
  while (i < transactionList.length) {
    if (transactionList.length === 1) {
      root =
        firstLayer === true
          ? sha256(JSON.stringify(transactionList[0]))
          : transactionList[0];
      break;
    }
    let firstElement = transactionList[i];
    let secondElement = transactionList[i + 1];
    let firstHash = null;
    let secondHash = null;
    if (firstElement !== undefined && firstLayer) {
      firstHash = sha256(JSON.stringify(firstElement));
    } else if (!firstLayer) {
      firstHash = firstElement;
    }
    if (secondElement !== undefined && firstLayer) {
      secondHash = sha256(JSON.stringify(secondElement));
    } else if (!firstLayer) {
      secondHash = secondElement;
    }

    if (firstHash != null && secondHash != null) {
      tempList.push(sha256(firstHash + secondHash));
      i += 2;
    } else if (firstHash != null) {
      tempList.push(sha256(firstHash));
      i = 0;
      transactionList = tempList;
      tempList = [];
      firstLayer = false;
      continue;
    }
    if (i === transactionList.length) {
      i = 0;
      transactionList = tempList;
      tempList = [];
      firstLayer = false;
      continue;
    }
  }

  return root;
}
export function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}
export function generateHashedBlock(block) {
  let nonce = 0;
  let count = 0;
  let hash;
  console.log("Finding valid nonce");
  while (count < 5) {
    block.nonce = nonce;
    hash = sha256(JSON.stringify(block));
    let result = hash.substring(0, 10).match(/0/g);
    count = result == null ? 0 : result.length;
    nonce++;
  }
  block.hash = hash;
  console.log("Nonce found.");
  return block;
}

export function getProducer() {
  return newProducer;
}
export function getConsumer() {
  return newConsumer;
}
export function processTransactions(block, consumer) {
  block.transactionList.forEach((transaction) => {
    let signature = cryptico.decrypt(block.signature, consumer.privateKey)
      .signature;
    if (signature !== "verified") return;

    var foundIndex = block.state.candidates.findIndex(
      (x) => x.name === transaction.data
    );

    if (foundIndex === -1) return;
    let candidate = {
      name: block.state.candidates[foundIndex].name,
      votes: block.state.candidates[foundIndex].votes,
    };
    if (transaction.action === "up") {
      candidate.votes += 1;
      block.state.candidates[foundIndex] = candidate;
    } else if (transaction.action === "down") {
      candidate.votes -= 1;
      block.state.candidates[foundIndex] = candidate;
    }
  });
  return null;
}
