import React from "react";
import "./sendMail.css";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
const SendMail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const mailCollectionRef = collection(db, "emails");
  const onSubmit = async (formData) => {
    // console.log(formData);
    await addDoc(mailCollectionRef, {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
    });
    dispatch(closeSendMessage());
  };
  const dispatch = useDispatch();

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        ></CloseIcon>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To"
          type="text"
          {...register("to", { required: true })}
        ></input>
        {errors.to && <p className="sendMail__error">to is required!</p>}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        ></input>
        {errors.subject && (
          <p className="sendMail__error">Subject is required!</p>
        )}
        <input
          name="message"
          placeholder="Message..."
          type="text"
          {...register("message", { required: true })}
          className="sendMail__message"
        ></input>
        {errors.message && (
          <p className="sendMail__error">Message is required!</p>
        )}
        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
