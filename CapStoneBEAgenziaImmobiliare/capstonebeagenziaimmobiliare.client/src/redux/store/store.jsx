import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { staffReducer, immobiliReducer } from "../reducers/homeReducer";
import { searchResultsReducer } from "../reducers/cercoCasaReducer";
import loginReducer from "../reducers/loginReducer";
import { valutazioneReducer } from "../reducers/vendiCasaReducer";
import { gestioneimmobiliReducer } from "../reducers/gestioneImmobiliReducers";
import dettaglioImmobileReducer from "../reducers/dettagliImmobileReducer";

const rootReducer = combineReducers({
  staff: staffReducer,
  immobili: immobiliReducer,
  searchResults: searchResultsReducer,
  login: loginReducer,
  valutazione: valutazioneReducer,
  gestioneImmobili: gestioneimmobiliReducer,
  dettagliImmobile: dettaglioImmobileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
