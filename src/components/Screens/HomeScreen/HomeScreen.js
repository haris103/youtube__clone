import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../CategoriesBar/CategoriesBar";
import Video from "../../Video/Video";
import { useDispatch } from "react-redux";
import {
  getVideos,
  getVideosByCategory,
} from "./../../../Redux/actions/video.action";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Header from "./../../Header/Header";
import SkeletonVideo from "../../Skeletons/SkeletonVideo";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );
  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };
  return (
    <Container>
      <CategoriesBar />
      {/* <Row> */}
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-primary d-block m-auto"></div>
        }
      >
        <Row>
          {/* {!loading
            ? videos.map((video, id) => (
                <Col lg={3} md={4} key={id}>
                  <Video video={video} />
                </Col>
              ))
            : [...Array(20)].map(() => {
                <Col lg={3} md={4}>
                  <Skeleton width="100%" height={180} />
                </Col>;
              })} */}

          {videos.map((video, id) => (
            <Col lg={3} md={4} key={id}>
              <Video video={video} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
      {/* </Row> */}
    </Container>
  );
};

export default HomeScreen;
