import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/common/Header";
import SupplierPage from "./components/supplier/SupplierPage";
import OwnerPage from "./components/owner/OwnerPage";
function App() {
  return (
    <div className="container">
      <ToastContainer autoClose={5000} hideProgressBar></ToastContainer>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={SupplierPage}></Route>
        <Route path="/Supplier" component={SupplierPage}></Route>
        <Route path="/ProductOwner" component={OwnerPage}></Route>
      </Switch>
      <footer></footer>
    </div>
  );
}

export default App;
