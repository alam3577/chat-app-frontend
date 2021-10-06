import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import MesssageBox from "../MessageBox";
import Online from "./Online";
let socket;

const ENDPOINT = "https://sajjad-chat-app.herokuapp.com/";
// const ENDPOINT = "http://localhost:5000/";

const Chat = (props) => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([]);
  const [id, setId] = useState("");
  const [online, setOnline] = useState([]);

  const { name } = useParams();

  const handleSend = () => {
    socket.emit("message", { message: value, id });
    setValue("");
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setId(socket.id);
    });
    socket.emit("new-user", { user: name });
    socket.on("joined", (data) => {
      setMessage([...message, data]);
    });

    // socket.on("joined-message", (data) => {
    //   setMessage([...message, data]);
    //   console.log(data.message);
    // });

    // socket.on("leave", (data) => {
    //   setMessage([...message, data]);
    //   console.log(data.message);
    // });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("onlineUser", (data) => {
      setOnline([...online, data.user]);
    });

    return () => {};
  }, [online]);

  useEffect(() => {
    socket.on("send-message", (data) => {
      setMessage([...message, data]);
    });
  }, [message]);
  console.log(message);
  let handleEnter = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      handleSend();
    }
  };
  return (
    <div className="main__chatt__container">
      <div className="message__container">
        <h2>Welcome to the chat {name}</h2>
        <ScrollToBottom className="scroll__container">
          {message.map((elem, i) => (
            <MesssageBox
              key={i}
              message={elem.message}
              user={elem.id === id ? "" : elem.user}
              mclass={elem.id === id ? "right" : "left"}
              allUser={elem.user}
            />
          ))}
        </ScrollToBottom>

        <div className="send__container">
          <input
            type="text"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            name=""
            id="keyss"
            onKeyUp={(e) => {
              handleEnter(e);
            }}
          />
          <button onClick={handleSend}>Send Message</button>
        </div>
      </div>
      <div className="online__user">
        <Online key users={online} />
      </div>
    </div>
  );
};

export default Chat;
