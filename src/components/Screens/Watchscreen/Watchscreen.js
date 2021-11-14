import React, { useEffect } from "react";
import "./_watchscreen.scss";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import VideoMetaData from "../../VideoMetaData/VideoMetaData";
import VideoHorizontal from "../../VideoHorizontal/VideoHorizontal";
import Comments from "../../Comments/Comments";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  getRelatedVideos,
  getVideosById,
} from "./../../../Redux/actions/video.action";
import { useSelector } from "react-redux";
import { relatedVideoReducer } from "./../../../Redux/reducers/video.reducer";

const Watchscreen = () => {
  const { id } = useParams(); //id

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosById(id));
    dispatch(getRelatedVideos(id));
  }, [id, dispatch]);
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideo
  );
  return (
    <Row>
      <Col lg={8}>
        <div className="watchscreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowfullscrreen="true"
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading ...</h6>
        )}

        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!loading &&
          videos
            ?.filter((video) => video.snippet)
            .map((video) => {
              return <VideoHorizontal key={video.id.videoId} video={video} />;
            })}
        {/* <h1>lllllllllllllllllll</h1> */}
      </Col>
    </Row>
  );
};

export default Watchscreen;
