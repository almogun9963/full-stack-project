import style from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={style.footerBox}>
      <div className={style.footerUpperText}>
        <>🐑</>
        <p>Drop Sheeping</p>
      </div>

      <div className={style.footerBottomText}>
        <p>kinbo - eCommerce Template @2021. Design by Templatecookie</p>
      </div>
    </div>
  );
};

export default Footer;
