import React, { Component } from "react"

class Buttons extends Component {
  render() {
    return (
      <>
        <section className="downmenu height_16p100 flex align-items-center justify-content-center gap-40">
          <div className="tokens flex justify-content-center align-items-center">Current Bet: {this.props.bet}</div>
          <div className="playmenu">
            { this.props.status === "hit" && this.props.winner === "" && <button onClick={this.props.hit} className="menubutton"> 
              Hit
            </button> }
            { this.props.status === "bet" && <button onClick={this.props.minusTen} className="menubutton"> 
                -10
              </button> }
            { this.props.status === "" && <button onClick={this.props.play} className="menubutton">
              Play
            </button> }
            { this.props.status === "bet" && <button onClick={this.props.checkBet} className="menubutton">
              Bet
            </button> }
            { this.props.status === "hit" && this.props.winner === "" && <button onClick={this.props.stand} className="menubutton">
              Stand
            </button> }
            { this.props.status === "bet" && <button onClick={this.props.plusTen} className="menubutton"> 
                +10
              </button> }
            { this.props.winner !== "" && <button onClick={this.props.reset} className="menubutton">
              Restart
            </button> }
          </div>
          <div className="tokens flex justify-content-center align-items-center">Tokens: {this.props.tokens}</div>
        </section>
      </>
    )
  }
}
export default Buttons
