import { Checkbox, IconButton } from "@material-ui/core";
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RedoIcon from "@material-ui/icons/Redo";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SettingIcon from "@material-ui/icons/Settings";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "./emailList.css";
import EmailRow from "../emailRow/EmailRow";
import Section from "../section/Section";
import { useState, useEffect } from "react";

import { db } from "../../firebase-config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
const EmailList = () => {
  const mailCollectionRef = collection(db, "emails");
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    const q = query(mailCollectionRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setEmailList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  console.log(emailList);
  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingLeft">
          <Checkbox></Checkbox>
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList_settingRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardIcon />
          </IconButton>
          <IconButton>
            <SettingIcon />
          </IconButton>
        </div>
      </div>
      <div className="emailList__sections">
        <Section Icon={InboxIcon} title="primary" color="red" selected />
        <Section Icon={PeopleIcon} title="social" color="#1A73E8"></Section>
        <Section
          Icon={LocalOfferIcon}
          title="promotions"
          color="green"
        ></Section>
      </div>
      <div className="emailList__List">
        {/* <EmailRow
          title="Swetha"
          subject="hey this mail to test"
          description="this the mail description"
          time="10pm"
        ></EmailRow>
        <EmailRow
          title="Swetha"
          subject="hey this mail to test"
          description="this the mail description"
          time="10pm"
        ></EmailRow> */}

        {emailList &&
          emailList.map(({ id, data: { to, subject, message, timestamp } }) => (
            <EmailRow
              id={id}
              key={id}
              title={to}
              description={message}
              subject={subject}
              time={new Date(timestamp?.seconds * 1000).toUTCString()}
            ></EmailRow>
          ))}
      </div>
    </div>
  );
};

export default EmailList;
