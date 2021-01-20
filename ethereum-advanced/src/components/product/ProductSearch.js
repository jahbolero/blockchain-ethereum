import React, { useState } from "react";
import Input from "../common/Input";
import * as ethApi from "../../services/ethApi";
import { toast } from "react-toastify";

function ProductSearch({ onProductSearch }) {
  const [productQuery, setProductQuery] = useState("");
  function handleChange({ target }) {
    setProductQuery(target.value);
  }

  function productSearch(event) {
    event.preventDefault();
    ethApi
      .getProduct(productQuery)
      .then((result) => {
        console.log(result);
        let newProduct = {};
        newProduct.name = result.name;
        newProduct.productionDate = new Date(parseInt(result.productionDate));
        newProduct.currentLocation = result.currentLocation;
        newProduct.owner = result.owner;
        onProductSearch(newProduct);
      })
      .catch((error) => {
        onProductSearch({});
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
      <h3 className="text-center">Search Product</h3>
      <form onSubmit={productSearch}>
        <Input
          type="text"
          id="productQuery"
          label="Product Hash"
          name="productQuery"
          value={productQuery}
          onChange={handleChange}
        ></Input>
        <input
          type="submit"
          value="Search Product"
          className="btn btn-info form-control"
        ></input>
      </form>
    </div>
  );
}

export default ProductSearch;
