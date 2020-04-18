import React, { Component } from "react";
import { Input } from "antd";
import { search } from "../../axios/index";
import jwt_decode from "jwt-decode";
import './index.css'

const {Search} = Input

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      profile:''
    };
  }

  searchUser = (value) => {
    search(value).then((res) => {
        if(res.length > 0 ){
            this.setState({ user: res });
        }
        else{
            this.setState({user:''})
        }
    });
  };
  componentDidMount() {
    const token = localStorage.getItem('usertoken');
    const decoded = jwt_decode(token);
    this.setState({
        profile:decoded.userId
    })
  }

  render() {
    return (
      <div className="sideBar">
        <div className="searchBar">
        <div><h4 style={{color:'white'}}>user:{this.state.profile}</h4></div>
          <Search
            placeholder="input search text"
            onSearch={this.searchUser}
          />
        </div>
        {
            this.state.user!=='' ? <div key={this.state.user[0].userId} className="user"><h1>{this.state.user[0].userId}</h1></div>:''
        }
      </div>
    );
  }
}

export default SideBar;
