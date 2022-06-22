import { async } from "@firebase/util";
import { Button, useScrollTrigger } from "@material-ui/core";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth, provider } from "../../firebase-config";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider).then((user) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://1000logos.net/wp-content/uploads/2018/05/Gmail-Logo-768x432.jpg"></img>
        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
