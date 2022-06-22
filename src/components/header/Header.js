import React from "react";
import "./header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationIcon from "@material-ui/icons/Notifications";
import { Avatar } from "@material-ui/core";
import { logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
const Header = () => {
  const user = useSelector(selectUser);
  console.log(logout);
  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      await signOut(auth).then(() => dispatch(logout()));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <MenuIcon></MenuIcon>
        </IconButton>

        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"></img>
      </div>
      <div className="header__middle">
        <IconButton>
          <SearchIcon></SearchIcon>
        </IconButton>
        <input placeholder="Search mail"></input>
        <IconButton>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </IconButton>
      </div>
      <div className="header__right">
        <IconButton>
          <AppsIcon></AppsIcon>
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        <Avatar onClick={logOut} src={user.photoUrl}>
          {user?.photoUrl}
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
