import { del, get, post, put } from "helpers/api_helper";
import * as url from "helpers/url_helper";
import { authSessionCheck } from "lib/Session";

export const getQrClue = async (id) => {
  const { credential } = await authSessionCheck();
  return get(url.QR_CLUES + `/${id}`, {
    headers: {
      Authorization: `Bearer ${credential?.access_token}`,
    },
  });
};
