import {
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  SET_SUBSCRIPTON_STATUS,
} from "./../actionType";
import requestt from "./../../api";

export const getChannelDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });
    const { data } = await requestt("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: id,
      },
    });
    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await requestt("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().authh.accessToken}`,
      },
    });
    dispatch({
      type: SET_SUBSCRIPTON_STATUS,
      payload: data.items.length !== 0,
    });
    // console.log("Data::", data);
  } catch (error) {
    console.log("Subs:", error.response.data);
  }
};
