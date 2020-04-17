import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import {login} from "../../axios/index";
import auth from "../../components/auth"
import '../Signin/index.css'

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
  }
  onFinish = (values) => {
    login(values)
    .then(res=>{
        if(res.error){
            message.error('Email or Password is Wrong');
        }
        else{
            auth.login(() => {
                this.props.history.push("/chat");
              });
        }
    })
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div className="formWrapper">
        <div className="formInner">
          <Form
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            {...layout}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  type: "string",
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
