// reducers/immobiliReducer.js
const initialState = {
  immobili: [],
  loading: false,
  error: null,
};

export const creaImmobileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_IMMOBILE_SUCCESS":
      return {
        ...state,
        immobili: [...state.immobili, action.payload],
        loading: false,
      };
    case "CREATE_IMMOBILE_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const staffMembersCreateReducer = (state = { staffMembers: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case "FETCH_STAFF_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_STAFF_SUCCESS":
      return { ...state, loading: false, staffMembers: action.payload, error: null };
    case "FETCH_STAFF_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default staffMembersCreateReducer;
