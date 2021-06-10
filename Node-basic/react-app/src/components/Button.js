import React, { Component } from "react";

export default class Button extends Component {
  render() {
    const { onclick, label } = this.props;
    return (
      <div>
        <button onClick={onclick}>{label}</button>
      </div>
    );
  }
}
