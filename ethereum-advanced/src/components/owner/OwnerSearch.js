import React from "react";
import Input from "../common/Input";

function OwnerSearch({ owner, onOwnerChange, onSearchOwner }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearchOwner(owner.address);
  }

  return (
    <div>
      <h2>Product Owner({owner.found === true ? owner.address : ""})</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="address"
          label="Owner Address"
          name="address"
          value={owner.address == null ? "" : owner.address}
          onChange={onOwnerChange}
        ></Input>
        <input
          type="submit"
          value="Use Address"
          className="btn btn-info form-control"
        ></input>
      </form>
    </div>
  );
}

export default OwnerSearch;
