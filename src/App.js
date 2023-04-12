import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BaseConcept from "./pages/base-concept";
import GuessNumberGame from "./pages/game";
import Stack from "./pages/data-construct/stack";
import HomePage from "./pages/home-page";
import DataConstruct from "./pages/data-construct";
import Queue from "./pages/data-construct/queue";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/algorithm" component={BaseConcept} exact />
          <Route path="/data-construct" component={DataConstruct} />
          <Route path="/game" component={GuessNumberGame} />
          <Route path="/stack" component={Stack} />
          <Route path="/queue" component={Queue} />
          {/* <Route path="/" render={() => <h1>主页</h1>} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
