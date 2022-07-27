import React, { Component } from "react"

class PlayerSide extends Component {
  render() {
    return (
      <section className="height_50p100">
        {/* <span>You bet</span> */}
        <div className="player_card"></div>

        <div className="jetons"></div>

        <div className="downmenu">
          <div className="betmenu" style={{ display: "none" }}>
            <button onClick={this.handleJetonMinus} className="menubutton">
              -10
            </button>
            <button className="menubutton">Play</button>
            <button className="menubutton">+10</button>
          </div>
          <div className="playmenu" style={{ display: "flex" }}>
            <button className="menubutton">Hit</button>
            <button className="menubutton">Play</button>
            <button className="menubutton">Stand</button>
          </div>
        </div>
      </section>
    )
  }
}

export default PlayerSide
