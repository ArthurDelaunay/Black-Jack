import React, { Component } from "react"
import Card from "./Card"

class CroupierSide extends Component {
  render() {
    return (
      <section className="height_50p100 flex align-items-center justify-content-between padding-x-20p100">
        <p className="score-render flex justify-content-center align-items-center">
          {this.props.score}
        </p>
        <div className="flex gap-2">
          {this.props.hand.map((card) => {
            return (
              <Card key={`${card.cardName}${card.value}`} img={card.imageUrl} />
            )
          })}
        </div>
      </section>
    )
  }
}
export default CroupierSide
