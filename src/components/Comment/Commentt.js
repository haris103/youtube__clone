import React from "react";
import "./_commentt.scss";
import moment from "moment";

const Commentt = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  return (
    <div className="comment d-flex p-2">
      <img src={authorProfileImageUrl} className="rounded-circle mr-3" />
      <div className="comment__body mx-2">
        <p className="comment__header mb-0">
          {authorDisplayName} * {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Commentt;
