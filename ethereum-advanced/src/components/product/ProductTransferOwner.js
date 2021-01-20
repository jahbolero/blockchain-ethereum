import React, { useState } from "react";
import Input from "../common/Input";
import * as ethApi from "../../services/ethApi";
import { toast } from "react-toastify";

function ProductTransferOwner({ onProductTransferOwner, ownerAddress }) {
  const [transfer, setTransfer] = useState({});
  function handleChange({ target }) {
    setTransfer({ ...transfer, [target.name]: target.value });
  }

  function productTransferOwner(event) {
    event.preventDefault();
    transfer.owner = ownerAddress;
    ethApi
      .transferProductOwner(transfer)
      .then((result) => {
        console.log(result);
        toast.success("Successfully transfered product owner");
      })
      .catch((error) => {
        const [errorKeys] = Object.keys(error);
        console.log(errorKeys);
        if (error.data == null) {
          if (error.reason != null) {
            toast.error(error.reason);
            return;
          }
          toast.error("Something went wrong. Please check logs");
          console.log(error);
          return;
        }
        const [errorKey] = Object.keys(error.data);
        if (error.data[errorKey].reason !== undefined)
          console.log(error.data[errorKey].reason);
        toast.error(error.data[errorKey].reason);
      });
  }
  return (
    <div>
      <h3 className="text-center">Transfer Product Owner</h3>
      <form onSubmit={productTransferOwner}>
        <Input
          type="text"
          id="productHash"
          label="Product Hash"
          name="productHash"
          value={transfer.productHash == null ? "" : transfer.productHash}
          onChange={handleChange}
        ></Input>
        <Input
          type="text"
          id="address"
          label="New Owner Address"
          name="address"
          value={transfer.address == null ? "" : transfer.address}
          onChange={handleChange}
        ></Input>
        <input
          type="submit"
          value="Submit"
          className="btn btn-info form-control"
        ></input>
      </form>
    </div>
  );
}

export default ProductTransferOwner;
