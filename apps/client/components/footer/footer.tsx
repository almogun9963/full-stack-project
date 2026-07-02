import style from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={style.footerBox}>
      <div className={style.footerUpperText}>
        <img
          src="../../src/assets/sheep.png"
          alt="image of a sheep"
          width="30"
          height="35"
        ></img>
        <p>Drop Sheeping</p>
      </div>

      <div className={style.footerBottomText}>
        <p>kinbo - eCommerce Template @2021. Design by Templatecookie</p>
      </div>
    </div>
  );
};

export default Footer;
