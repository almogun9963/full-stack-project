import style from "./login.module.scss";

export default function Login() {
  return (
    <>
      <div className={style.text}>
        <img
          src="../../src/assets/sheep.png"
          alt="image of a sheep"
          width="45"
          height="50"
        ></img>
        <p>Drop Sheeping</p>
      </div>
      <div className={style.formBox}>
        <p className={style.loginText}>התחברות</p>
        <form className={style.form}>
          <div className={style.formGroup}>
            <label>:שם משתמש</label>
            <input className={style.input} />
          </div>

          <div className={style.formGroup}>
            <label>:סיסמא</label>
            <input className={style.input} />
          </div>

          <button className={style.button} type="submit">
            &#8592; כניסה
          </button>
        </form>
      </div>
    </>
  );
}
