import React, { Component } from "react"
import Card from "./Card"

class CroupierSide extends Component {
  render() {
    return (
      <section className="height_50p100 flex align-items-center justify-content-between padding-x-20p100">
        {this.props.gameStatus === "" && (
          <>
            <p className="score-render flex justify-content-center align-items-center">
              {this.props.score}
            </p>

            <div className="flex gap-2">
              {this.props.hand.map((card) => {
                return (
                  <Card
                    key={`${card.color}${card.value}`}
                    img={card.imageUrl}
                  />
                )
              })}
            </div>
          </>
        )}

        {this.props.gameStatus === "hit" && (
          <>
            <p className="score-render flex justify-content-center align-items-center"></p>
            <div className="flex gap-2">
              {this.props.hand.map((card) => {
                return (
                  <Card
                    key={`${card.color}${card.value}`}
                    img={"./assets/img/back-red.png"}
                  />
                )
              })}
            </div>
          </>
        )}
      </section>
    )
  }
}
export default CroupierSide
