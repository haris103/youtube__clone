import React, { useEffect, useState } from "react";
import "./_video.scss";
import { AiFillEye } from "react-icons/ai";
import requestt from "./../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useHistory } from "react-router";

const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

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
          id: _videoId,
        },
      });
      // console.log("VideoDetails", items);
      setduration(items[0].contentDetails.duration);
      setviews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [_videoId]);
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

  const history = useHistory();
  const handleVideoClick = () => {
    history.push(`/watch/${_videoId}`);
    // history.push("/watch/:id");
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        {/* <img src={medium.url} /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views
        </span>
        <span> {moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__channel">
        {/* <img src={channelIcon?.url} /> */}
        <LazyLoadImage src={channelIcon?.url} effect="blur" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Video;
