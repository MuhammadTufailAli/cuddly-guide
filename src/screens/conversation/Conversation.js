import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import "./conversation.css";

function Conversation({ conversation, currentUser, lastMessage }) {
  const [user, setUser] = useState(null);

  console.log(currentUser);

  const getfriends = (friendId) => {
    axios
      .get(`http://localhost:3000/users/singleUser/${friendId}`)
      .then((res) => {
        console.log(res.data.data.doc);
        setUser(res.data.data.doc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    var friendId = conversation.members.find((m) => m !== currentUser);
    console.log(friendId);

    getfriends(friendId);
  }, []);

  if (!user) {
    return (
      <div>
        <p>Please wait</p>
      </div>
    );
  } else {
    const url = "/Backend/public/images/users/" + user?.photo;
    return (
      <div className="conversationContainer">
        <img
          className="FriendPhoto"
          src="https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg"
          alt="No photo"
        />
        <div className="TextOfConversation">
          <p style={{ fontWeight: "bold" }}>{user?.name}</p>
          <p className="ReceivedMessage">{lastMessage}</p>
        </div>
      </div>
    );
  }
}

export default Conversation;
