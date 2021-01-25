import { Route, Switch } from "react-router-dom";
import Block from "./components/Block";
import Blockchain from "./components/Blockchain";
import Header from "./components/Header";
function App() {
  return (
    <div className="container">
      <Header></Header>
      <h2>Custom Voting Blockchain</h2>
      <Switch>
        <Route path="/" exact component={Blockchain}></Route>
        <Route path="/Blockchain" component={Blockchain}></Route>
        <Route path="/Block/:number" component={Block}></Route>
      </Switch>
    </div>
  );
}

export default App;
