import React, { useState } from "react";
import Input from "../common/Input";
import * as ethApi from "../../services/ethApi";
import { sha256 } from "js-sha256";
import { toast } from "react-toastify";

function ProductRegister({ onRegisterProduct, product, onChange }) {
  function registerProduct(event) {
    event.preventDefault();
    product.productionDate = Date.now();
    product.productHash = sha256(`${product.name}_${product.productionDate}`);
    ethApi
      .registerProduct(product)
      .then((result) => {
        let oldProductList = JSON.parse(localStorage.getItem("productList"));
        localStorage.setItem(
          "productList",
          JSON.stringify(
            oldProductList.concat({
              productHash: product.productHash,
              transactionHash: result.transactionHash,
            })
          )
        );
        toast.success("Product registered");
        onRegisterProduct(product);
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
  }

  return (
    <div>
      <h3 className="text-center">Register Product</h3>
      <form onSubmit={registerProduct}>
        <Input
          type="text"
          id="name"
          label="Name"
          name="name"
          value={product.name == null ? "" : product.name}
          onChange={onChange}
        ></Input>
        <Input
          type="text"
          id="location"
          label="Location"
          name="location"
          value={product.location == null ? "" : product.location}
          onChange={onChange}
        ></Input>
        <input
          type="submit"
          value="Register Product"
          className="btn btn-info form-control"
        ></input>
      </form>
    </div>
  );
}

export default ProductRegister;
