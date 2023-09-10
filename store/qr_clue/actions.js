import {
  GET_QR_CLUE,
  GET_QR_CLUE_FAIL,
  GET_QR_CLUE_SUCCESS,
} from "./actionTypes";

export const getQrClue = (code) => ({
  type: GET_QR_CLUE,
  payload: code,
});

export const getQrClueSuccess = (qrClue, code) => ({
  type: GET_QR_CLUE_SUCCESS,
  payload: qrClue,
  code: code,
});

export const getQrClueFail = (error) => ({
  type: GET_QR_CLUE_FAIL,
  payload: error,
});
