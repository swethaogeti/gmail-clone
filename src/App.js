import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Mail from "./components/mail/Mail";
import EmailList from "./components/emailList/EmailList";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import SendMail from "./components/sendmail/SendMail";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, selectUser } from "./features/userSlice";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);

  return (
    <BrowserRouter>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/" element={<EmailList />}></Route>
              <Route path="/mail" element={<Mail />}></Route>
            </Routes>
          </div>
          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
