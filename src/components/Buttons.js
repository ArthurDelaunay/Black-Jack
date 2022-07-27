import React, { Component } from "react"

class Buttons extends Component {
  render() {
    return (
      <>
        <section className="downmenu height_16p100 flex align-items-center justify-content-center">
          <div className="playmenu">
            <button onClick={this.props.hit} className="menubutton">
              Hit
            </button>
            <button onClick={this.props.play} className="menubutton">
              Play
            </button>
            <button onClick={this.props.stand} className="menubutton">
              Stand
            </button>
          </div>
          {/* <div className="betmenu" style={{ display: "none" }}>
            <button onClick={this.handleJetonMinus} className="menubutton">
              -10
            </button>
            <button className="menubutton">Play</button>
            <button className="menubutton">+10</button>
          </div> */}
        </section>
      </>
    )
  }
}
export default Buttons
