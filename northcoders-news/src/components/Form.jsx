import React, { Component } from "react";
import Button from "./Button";
class Form extends Component {
  state = {
    body: ""
  };
  render() {
    // pass btnStyle = {} and destruct it here 
    const { name, className, func } = this.props.btnStyle;
    return (
      <form action="">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={this.handelChange}
        />
        <Button name={name} className={className} func={func} />
      </form>
    );
  }

  handelChange = event => {
    const body = event.target.value;
    this.setState({
      body
    });
  };
}

export default Form;
