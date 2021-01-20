import React, { useState } from "react";

function AddressList({ addressList }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3 className="text-center">Address List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {addressList.map((address) => {
            return (
              <tr key={address}>
                <td>{address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AddressList;
