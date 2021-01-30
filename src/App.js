import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import SchemeAndChart from "./components/SchemeAndChart/SchemeAndChart";
import TduRoot from "./components/TduRoot/TduRoot";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Converter from "./components/Converter/Converter";
import ContactsContainer from "./components/Contacts/ContactsContainer";


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact={true} path="/"          component={Home}             />
          <Route exact={true} path="/valves"    component={SchemeAndChart}   />
          <Route exact={true} path="/tdu"       component={TduRoot}          />
          <Route exact={true} path="/converter" component={Converter}        />
          <Route exact={true} path="/contacts"  component={ContactsContainer}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
