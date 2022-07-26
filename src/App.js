import React, { Component } from "react"
import Card from "./components/Card"
import DeckCards from "./components/DeckCards"
import deckCardsData from "./deckCards.json"

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
        <Card />
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