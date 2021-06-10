import { Component } from "react";
import Button from "../components/Button";
class Counter extends Component {
  state = {
    counter: 0,
  };

  handleIncrease = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  handleDecrease = () => {
    this.setState({ counter: this.state.counter - 1 });
  };
  render() {
    return (
      <div style={{ float: "right" }}>
        <h1>{this.state.counter}</h1>
        <Button onclick={this.handleIncrease} label="Increase" />
        <Button onclick={this.handleDecrease} label="Decrease" />
      </div>
    );
  }
}

export default Counter;
