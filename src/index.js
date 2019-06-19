import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import history from './services/history';
import reducers from './concepts';
import App from './containers/App';
import Landing from './containers/Landing';
import Feature from './containers/Feature';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Route path="/" exact component={Landing} />
        <Route path="/feature" exact component={Feature} />
      </App>
    </Router>
  </Provider>,
  document.querySelector('#root')
);
