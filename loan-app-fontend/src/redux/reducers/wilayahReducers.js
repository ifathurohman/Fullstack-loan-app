import * as actionTypes from '../constants/wilayahConstants';

const WILAYAH_INITIAL_STATE = {
  provinsi: [],
};

export const wilayahReducer = (state = WILAYAH_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_PROVINSI:
      return {
        provinsi: [...action.payload.data],
      };
    default:
      return state;
  }
};
