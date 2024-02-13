import * as actionTypes from "../constants/loanConstants";

export const getLoanReducer = (state = { loans: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_LOAN_REQUEST:
      return {
        loading: true,
        loans: [],
      };
    case actionTypes.GET_LOAN_SUCCESS:
      return {
        loans: action.payload,
        loading: false,
      };
    case actionTypes.GET_LOAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
