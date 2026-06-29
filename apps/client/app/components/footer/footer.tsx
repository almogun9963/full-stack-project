import style from "./footer.module.scss";

const Footer = () => {
  return (
    <div
      className={style.footer}
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   flexDirection: "row",
      //   alignItems: "center",
      //   backgroundColor: "#000000",
      // }}
    >
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   flexDirection: "row",
      //   alignItems: "center",
      //   fontSize: "2rem",
      // }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lGpWDZTIt8UGqyUUvvYyfYOxVO6PduFNHuPNP9jtpg&s=10"
          alt="image of a sheep"
          width="45"
          height="50"
        ></img>
        <p>Drop Sheeping</p>
      </div>

      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   flexDirection: "row",
      //   alignItems: "center",
      //   fontSize: "10px",
      // }}
      >
        <p>kinbo - eCommerce Template @2021. Design by Templatecookie</p>
      </div>
    </div>
  );
};

export default Footer;
