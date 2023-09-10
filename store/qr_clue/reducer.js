import { GET_QR_CLUE_FAIL, GET_QR_CLUE_SUCCESS } from "./actionTypes";
import { fit } from "helpers/response";
import { filter } from "lodash";

const INIT_STATE = {
  qrClues: [],
  error: {},
};

const qrClues = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QR_CLUE_SUCCESS:
      return {
        ...state,
        qrClues: [
          ...filter(state.qrClues, (g) => {
            return g.code !== action.code;
          }),
          fit(action.payload),
        ],
      };

    case GET_QR_CLUE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default qrClues;
