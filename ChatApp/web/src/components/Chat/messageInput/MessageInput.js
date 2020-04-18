import React, { Component } from "react";
import { Input, Button, Form } from "antd";
import "./index.css";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = (message) => {
    const {socket} = this.props;
    socket.emit('message',message)
  };
  onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  render() {
    return (
      <div className="MessageInput">
        <div className="Inputs">
          <Form
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            className="messageForm"
          >
            <Form.Item name="message">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="buttons">
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default MessageInput;
