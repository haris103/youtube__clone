import axios from "axios";
import requestt from "../../api";
import {
  SELECTED_VIDEOS_REQUEST,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  SELECTED_VIDEOS_SUCCESS,
  SELECTED_VIDEOS_FAIL,
  RELATED_VIDEOS_FAIL,
  RELATED_VIDEOS_REQUEST,
  RELATED_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_REQUEST,
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  SUBSCRIPTIONS_CHANNEL_FAIL,
} from "../actionType";
import {
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
} from "./../actionType";

export const getVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    // request.get() = xios.get() -> get() bydeault
    const { data } = await requestt.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        // maxResults: 15,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });
    // console.log("Response from API", res);
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    // request.get() = xios.get() -> get() bydeault
    const { data } = await requestt.get("/search", {
      params: {
        part: "snippet",
        q: keyword,
        // maxResults: 10,
        pageToken: getState().homeVideos.nextPageToken,
        type: "video",
      },
    });
    // console.log("Response from API", res);
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};
export const getVideosById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELECTED_VIDEOS_REQUEST,
    });
    const { data } = await requestt("/videos", {
      params: {
        part: "snippet, statistics",
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEOS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    dispatch({
      type: SELECTED_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};
export const getRelatedVideos = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RELATED_VIDEOS_REQUEST,
    });
    const { data } = await requestt("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    dispatch({
      type: RELATED_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: RELATED_VIDEOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VIDEOS_REQUEST,
    });

    // request.get() = xios.get() -> get() bydeault
    const { data } = await requestt.get("/search", {
      params: {
        part: "snippet",
        q: keyword,
        maxResults: 10,
        type: "video,channel",
      },
    });
    // console.log("Response from API", res);
    dispatch({
      type: SEARCH_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCH_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getSubscriptionChannel = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_REQUEST,
    });
    const { data } = await requestt("/subscriptions", {
      params: {
        part: "snippet, contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().authh.accessToken}`,
      },
    });
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items,
    });
    // console.log("Data::", data);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_FAIL,
      payload: error.response.message,
    });
  }
};
