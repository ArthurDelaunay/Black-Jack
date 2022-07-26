import React, { Component } from "react"
import DeckCards from "./components/DeckCards"
import deckCardsData from "./deckCards.json"

class App extends Component {
  constructor() {
    super()
    this.state = {
      deck: [...deckCardsData],
      start : ""
    }
  }
  handleClickButton = e =>{

    // const max = ?
    // const min = ?
  //  const random = Math.floor(Math.random() * max) + min
this.setState({image : "Bienvenue dans le jeu Black Jack"})

  }
  render() {
    return (
      <main>
        <ul>
          {this.state.deck.map((card) => {
            return (
              <li key={`${card.cardName}${card.color}`}>
                <DeckCards />
              </li>
            )
          })}
        </ul>
        <h2>{this.state.image}</h2>
        <button type="button" className="btn btn-outline-success" onClick={this.handleClickButton} >Start</button>
      </main>
    )
  }
}
export default App