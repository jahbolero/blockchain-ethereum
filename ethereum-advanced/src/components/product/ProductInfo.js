import React from "react";

function ProductInfo({ product }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Owner</th>
            <th>Date</th>
          </tr>
        </thead>
        {product.owner === undefined ? (
          ""
        ) : (
          <tbody>
            <tr>
              <td>{product.name}</td>

              <td>{product.currentLocation}</td>
              <td>{product.owner}</td>
              <td>
                {product.productionDate.toDateString()}{" "}
                {product.productionDate.toTimeString()}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default ProductInfo;
