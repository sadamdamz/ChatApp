import React, { Component } from 'react';
import './index.css';
import io from 'socket.io-client';

const socketUrl = "http://192.168.43.20:5000";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      socket:null
    }
  }

  componentDidMount(){
    this.initSocket();
  }

  initSocket = () =>{
  const socket = io(socketUrl);
  socket.on('connect', () =>{
    console.log('conected');
  })
  this.setState({socket})
}

render(){
  return (
    <div className="App">
      <h>hello</h>
    </div>
  );
}
}

export default App;
