import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './containers/App';
import Landing from './containers/Landing';
import TopArtists from './containers/TopArtists';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <App>
        <Route path="/" exact component={Landing} />
        <Route path="/topArtists" exact component={TopArtists} />
      </App>
    </Router>
  </Provider>,
  document.querySelector('#root')
);
