import React, { Component } from "react";
import "./index.css";
import io from "socket.io-client";
import Signin from "./components/Signin/signin";
import Login from "./components/Login/login"
import Chat from './components/Chat/index'
import { ProtectedRoute } from './components/protectedRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const socketUrl = "http://localhost:5000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
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
    this.setState({ socket });
  };

  render() {
    return (
      <Router>
        <Redirect from="/" to="/signin" />
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/chat" component={Chat}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
