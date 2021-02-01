import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import SchemeAndChartContainer from "./components/SchemeAndChart/SchemeAndChartContainer";
import TduRoot from "./components/TduRoot/TduRoot";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Converter from "./components/Converter/Converter";
import Contacts from "./components/Contacts/Contacts";


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact={true} path="/"          component={Home}             />
          <Route exact={true} path="/valves"    component={SchemeAndChartContainer}   />
          <Route exact={true} path="/tdu"       component={TduRoot}          />
          <Route exact={true} path="/converter" component={Converter}        />
          <Route exact={true} path="/contacts"  component={Contacts}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
