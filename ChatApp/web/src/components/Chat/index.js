import React, { Component } from "react";
import SideBar from "./sidebar";

import "./index.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="mainLayout">
        <SideBar />
      </div>
    );
  }
}

export default Chat;
