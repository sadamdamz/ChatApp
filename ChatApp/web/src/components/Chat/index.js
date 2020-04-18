import React, { Component } from "react";
import io from "socket.io-client";
import SideBar from "./sidebar";
import Header from "./Header/header";
import Messages from "./messages/Messages";
import MessageInput from "./messageInput/MessageInput";

import "./index.css";

const socketUrl = "http://localhost:5000";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      currentUser: null,
    };
  }
  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      console.log("conected");
    });
    const token = localStorage.getItem('usertoken');
    socket.emit('fromUser',token);
    this.setState({ socket });
  };
  setUser=(to)=>{
    const {socket} = this.state
    socket.emit('clickedUser',to);
    this.setState({currentUser:to})
  }


  render() {
    const { socket, currentUser } = this.state;
    return (
      <div className="mainLayout">
        <div>
          <SideBar socket={socket} setUser={this.setUser}/>
        </div>
        <div className={`chatLayout ${currentUser ? '':'block'}`}>
          {currentUser ? (
            <React.Fragment>
              <div className="header">
                <Header userName={currentUser}/>
              </div>
              <div>
                <Messages />
              </div>
              <div>
                <MessageInput socket={socket} />
              </div>
            </React.Fragment>
          ) : (
            <div className="searchUser"><h1>Search for Users</h1></div>
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
