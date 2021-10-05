import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleClick = (e) => {
    e.preventDefault();
    if (this.state.name) {
      this.props.history.push(`/chat/${this.state.name}`);
    }
  };
  render() {
    return (
      <div className="login__container">
        <h2>Welcome To the Chat Application</h2>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Enter Your Name"
          name=""
          id=""
        />
        <button onClick={this.handleClick}>Click To Enter Chat Room</button>
      </div>
    );
  }
}
