import React, { useState, useEffect } from "react";
import AddressList from "./../address/AddressList";
import * as ethApi from "../../services/ethApi";
import ProductRegister from "./../product/ProductRegister";
import ProductList from "./../product/ProductList";
import { toast } from "react-toastify";
import ProductSearch from "../product/ProductSearch";
import ProductInfo from "../product/ProductInfo";
import ProductTransferOwner from "../product/ProductTransferOwner";
import ProductTransferLocation from "./../product/ProductTransferLocation";
import { Link, Switch, useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";

function SupplierPage() {
  let { path, url } = useRouteMatch();
  const [addressList, setAddressList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [supplierAddress, setSupplierAddress] = useState("");
  const [product, setProduct] = useState({});
  useEffect(() => {
    ethApi.loadData().then((result) => {
      setAddressList(result);
      setProductList(JSON.parse(localStorage.getItem("productList")));
      setSupplierAddress(JSON.parse(localStorage.getItem("accountList"))[0]);
    });
  }, []);

  function handleChange({ target }) {
    console.log();
    setProduct({ ...product, [target.name]: target.value });
  }
  function handleRegisterProduct() {
    setProductList(JSON.parse(localStorage.getItem("productList")));
  }
  function handleProductSearch(product) {
    setProduct(product);
  }
  function handleProductTransferOwner(transfer) {}
  function handleProductTransferLocation(transfer) {}
  return (
    <div>
      <h2>Supplier Page({supplierAddress})</h2>
      <AddressList
        addressList={addressList.length === 0 ? [] : addressList}
      ></AddressList>
      <br></br>
      <div className="text-center">
        <Link to={`${url}/Register`}>
          <button className="btn btn-info">Register Product</button>
        </Link>
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
        <Route path={`${path}/Register`}>
          <ProductRegister
            product={product}
            onRegisterProduct={handleRegisterProduct}
            onChange={handleChange}
          ></ProductRegister>
        </Route>
        <Route path={`${path}/Search`}>
          <ProductSearch onProductSearch={handleProductSearch}></ProductSearch>
          <ProductInfo product={product}></ProductInfo>
        </Route>
        <Route path={`${path}/TransferOwner`}>
          <ProductTransferOwner
            onProductTransferOwner={handleProductTransferOwner}
            ownerAddress={supplierAddress}
          ></ProductTransferOwner>
        </Route>
        <Route path={`${path}/TransferLocation`}>
          <ProductTransferLocation
            onProductTransferLocation={handleProductTransferLocation}
            ownerAddress={supplierAddress}
          ></ProductTransferLocation>
        </Route>
      </Switch>
      <br></br>
      <ProductList
        productList={productList.length === 0 ? [] : productList}
      ></ProductList>
    </div>
  );
}

export default SupplierPage;
