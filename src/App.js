import './App.css';
import React from "react";
import SchemeAndChart from "./components/SchemeAndChart/SchemeAndChart";
import TduRoot from "./components/TduRoot/TduRoot";
import Header from "./components/Header/Header";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Home from "./components/Home/Home";
import Converter from "./components/Converter/Converter";


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tdu" component={TduRoot}/>
          <Route exact path="/valves" component={SchemeAndChart}/>
          <Route exact path="/converter" component={Converter}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
