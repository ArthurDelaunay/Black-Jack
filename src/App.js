import React, { Component } from "react"
// import DeckCards from "./components/DeckCards"
import deckCardsData from "./deckCards.json"
import "./App.css"
import PlayerSide from "./components/PlayerSide"

class App extends Component {
  constructor() {
    super()
    this.state = {
      deck: [...deckCardsData],
    }
  }
  render() {
    console.log(this)
    return (
      <main>
        {/* <ul>
          {this.state.deck.map((card) => {
            return (
              <li key={`${card}${card.color}`}>
                <DeckCards card={card} />
              </li>
            );
          })}
        </ul> */}
        {this.state.deck.map((card) => {
          console.log(card.imageUrl)
          return <img src={card.imageUrl} alt="" width={70} height={100} />
        })}

        <PlayerSide cards={this.state.deck} />
      </main>
    )
  }
}
export default App
