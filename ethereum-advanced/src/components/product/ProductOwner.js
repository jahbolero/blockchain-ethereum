import React, { useState } from "react";
import Input from "../common/Input";

function ProductOwner() {
  const [ownerAddress, setOwnerAddress] = useState("");
  return (
    <div>
      <h2>Product Owner({ownerAddress})</h2>
      <Input
        type="text"
        id="productQuery"
        label="Product Hash"
        name="productQuery"
        value={productQuery}
        onChange={handleChange}
      ></Input>
    </div>
  );
}

export default ProductOwner;
