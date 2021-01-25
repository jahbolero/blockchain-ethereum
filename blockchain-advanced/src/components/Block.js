import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Transactions from "./Transactions";

function Block() {
  let { number } = useParams();
  const [block, setBlock] = useState(
    JSON.parse(localStorage.getItem("blockchain"))[number]
  );
  return (
    <div>
      <p>Block Number:{block.blockNumber}</p>
      <p>Block Hash:{block.hash}</p>
      <p>Previous Block Hash:{block.previousBlockHash}</p>
      <p>Nonce:{block.nonce}</p>
      <p>Transaction List Hash:{block.transactionListHash}</p>
      <Transactions transactions={block.transactionList}></Transactions>
    </div>
  );
}

export default Block;
