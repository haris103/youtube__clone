import React, { useEffect, useState } from "react";
import "./_videohorizontal.scss";
import { AiFillEye } from "react-icons/ai";
import requestt from "./../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      resourceId,
      thumbnails: { medium },
    },
  } = video;

  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  // const seconds = moment.duration("100").asSeconds();
  // const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const [views, setviews] = useState(null);
  const [duration, setduration] = useState(null);
  const _videoId = id?.videoId || id;

  // To get the channel duration & views
  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await requestt.get("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: id.videoId,
        },
      });
      // console.log("VideoDetails", items);
      setduration(items[0].contentDetails.duration);
      setviews(items[0].statistics.viewCount);
    };
    if (isVideo) get_video_details();
  }, [isVideo, id]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const [channelIcon, setchannelIcon] = useState(null);

  // to get the channel icon
  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await requestt.get("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      // console.log("Channel_Icon", items);
      setchannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const _channelId = resourceId?.channelId || channelId;

  const history = useHistory();
  const hadleClick = () => {
    {
      isVideo
        ? history.push(`/watch/${id.videoId}`)
        : history.push(`/channel/${_channelId}`);
    }
  };
  const thumbnail = !isVideo && "videohorizontal__thumbnail-channel";
  return (
    <Row
      className="videohorizontal mb-1 py-2 align-items-center"
      onClick={hadleClick}
    >
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videohorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videohorizontal__thumbnail ${thumbnail}`}
          wrapperClassName="videohorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videohorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className="videoHorizontal__right p-0"
      >
        <p className="videohorizontal__title mb-1">{title}</p>

        {isVideo && (
          <div className="videohorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views *
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {searchScreen ||
          (subScreen && (
            <p className="mt-1 videohorizontal__desc">{description}</p>
          ))}

        <div className="videohorizontal__channel d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}

          <p className="mb-0">{channelTitle}</p>
        </div>
        {subScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
