import { useNavigate } from "react-router-dom";
import style from "./login.module.scss";
import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const SIGN_IN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(signInInput: { username: $username, password: $password }) {
      id
      userName
      accessToken
      refreshToken
    }
  }
`;

export default function Login() {
  const [userName, setUserName] = useState("almog2");
  const [password, setPassword] = useState("!Aa1111111");
  const navigate = useNavigate();

  const [signIn] = useMutation(SIGN_IN_MUTATION);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signIn({
        variables: {
          username: userName,
          password: password,
        },
      });

      navigate("store");
    } catch (err) {
      alert("couldnt login, with error: " + err);
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
        <p className={style.loginText}>התחברות</p>

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

          <button type="submit" className={style.button} onClick={handleSignIn}>
            &#8592; כניסה
          </button>
        </form>
      </div>
    </>
  );
}
