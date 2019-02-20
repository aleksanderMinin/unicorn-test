import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'
import Categories from './components/Categories';
import Category from './components/Category';
import Product from './components/Product';
import NotFound from './components/NotFound';
import configureStore, { history } from './configureStore'
import Layout from './components/Layout';
import { ConnectedRouter } from 'connected-react-router'
import './styles/App.less';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Categories} />
          <Route exact path="/categories/:id" component={Category} />
          <Route path="/categories/:id/products/:id" component={Product} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root')
);