import style from "./header.module.scss";

const Header = () => {
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
            src="../../src/assets/cart.png"
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
            src="../../src/assets/search.png"
            alt="search logo"
          ></img>
          <textarea
            className={style.textArea}
            placeholder="חפשו כאן"
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
