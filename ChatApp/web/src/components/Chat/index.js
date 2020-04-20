import React, { Component } from "react";
import io from "socket.io-client";
import SideBar from "./sidebar";
import Header from "./Header/header";
import { chats } from "../../axios/index"
import { Input, Button, Form,Spin } from "antd";

import "./index.css";

const socketUrl = "http://localhost:5000";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      reciever: null,
      chats: [],
      sender: null,
      loader:false
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
    const token = localStorage.getItem("usertoken");
    socket.emit("fromUser", token);
    this.setState({ socket });
    socket.on("userConnected", (userId) => {
      this.setState({ sender: userId });
    });
  };

  setUser = (to) => {
    const { socket } = this.state;
    socket.emit("clickedUser", to);
    this.setState({ reciever: to });
    const sender = this.state.sender;
    const reciever = to;
    this.setState({loader:true})
    chats(sender,reciever).then((res) => {
      this.setState({chats:res})
      this.setState({loader:false})
      console.log("chats fetched to state"+ this.state.chats.userId)
    });
  };

  onFinish = (message) => {
    const Message = message.message;
    const reciever = this.state.reciever;
    const sender = this.state.sender;
    const { socket } = this.state;
    socket.emit("message", message);
    socket.emit("sendMessage", sender, reciever, Message);
    socket.on('liveMessage',(data)=>{
      console.log(`live socket data message ${data}`)
    })
    socket.on('recieveMessage',(data)=>{
      this.setState({ chats: [...this.state.chats,data] });
    })
  };

  onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  render() {
    const { socket, reciever, chats,sender } = this.state;
    console.log(chats)
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
                  {this.state.loader?<Spin size="large"/>:chats.length>0?chats.map((msg, index) => (
                    <div
                      style={{
                        textAlign: sender === msg.from ? "right" : "left",
                        padding:'1rem'
                      }}className={`${sender === msg.from ? 'sender':'reciever'}`}
                      key={index}
                    >
                      <span>{msg.message}</span>
                    </div>
                  )):''}
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
