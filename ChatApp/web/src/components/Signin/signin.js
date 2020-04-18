import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import {register} from '../../axios/index';
import "./index.css";
import "antd/dist/antd.css";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

class Signin extends Component {
  constructor(props) {
    super(props);
  }

  onFinish = (values) => {
    register(values)
    .then(res=>{

    })
    this.props.history.push('/login');
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  componentDidMount(){
    localStorage.removeItem('usertoken')
  }

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
              label="UserId"
              name="userId"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
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
                  min: 6,
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
            <p className="redirectText">
              Already have a account?
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default Signin;
