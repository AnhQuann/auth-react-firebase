import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import 'materialize-css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store';
import App from './App';

const render = () => {
  console.log(store.getState());
  ReactDOM.render(<App />, document.getElementById('root'));
};

render();
store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
