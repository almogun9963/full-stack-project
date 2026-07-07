import { useState } from "react";
import style from "./header.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState("");

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      navigate("/store");

      setSearchParams({ query: searchString });
    }
  };

  return (
    <div className={style.headerBox}>
      <div className={style.upperText}>
        <img
          className={style.images}
          src="../../src/assets/facebook.png"
          alt="facebook logo"
        ></img>

        <img
          className={style.images}
          src="../../src/assets/reddit.png"
          alt="reddit logo"
        ></img>
        <img
          className={style.images}
          src="../../src/assets/youtube.png"
          alt="youtube logo"
        ></img>
        <img
          className={style.images}
          src="../../src/assets/instegram.png"
          alt="instegram logo"
        ></img>
        <p> :עקבו אחרינו</p>
      </div>
      <div className={style.bottomText}>
        <div>
          <img
            className={style.images}
            src="../../src/assets/ShoppingCartSimple.svg"
            onClick={() => {
              navigate("/cart");
              setSearchParams();
            }}
            alt="cart logo"
          ></img>
          <img
            className={style.images}
            src="../../src/assets/heart.png"
            alt="heart logo"
          ></img>
          <img
            className={style.images}
            src="../../src/assets/person.png"
            alt="person logo"
          ></img>
        </div>
        <div className={style.searchContainer}>
          <img
            className={style.searchIcon}
            src="../../src/assets/MagnifyingGlass.png"
            alt="search logo"
          ></img>
          <textarea
            className={style.textArea}
            placeholder="חפשו כאן"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onKeyDown={onEnterPress}
          ></textarea>
        </div>
        <div className={style.bottomText}>
          <img
            className={style.images}
            src="../../src/assets/sheep.png"
            alt="image of a sheep"
          ></img>
          <p>Drop Sheeping</p>
        </div>
      </div>
    </div>
  );
};
export default Header;
