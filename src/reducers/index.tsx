import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import categories from './categories';
import basket from './basket';
import products from './products';
import header from './header';
import layout from './layout';
import payment from './payment';

export default (history: History | any) => combineReducers({
  router: connectRouter(history),
  categories,
  basket,
  products,
  header,
  layout,
  payment,
});
