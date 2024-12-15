import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import Test_Red from "./reducer/Test_Red";

const reducers = combineReducers({
  Test_Red
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

export default store;
