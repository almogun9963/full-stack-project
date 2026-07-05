import style from "./signup.module.scss";
import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

const SIGN_UP_MUTATION = gql`
  mutation signUp($userName: String!, $password: String!) {
    signUp(signUpInput: { userName: $userName, password: $password }) {
      id
      userName
      accessToken
      refreshToken
    }
  }
`;

export default function SignUp() {
  const [userName, setUserName] = useState("almog2");
  const [password, setPassword] = useState("!Aa1111111");
  const navigate = useNavigate();
  const [signUp] = useMutation(SIGN_UP_MUTATION);
  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signUp({
        variables: {
          userName: userName,
          password: password,
        },
      });
      navigate("/store");
    } catch (err) {
      alert("couldnt signUp, with error: " + err);
    }
  };

  return (
    <>
      <div className={style.text}>
        <img
          src="../../src/assets/sheep.png"
          alt="image of a sheep"
          width="30"
          height="35"
        />
        <p> Drop Sheeping</p>
      </div>

      <div className={style.formBox}>
        <p className={style.loginText}>הרשמה</p>

        <form className={style.form}>
          <div className={style.formGroup}>
            <label>:שם משתמש</label>
            <input
              className={style.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className={style.formGroup}>
            <label>:סיסמא</label>
            <input
              className={style.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.buttonsArea}>
            <button
              type="submit"
              className={style.button}
              onClick={handleSignUp}
            >
              &#8592; הרשמה
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
