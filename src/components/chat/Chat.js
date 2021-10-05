import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import MesssageBox from "../MessageBox";
let socket;

const ENDPOINT = "https://sajjad-chat-app.herokuapp.com/";

const Chat = (props) => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([]);
  const [id, setId] = useState("");

  const { name } = useParams();

  const handleSend = () => {
    socket.emit("message", { message: value, id });
    setValue("");
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // alert(socket.id);
      setId(socket.id);
    });
    socket.emit("new-user", { user: name });
    socket.on("joined", (data) => {
      setMessage([...message, data]);
      console.log(data.message);
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
    socket.on("send-message", (data) => {
      setMessage([...message, data]);
    });

    return () => {};
  }, [message]);
  console.log(message);
  return (
    <div className="message__container">
      <h2>Welcome to the chat {name}</h2>
      <ScrollToBottom className="scroll__container">
        {message.map((elem, i) => (
          <MesssageBox
            key={i}
            message={elem.message}
            user={elem.id === id ? "" : elem.user}
            mclass={elem.id === id ? "right" : "left"}
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
          id=""
        />
        <button onClick={handleSend}>Send Message</button>
      </div>
    </div>
  );
};

export default Chat;
