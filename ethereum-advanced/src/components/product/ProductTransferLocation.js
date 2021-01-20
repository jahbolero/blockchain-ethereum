import React, { useState } from "react";
import Input from "../common/Input";
import * as ethApi from "../../services/ethApi";
import { toast } from "react-toastify";

function ProductTransferLocation({ onProductTransferLocation, ownerAddress }) {
  const [transfer, setTransfer] = useState({});
  function handleChange({ target }) {
    setTransfer({ ...transfer, [target.name]: target.value });
  }

  function productTransferLocation(event) {
    event.preventDefault();
    transfer.owner = ownerAddress;
    ethApi
      .transferProductLocation(transfer)
      .then((result) => {
        toast.success("Successfully transfered product location");
      })
      .catch((error) => {
        if (error.data == null) {
          toast.error("Something went wrong. Please check logs");
          console.log(error);
          return;
        }
        const [errorKey] = Object.keys(error.data);
        if (error.data[errorKey].reason !== undefined)
          console.log(error.data[errorKey].reason);
        toast.error(error.data[errorKey].reason);
      });
    onProductTransferLocation(transfer);
  }
  return (
    <div>
      <h3 className="text-center">Transfer Product Location</h3>
      <form onSubmit={productTransferLocation}>
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
          id="location"
          label="New Location"
          name="location"
          value={transfer.location == null ? "" : transfer.location}
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

export default ProductTransferLocation;
