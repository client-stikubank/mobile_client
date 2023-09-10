import { del, get, post, put } from "helpers/api_helper";
import * as url from "helpers/url_helper";
import { authSessionCheck } from "lib/Session";

export const createUserQuestionnaires = async (questionnaire_id, answer) => {
  const { credential } = await authSessionCheck();

  return post(
    url.USER_QUESTIONNAIRES,
    {
      user_questionnaire: {
        questionnaire_id: questionnaire_id,
        answer: answer,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`,
      },
    }
  );
};
