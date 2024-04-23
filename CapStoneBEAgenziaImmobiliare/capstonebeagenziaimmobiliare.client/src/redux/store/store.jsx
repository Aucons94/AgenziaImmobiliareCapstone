import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { staffReducer, immobiliReducer } from "../reducers/homeReducer";
import { searchResultsReducer } from "../reducers/cercoCasaReducer";
import loginReducer from "../reducers/loginReducer";
import { valutazioneReducer } from "../reducers/vendiCasaReducer";
import { gestioneimmobiliReducer } from "../reducers/gestioneImmobiliReducers";
import dettaglioImmobileReducer from "../reducers/dettagliImmobileReducer";
import staffMembersReducer, {
  modificaDettagliReducer,
  modificaImmobileReducer,
} from "../reducers/modificaImmobileReducer";
import staffMembersCreateReducer, { creaImmobileReducer } from "../reducers/creaImmobileReducer";
import gestioneValutazioniReducer from "../reducers/gestioneValutazioniReducer";
import gestioneUtentiReducer from "../reducers/gestioneUtentiReducer";

const rootReducer = combineReducers({
  staff: staffReducer,
  immobili: immobiliReducer,
  searchResults: searchResultsReducer,
  login: loginReducer,
  valutazione: valutazioneReducer,
  gestioneImmobili: gestioneimmobiliReducer,
  dettagliImmobile: dettaglioImmobileReducer,
  modificaImmobile: modificaImmobileReducer,
  modificaDettagli: modificaDettagliReducer,
  modificaStaff: staffMembersReducer,
  creaImmobile: creaImmobileReducer,
  creaStaff: staffMembersCreateReducer,
  gestioneValutazioni: gestioneValutazioniReducer,
  gestioneUtenti: gestioneUtentiReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
