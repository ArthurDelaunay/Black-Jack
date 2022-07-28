import React, { Component } from "react"
import Card from "./Card"

class PlayerSide extends Component {
  render() {
    return (
      <section className="height_50p100 flex align-items-center justify-content-between padding-x-20p100">
        <div className="flex gap-2">
          {this.props.hand.map((card) => {
            return (
              <Card key={`${card.color}${card.value}`} img={card.imageUrl} />
            )
          })}
        </div>
        <p className="score-render flex justify-content-center align-items-center">
          {this.props.score}
        </p>
      </section>
    )
  }
}

export default PlayerSide
