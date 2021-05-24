import React from 'react';
import {Switch, Route} from "react-router-dom";

// Components
import Header from "./components/Header";

// Views
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";

const App = () => {
  return (
    <>
    <Header/>

    <div className="content">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/sign-up" component={Register}/>
        <Route exact path="/sign-in" component={Login}/>
      </Switch>
    </div>
    </>
  )
};

export default App;