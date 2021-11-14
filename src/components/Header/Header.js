import React, { useState } from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdApps, MdNotifications } from "react-icons/md";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const Header = ({ handleToggle }) => {
  const [input, setinput] = useState("");

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`search/${input}`);
  };
  // const { photoURL } = useSelector((state) => state.authh?.user);

  return (
    <div className=" header">
      <FaBars className="header__menu" size={26} onClick={handleToggle} />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        className="header__img"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter something"
          onChange={(e) => setinput(e.target.value)}
          value={input}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className="header__icons">
        <MdApps size={28} />
        <MdNotifications size={28} />
        {/* <img src={photoURL} alt="mklmlkm" /> */}
      </div>
    </div>
  );
};

export default Header;
