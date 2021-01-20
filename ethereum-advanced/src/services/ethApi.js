import Web3 from "web3";
import { sha256 } from "js-sha256";

const web3 = new Web3("ws://localhost:8545");

const ProductInstanceJson = require("../truffle-backend/build/contracts/ProductContract.json");
const abi = ProductInstanceJson.abi;
const bytecode = ProductInstanceJson.bytecode;
const gasPrice = web3.utils.toWei("20", "gwei");
const gas = 5000000;

//Loads the contract initial and data from the ethereum network
export async function loadData() {
  let accountList = localStorage.getItem("accountList");
  let contractAddress = localStorage.getItem("contractAddress");
  let productList = localStorage.getItem("productList");

  let accounts = await web3.eth.getAccounts();
  accounts = accounts.splice(0, 5);
  if (accountList === null) {
    localStorage.setItem("accountList", JSON.stringify(accounts));
  }
  if (contractAddress === null) {
    deployContract();
  }
  if (productList === null) {
    localStorage.setItem("productList", JSON.stringify([]));
  }

  return accounts;
}

function deployContract() {
  let contract = new web3.eth.Contract(abi);
  let payload = {
    data: bytecode,
    arguments: [JSON.parse(localStorage.getItem("accountList"))[0]],
  };
  let parameter = {
    from: JSON.parse(localStorage.getItem("accountList"))[0],
    gas: gas,
    gasPrice: gasPrice,
  };
  contract
    .deploy(payload)
    .send(parameter, (err, transactionHash) => {
      console.log("Transaction Hash :", transactionHash);
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      localStorage.setItem(
        "contractAddress",
        newContractInstance.options.address
      );
      console.log(
        "Deployed Contract Address : ",
        newContractInstance.options.address
      );
    });
}

//Registers a product into the smart contract
export async function registerProduct(product) {
  let supplierAddress = JSON.parse(localStorage.getItem("accountList"))[0];
  let myContract = new web3.eth.Contract(
    abi,
    localStorage.getItem("contractAddress")
  );
  return await myContract.methods
    .registerProduct(
      product.name == null ? "" : product.name,
      product.productionDate,
      product.location == null ? "" : product.location,
      product.productHash
    )
    .send({
      from: supplierAddress,
      gas: gas,
      gasPrice: gasPrice,
    });
}

//Retrieves a product from the smart contract
export async function getProduct(productHash) {
  let myContract = new web3.eth.Contract(
    abi,
    localStorage.getItem("contractAddress")
  );
  let supplierAddress = JSON.parse(localStorage.getItem("accountList"))[0];

  return await myContract.methods.getProduct(productHash).call({
    from: supplierAddress,
    gas: gas,
    gasPrice: gasPrice,
  });
}

//Transfers product to a different location.
export async function transferProductLocation(transfer) {
  let myContract = new web3.eth.Contract(
    abi,
    localStorage.getItem("contractAddress")
  );
  return await myContract.methods
    .changeLocation(
      transfer.productHash == null ? "" : transfer.productHash,
      transfer.location == null ? "" : transfer.location
    )
    .send({
      from: transfer.owner == null ? null : transfer.owner,
      gas: gas,
      gasPrice: gasPrice,
    });
}

//Transfers product to a different owner address .
export async function transferProductOwner(transfer) {
  console.log(transfer);
  let myContract = new web3.eth.Contract(
    abi,
    localStorage.getItem("contractAddress")
  );
  return await myContract.methods
    .changeOwner(
      transfer.productHash == null ? "" : transfer.productHash,
      transfer.address == null ? "" : transfer.address
    )
    .send({
      from: transfer.owner == null ? "" : transfer.owner,
      gas: gas,
      gasPrice: gasPrice,
    });
}
//Finds the given owner address' existence in the account list.
export function searchOwner(ownerAddress) {
  let accountList = JSON.parse(localStorage.getItem("accountList"));
  console.log(accountList);
  if (accountList == null) return false;
  return accountList.includes(ownerAddress) == true ? true : false;
}
