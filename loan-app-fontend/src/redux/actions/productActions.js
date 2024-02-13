import * as actionTypes from '../constants/productConstants';
import {Api} from '../../utils/api';

export const getProducts = () => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST});

    const {data} = await Api.getProduct('/api/product');
    const p = JSON.parse(data);
    const d = p?.data;

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: d,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = q => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_PRODUCT_DETAILS_REQUEST});

    const {data} = await Api.getProduct(`/api/product?q=${q}`);
    const p = JSON.parse(data);
    const d = p?.data?.[0];
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: {
        ...d,
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => dispatch => {
  dispatch({type: actionTypes.GET_PRODUCT_DETAILS_RESET});
};
