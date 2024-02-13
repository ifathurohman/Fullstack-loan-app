import * as actionTypes from '../constants/wilayahConstants';
import {Api} from '../../utils/api';
import {config} from '../../utils/config';
import {useState} from 'react';

export const getProvinsi = () => async dispatch => {
  const {data} = await Api.getWilayah(
    `https://api.binderbyte.com/wilayah/provinsi?api_key=${config.wilayah_key}`,
  );
  const provinsi = JSON.parse(data);

  dispatch({
    type: actionTypes.GET_PROVINSI,
    payload: {
      data: provinsi.value,
    },
  });
};
