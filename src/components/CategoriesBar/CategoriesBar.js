import React, { useState } from "react";
import "./_categoriesBar.scss";
import { useDispatch } from "react-redux";
import { getVideosByCategory } from "../../Redux/actions/video.action";
import { getVideos } from "./../../Redux/actions/video.action";
const keywords = [
  "All",
  "ReactJS",
  "Vue JS",
  "Java",
  "Python",
  "Ruby",
  "MERN",
  "MEAN",
  "Angular",
  "Javascript",
  "HTML",
  "CSS",
  "Bootstrap",
  "PHP",
  "Wordpress",
  "Haris",
  "Web Development",
  "Frontend Development",
  "Backend Development",
  "Responsive",
];

const CategoriesBar = () => {
  const dispatch = useDispatch();
  const [activee, setactive] = useState("All");

  const handleactive = (m) => {
    setactive(m);
    if (m === "All") {
      dispatch(getVideos(m));
    } else {
      dispatch(getVideosByCategory(m));
    }
  };

  return (
    <div className="categoriesbar">
      {keywords.map((valuee, i) => {
        return (
          <span
            key={i}
            onClick={() => handleactive(valuee)}
            className={activee === valuee ? "active" : ""}
          >
            {valuee}
          </span>
        );
      })}
    </div>
  );
};

export default CategoriesBar;
