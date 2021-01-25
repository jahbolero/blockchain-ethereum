import React, { useState, useEffect } from "react";
import { sha256 } from "js-sha256";

import { NavLink } from "react-router-dom";
import {
  merkleHash,
  generateHashedBlock,
  getConsumer,
  getProducer,
  processTransactions,
  randomNumber,
} from "../services/helper";
let cryptico = require("cryptico");
function Blockchain() {
  //#region React State Setup
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) == null
      ? []
      : JSON.parse(localStorage.getItem("transactions"))
  );
  const [blocks, setBlocks] = useState(
    JSON.parse(localStorage.getItem("blocks")) == null
      ? []
      : JSON.parse(localStorage.getItem("blocks"))
  );
  const [blockchain, setBlockchain] = useState(
    JSON.parse(localStorage.getItem("blockchain")) == null
      ? []
      : JSON.parse(localStorage.getItem("blockchain"))
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    localStorage.setItem("blockchain", JSON.stringify(blockchain));
  }, [blockchain]);
  //#endregion

  function vote(action, data) {
    let producer = getProducer();
    let timestamp = Date.now();

    let transaction = {
      action,
      data,
      timestamp,
      signature: null,
      from: producer.publicKey,
    };
    transaction.signature = cryptico.encrypt(
      JSON.stringify(transaction),
      producer.consumerPublicKey,
      producer.privateKey
    ).cipher;
    setTransactions((oldData) => oldData.concat(transaction));
  }

  function createBlock() {
    let producer = getProducer();
    let highestBlock = Object.assign({}, blockchain[blockchain.length - 1]);
    let state = highestBlock.state;
    let blockHeight = highestBlock.blockNumber + 1;
    let block = {
      state: { candidates: [].concat(state.candidates) },
      blockNumber: blockHeight,
      previousBlockHash: highestBlock.hash,
      transactionList: transactions,
      signature: cryptico.encrypt(
        JSON.stringify(blockHeight),
        producer.consumerPublicKey,
        producer.privateKey
      ).cipher,
    };
    setBlocks((oldData) => oldData.concat(block));
  }

  function consumeBlock(block) {
    let consumer = getConsumer();
    let signature = cryptico.decrypt(block.signature, consumer.privateKey)
      .signature;
    if (signature === "verified") {
      //Process transactions
      processTransactions(block, consumer);
      block.transactionListHash = merkleHash(block.transactionList);
      let hashedBlock = generateHashedBlock(block);
      let highestBlock = blockchain[blockchain.length - 1];
      if (hashedBlock.blockNumber > highestBlock.blockNumber) {
        let remainingTransactions = transactions.filter((transaction) => {
          let found = hashedBlock.transactionList.find((x) => {
            return x.signature === transaction.signature;
          });
          let result = found == undefined;
          return result;
        });
        setTransactions(remainingTransactions);
        setBlockchain((oldData) => oldData.concat(hashedBlock));
        setBlocks([]);
      } else {
        console.log("Another block has been mined first");
      }
    }
  }

  function minePendingBlocks() {
    //Simulate a random block that's "won" the mining race
    if (blocks.length > 0) {
      consumeBlock(blocks[randomNumber(0, blocks.length)]);
    }
  }
  return (
    <div>
      <div>
        <button onClick={() => vote("up", "Jake")} className="btn btn-success">
          Vote Jake
        </button>
        <button onClick={() => vote("down", "Jake")} className="btn btn-danger">
          Downvote Jake
        </button>
      </div>
      <br></br>
      <div>
        <button
          onClick={() => vote("up", "Valero")}
          className="btn btn-success"
        >
          Vote Valero
        </button>
        <button
          onClick={() => vote("down", "Valero")}
          className="btn btn-danger"
        >
          Downvote Valero
        </button>
      </div>
      <h4>Pending Transactions</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Rating</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction.signature}>
                <td>{transaction.data}</td>
                <td>{transaction.action}</td>
                <td>{transaction.from}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          createBlock(transactions);
        }}
        className="btn btn-info"
      >
        Create Block
      </button>

      <button
        onClick={() => {
          minePendingBlocks(blocks);
        }}
        className="btn btn-info"
      >
        Consume Random Block
      </button>
      <h4>Pending Blocks</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction Count</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => {
            return (
              <tr>
                <td>{block.transactionList.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="row">
        {blockchain.map((block) => {
          return (
            <div className="col-md-3">
              <br></br>
              <div className="card">
                <div className="card-body">
                  <NavLink
                    exact
                    to={`/Block/${block.blockNumber}`}
                    className="nav-link"
                  >
                    <p>Block number:{block.blockNumber}</p>
                  </NavLink>
                  <p>Hash:{block.hash}</p>
                  <p>Previous Block Hash:{block.previousBlockHash}</p>
                  <p>
                    Candidate({block.state.candidates[0].name}):
                    {block.state.candidates[0].votes}
                  </p>
                  <p>
                    Candidate({block.state.candidates[1].name}):
                    {block.state.candidates[1].votes}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Blockchain;
