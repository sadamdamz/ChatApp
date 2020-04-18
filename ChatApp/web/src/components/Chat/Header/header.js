import React, { Component } from 'react';
import './index.css'

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        return (
            <div className="Header">
                <p>{this.props.userName}</p>
            </div>
        );
    }
}

export default Header;