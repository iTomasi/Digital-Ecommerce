import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";

// Context State
import UserState from "./context/user/UserState";

ReactDOM.render(
  <BrowserRouter>
    <UserState>

      <App/>

    </UserState>
  </BrowserRouter>,
  document.getElementById('root')
);
