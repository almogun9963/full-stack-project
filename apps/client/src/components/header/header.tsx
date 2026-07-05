import style from "./header.module.scss";

const Header = () => {
  return (
    <div className={style.headerBox}>
      <div className={style.upperText}>
        <img
          src="../../src/assets/facebook.png"
          alt="facebook logo"
          width="30"
          height="35"
        ></img>

        <img
          src="../../src/assets/reddit.png"
          alt="reddit logo"
          width="30"
          height="35"
        ></img>
        <img
          src="../../src/assets/youtube.png"
          alt="youtube logo"
          width="30"
          height="35"
        ></img>
        <img
          src="../../src/assets/instegram.png"
          alt="instegram logo"
          width="30"
          height="35"
        ></img>
        <p> :עקבו אחרינו</p>
      </div>
      <div className={style.bottomText}>
        <div>
          <img
            src="../../src/assets/cart.png"
            alt="cart logo"
            width="30"
            height="35"
          ></img>
          <img
            src="../../src/assets/heart.png"
            alt="heart logo"
            width="30"
            height="35"
          ></img>
          <img
            src="../../src/assets/person.png"
            alt="person logo"
            width="30"
            height="35"
          ></img>
        </div>
        <textarea> חפשו כאן</textarea>
        <div className={style.bottomText}>
          <img
            src="../../src/assets/sheep.png"
            alt="image of a sheep"
            width="30"
            height="35"
          ></img>
          <p>Drop Sheeping</p>
        </div>
      </div>
    </div>
  );
};
export default Header;
