import React from "react";

function Transactions({ transactions }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Action</th>
            <th>Data</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr>
                <td>
                  {new Date(transaction.timestamp).toDateString()}
                  {new Date(transaction.timestamp).toTimeString()}
                </td>
                <td>{transaction.action}</td>
                <td>{transaction.data}</td>
                <td>{transaction.from}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
