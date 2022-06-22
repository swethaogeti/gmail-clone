import { Checkbox, IconButton } from "@material-ui/core";
import React from "react";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import LabelImportantOutlinedIcon from "@material-ui/icons/LabelImportantOutlined";
import "./emailRow.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMail } from "../../features/mailSlice";
const EmailRow = ({ id, title, subject, description, time }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMail = () => {
    dispatch(
      selectMail({
        id,
        title,
        subject,
        description,
        time,
      })
    );

    navigate("/mail");
  };

  return (
    <div onClick={openMail} className="emailRow">
      <div className="emailRow__options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
      </div>
      <div className="emailRow__title">
        <h3>{title}</h3>
      </div>
      <div className="emailRow__subject">
        <h4>
          {subject}{" "}
          <span className="emailRow__description">- {description}</span>
        </h4>
      </div>
      <div className="emailRow__time">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default EmailRow;
