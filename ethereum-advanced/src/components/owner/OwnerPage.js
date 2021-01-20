import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import OwnerSearch from "./OwnerSearch";
import * as ethApi from "../../services/ethApi";
import { toast } from "react-toastify";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import ProductSearch from "./../product/ProductSearch";
import ProductInfo from "./../product/ProductInfo";
import ProductTransferOwner from "./../product/ProductTransferOwner";
import ProductTransferLocation from "./../product/ProductTransferLocation";
import ProductList from "./../product/ProductList";

function OwnerPage() {
  let { path, url } = useRouteMatch();
  const [owner, setOwner] = useState(
    localStorage.getItem("ownerAddress") == null
      ? { found: false }
      : { found: true, address: localStorage.getItem("ownerAddress") }
  );
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    ethApi.loadData().then((result) => {
      setProductList(JSON.parse(localStorage.getItem("productList")));
    });
  }, []);
  function handleChange({ target }) {
    setOwner({ ...owner, [target.name]: target.value, found: false });
  }
  function handleSearchOwner(address) {
    if (ethApi.searchOwner(address)) {
      toast.success("Owner address found");
      localStorage.setItem("ownerAddress", address);
      setOwner({ ...owner, found: true });
    } else {
      toast.error("Owner not found");
    }
  }
  function handleProductSearch(product) {
    setProduct(product);
  }
  return (
    <div>
      <OwnerSearch
        owner={owner}
        onOwnerChange={handleChange}
        onSearchOwner={handleSearchOwner}
      ></OwnerSearch>
      {!owner.found || (
        <div>
          <br></br>
          <div className="text-center">
            <Link to={`${url}/Search`}>
              <button className="btn btn-info">Search Product</button>
            </Link>
            <Link to={`${url}/TransferOwner`}>
              <button className="btn btn-info">Transfer Owner</button>
            </Link>
            <Link to={`${url}/TransferLocation`}>
              <button className="btn btn-info">Transfer Location</button>
            </Link>
          </div>

          <Switch>
            <Route exact path={path}>
              <h3 className="text-center">Please select an option.</h3>
            </Route>
            <Route path={`${path}/Search`}>
              <ProductSearch
                onProductSearch={handleProductSearch}
              ></ProductSearch>
              <ProductInfo product={product}></ProductInfo>
            </Route>
            <Route path={`${path}/TransferOwner`}>
              <ProductTransferOwner
                onProductTransferOwner={() => {}}
                ownerAddress={owner.address}
              ></ProductTransferOwner>
            </Route>
            <Route path={`${path}/TransferLocation`}>
              <ProductTransferLocation
                ownerAddress={owner.address}
                onProductTransferLocation={() => {}}
              ></ProductTransferLocation>
            </Route>
          </Switch>
          <br></br>
          <ProductList
            productList={productList.length === 0 ? [] : productList}
          ></ProductList>
        </div>
      )}
    </div>
  );
}

export default OwnerPage;
