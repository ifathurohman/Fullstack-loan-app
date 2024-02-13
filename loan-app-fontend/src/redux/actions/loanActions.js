import * as actionTypes from '../constants/loanConstants';
import {Api} from '../../utils/api';

export const getLoans = () => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_LOAN_REQUEST});

    const {data} = await Api.getRequest('/api/loans/details');
    const p = JSON.parse(data);
    
    dispatch({
      type: actionTypes.GET_LOAN_SUCCESS,
      payload: p,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_LOAN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

