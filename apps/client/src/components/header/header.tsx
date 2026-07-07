import { useState } from "react";
import style from "./header.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      navigate(`/store?query=${encodeURIComponent(searchString)}`);
    }
  };

  return (
    <div className={style.headerBox}>
      <div className={style.upperText}>
        <img
          className={style.images}
          src="../../src/assets/Facebook.svg"
          alt="facebook logo"
        ></img>

        <img
          className={style.images}
          src="../../src/assets/Reddit.svg"
          alt="reddit logo"
        ></img>
        <img
          className={style.images}
          src="../../src/assets/Youtube.svg"
          alt="youtube logo"
        ></img>
        <img
          className={style.images}
          src="../../src/assets/Instagram.svg"
          alt="instagram logo"
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
            }}
            alt="cart logo"
          ></img>
          <img
            className={style.images}
            src="../../src/assets/Heart.svg"
            alt="heart logo"
          ></img>
          <img
            className={style.images}
            src="../../src/assets/User.svg"
            alt="person logo"
          ></img>
        </div>
        <div className={style.searchContainer}>
          <img
            className={style.searchIcon}
            src="../../src/assets/MagnifyingGlass.svg"
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
          <>🐑</>
          <p>Drop Sheeping</p>
        </div>
      </div>
    </div>
  );
};
export default Header;
