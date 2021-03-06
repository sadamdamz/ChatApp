import React, { Component } from "react";
import io from "socket.io-client";
import SideBar from "./sidebar";
import Header from "./Header/header";
import jwt_decode from "jwt-decode";
import { chats } from "../../axios/index";
import { Input, Button, Form, Spin } from "antd";

import "./index.css";

const socketUrl = "http://localhost:5000";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      reciever: null,
      chats: [],
      insertedIds: [],
      sender: null,
      loader: false,
      newinsert:[]
    };
  }
  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    const token = localStorage.getItem("usertoken");
    socket.emit("fromUser", token);
    this.setState({ socket });
  };

  setUser = to => {
    const { socket } = this.state;
    socket.emit("clickedUser", to);
    this.setState({ reciever: to });
    const tokens = localStorage.getItem("usertoken");
    const token = jwt_decode(tokens);
    const sender = token.userId;
    this.setState({ sender });
    const reciever = to;
    this.setState({ loader: true });
    chats(sender, reciever).then(res => {
      this.setState({ chats: res });
      this.setState({ loader: false });
    });
  };

  onFinish = message => {
    const Message = message.message;
    const reciever = this.state.reciever;
    const sender = this.state.sender;
    const { socket } = this.state;
    socket.emit("sendMessage", sender, reciever, Message);
    socket.on("recieveMessage", data => {
      if (this.state.insertedIds.indexOf(data["_id"]) === -1) {
        this.setState({
          chats: this.state.chats.concat(data),
          insertedIds: this.state.insertedIds.concat(data["_id"])
        });
      }
    });
    socket.on("newmessages", data => {
      console.log(
        'user messaging using live chat'
      )
      if (this.state.newinsert.indexOf(data["_id"]) === -1) {
        this.setState({
          chats: this.state.chats.concat(data),
          insertedIds: this.state.newinsert.concat(data["_id"])
        });
      }
    });
  };

  onFinishFailed = errorInfo => {
    console.log(errorInfo);
  };

  render() {
    const { socket, reciever, chats, sender } = this.state;
    return (
      <div className="mainLayout">
        <div>
          <SideBar socket={socket} setUser={this.setUser} />
        </div>
        <div className={`chatLayout ${reciever ? "" : "block"}`}>
          {reciever ? (
            <React.Fragment>
              <div className="header">
                <Header userName={reciever} />
              </div>
              <div>
                <div className="Messages">
                  {this.state.loader ? (
                    <Spin size="large" />
                  ) : chats.length > 0 ? (
                    chats.map((msg, index) => (
                      <div
                        style={{
                          textAlign: sender === msg.from ? "right" : "left",
                          padding: "1rem"
                        }}
                        className={`${
                          sender === msg.from ? "sender" : "reciever"
                        }`}
                        key={index}
                      >
                        <span>{msg.message}</span>
                      </div>
                    ))
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <div className="MessageInput">
                  <div className="Inputs">
                    <Form
                      name="basic"
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}
                      className="messageForm"
                    >
                      <Form.Item name="message">
                        <Input
                          placeholder="Type Something Here"
                          style={{ height: "3rem", background: "#bdbdbd82" }}
                        />
                      </Form.Item>
                      <Form.Item>
<Button
                          type="primary"
                          htmlType="submit"
                          className="buttons"
                        >
                          Send
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="searchUser">
              <h1>Search for Users</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Chat;