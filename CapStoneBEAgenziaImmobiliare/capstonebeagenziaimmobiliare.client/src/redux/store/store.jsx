import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { staffReducer, immobiliReducer } from "../reducers/homeReducer";
import { searchResultsReducer } from "../reducers/cercoCasaReducer";

const rootReducer = combineReducers({
  staff: staffReducer,
  immobili: immobiliReducer,
  searchResults: searchResultsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
