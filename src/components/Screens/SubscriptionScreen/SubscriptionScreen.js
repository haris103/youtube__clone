import React, { useEffect } from "react";
import "./_subscription.scss";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getSubscriptionChannel } from "../../../Redux/actions/video.action";
import { useSelector } from "react-redux";
import { subscriptionChannelReducer } from "./../../../Redux/reducers/video.reducer";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../../VideoHorizontal/VideoHorizontal";

const SubscriptionScreen = () => {
  //   const { query } = useParams();
  // console.log("QUERY", query);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptionChannel());
  }, [dispatch]);
  const { loading, videos } = useSelector((state) => state.subscriptionChannel);

  return (
    <Container>
      {!loading ? (
        videos.map((video) => (
          <VideoHorizontal video={video} key={video.id} subScreen />
        ))
      ) : (
        <h1>Loading ...</h1>
      )}
    </Container>
  );
};

export default SubscriptionScreen;
