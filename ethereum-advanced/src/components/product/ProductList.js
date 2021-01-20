import React from "react";

function ProductList({ productList }) {
  return (
    <div>
      <h3 className="text-center">Product List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Product Hash</th>
            <th>Transaction Hash</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => {
            return (
              <tr key={product.productHash}>
                <td>{product.productHash}</td>
                <td>{product.transactionHash}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
