import React, { Component } from "react"

class Buttons extends Component {
  render() {
    return (
      <>
        <section className="downmenu height_16p100 flex align-items-center justify-content-center">
          <div className="playmenu">
            { this.props.status === "hit" && this.props.winner === "" && <button onClick={this.props.hit} className="menubutton"> 
              Hit
            </button> }
            { this.props.status === "" && <button onClick={this.props.play} className="menubutton">
              Play
            </button> }
            { this.props.status === "hit" && this.props.winner === "" && <button onClick={this.props.stand} className="menubutton">
              Stand
            </button> }
            { this.props.winner !== "" && <button onClick={this.props.play} className="menubutton">
              Restart
            </button> }
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
