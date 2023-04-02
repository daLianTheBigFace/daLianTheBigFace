import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BaseConcept from "./pages/base-concept";
import GuessNumberGame from "./pages/game";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={BaseConcept} exact />
          <Route path="/game" component={GuessNumberGame} />
          {/* <Route path="/" render={() => <h1>主页</h1>} /> */}
          
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
