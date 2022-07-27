import React, { Component } from "react"

class Buttons extends Component {
  render() {
    return (
      <>
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
      </>
    )
  }
}
export default Buttons
