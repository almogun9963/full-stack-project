import { useState } from "react";
import style from "./header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Facebook from "../../assets/Facebook.svg?react";
import Heart from "../../assets/Heart.svg?react";
import Instagram from "../../assets/Instagram.svg?react";
import MagnifyingGlass from "../../assets/MagnifyingGlass.svg?react";
import Reddit from "../../assets/Reddit.svg?react";
import ShoppingCartSimple from "../../assets/ShoppingCartSimple.svg?react";
import Youtube from "../../assets/Youtube.svg?react";
import User from "../../assets/User.svg?react";

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
        <Facebook className={style.images}></Facebook>
        <Reddit className={style.images}></Reddit>
        <Youtube className={style.images}></Youtube>
        <Instagram className={style.images}></Instagram>
        <p> :עקבו אחרינו</p>
      </div>
      <div className={style.bottomText}>
        <div>
          <ShoppingCartSimple
            onClick={() => {
              navigate("/cart");
            }}
            className={style.images}
          ></ShoppingCartSimple>
          <Heart className={style.images}></Heart>
          <User className={style.images}></User>
        </div>
        <div className={style.searchContainer}>
          <MagnifyingGlass className={style.images}></MagnifyingGlass>
          <textarea
            className={style.textArea}
            placeholder="חפשו כאן"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onKeyDown={onEnterPress}
          ></textarea>
        </div>
        <div className={style.bottomText}>
          <>🐑 Drop Sheeping</>
        </div>
      </div>
    </div>
  );
};
export default Header;
