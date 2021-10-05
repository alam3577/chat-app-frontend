import { Route } from "react-router";
import "./App.css";
import Login from "./components/chat/Login";
import Chat from "./components/chat/Chat";

function App() {
  // socket.on("connection", (socket) => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });
  return (
    <>
      <Route strict exact path="/" component={Login} />
      <Route strict exact path="/chat/:name" component={Chat} />
    </>
  );
}

export default App;
