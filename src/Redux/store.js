import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import {
  homeVideosReducer,
  selectedVideoReducer,
  relatedVideoReducer,
  searchVideoReducer,
  subscriptionChannelReducer,
} from "./reducers/video.reducer";
import { channelDetailsReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comment.reducer";

// const initialState = {
//   name: "Haris",
//   age: "24",
// };
// const reducer = (initialState) => initialState;
const rootReducer = combineReducers({
  authh: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentsList: commentListReducer,
  relatedVideo: relatedVideoReducer,
  searchVideo: searchVideoReducer,
  subscriptionChannel: subscriptionChannelReducer,
});
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
