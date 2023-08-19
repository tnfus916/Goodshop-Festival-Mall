import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from './modules/user';
import product from './modules/product';
import cart from './modules/cart';
import payment from './modules/payment';

const rootReducer = combineReducers({ user, product, cart, payment });
const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;

