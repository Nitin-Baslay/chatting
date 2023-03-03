import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Header />
          <Login />
        </Route>
        <Route path="/signup">
        <Header />
          <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
