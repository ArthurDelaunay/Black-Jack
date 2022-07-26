import React, { Component } from "react"
import DeckCards from "./components/DeckCards"
import deckCardsData from "./deckCards.json"
import "./reset.css"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      deck: [...deckCardsData],
    }
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
      </main>
    )
  }
}
export default App