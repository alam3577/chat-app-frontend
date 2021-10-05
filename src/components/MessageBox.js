import React from "react";

function Message({ message, user, mclass }) {
  if (user) {
    return (
      <>
        <div className={`messageBox ${mclass}`}>{`${user}: ${message}`}</div>
      </>
    );
  } else {
    return <div className={`messageBox ${mclass}`}>{message}</div>;
  }
}

export default Message;
