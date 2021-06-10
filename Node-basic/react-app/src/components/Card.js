import React from "react";
class Card extends React.Component {
  render() {
    const { name, deg } = { ...this.props };
    return (
      <div className="card" style={style}>
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar"
          style={{ width: "100%" }}
        />
        <div className="container">
          <h4>
            <b>{name}</b>
          </h4>
          <p>{deg}</p>
        </div>
      </div>
    );
  }
}

const style = {
  marginLeft: "10px",
  display: "inline-block",
  marginTop: "10px",
};
export default Card;
