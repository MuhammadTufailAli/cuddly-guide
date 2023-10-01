import React from "react";
import "./message.css";

import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div className="Messagediv">
      {own ? (
        <div className="Owndiv">
          <p className="OwndivText">{message.text}</p>
          <p className="MessageTime">{format(message.createdAt)}</p>
        </div>
      ) : (
        <div className="Otherdiv">
          <p className="OtherDivText">{message.text}</p>
          <p className="MessageTime">{format(message.createdAt)}</p>
        </div>
      )}
    </div>
  );
}

export default Message;
