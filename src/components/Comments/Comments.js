import React, { useEffect, useState } from "react";
import Commentt from "../Comment/Commentt";
import "./_comments.scss";
import { useDispatch } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "./../../Redux/actions/comment.action";
import { useSelector } from "react-redux";

const Comments = ({ videoId, totalComments }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [dispatch, videoId]);

  const comments = useSelector((state) => state.commentsList.comments);
  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    dispatch(addComment(videoId, text));
    setText("");
  };
  const { photoURL } = useSelector((state) => state.authh?.user);

  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img src={photoURL} className="ronded-circle mr-3" />
        <form onSubmit={handleComment} className="d-flex flex-grow-1 mx-1">
          <input
            type="text"
            placeholder="Enter the comment"
            className="flex-grow-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-0 p-2 ">Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, i) => {
          return <Commentt comment={comment} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
