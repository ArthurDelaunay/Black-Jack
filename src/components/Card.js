import React, { Component } from "react"

class Card extends Component {
  render() {
    return (
      <>
        <img src={this.props.img} alt="card" height={150} width="auto" />
      </>
    )
  }
}

export default Card
