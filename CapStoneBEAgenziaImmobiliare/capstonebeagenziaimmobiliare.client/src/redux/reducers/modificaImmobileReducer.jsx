export const modificaImmobileReducer = (state = {}, action) => {
  switch (action.type) {
    case "MODIFICA_IMMOBILE_SUCCESS":
      return {
        ...state,
        success: true,
        immobile: action.payload,
      };
    case "MODIFICA_IMMOBILE_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const modificaDettagliReducer = (
  state = { immobile: {}, immagini: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case "IMMOBILE_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "IMMOBILE_DETAILS_SUCCESS":
      return { ...state, loading: false, immobile: action.payload, immagini: action.payload.immagini || [] };
    case "IMMOBILE_DETAILS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPLOAD_IMAGE_SUCCESS":
      return { ...state, immagini: [...state.immagini, action.payload] };
    case "SET_COVER_IMAGE_SUCCESS":
      return {
        ...state,
        immagini: state.immagini.map((img) =>
          img.idImmagine === action.payload ? { ...img, immagineCopertina: true } : { ...img, immagineCopertina: false }
        ),
      };
    default:
      return state;
  }
};

const staffMembersReducer = (state = { staffMembers: [], loading: false, error: null }, action) => {
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

export default staffMembersReducer;
