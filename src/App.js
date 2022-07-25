import React, { Component } from "react"
import DeckCards from "./components/DeckCards"
import deckCardsData from "./deckCards.json"

class App extends Component {
  constructor() {
    super()
    this.state = {
      deck: [...deckCardsData],
    }
  }
  handleClickButton = () =>{
    const max = 2
    const min = 1
   const random = Math.floor(Math.random() * max) + min
if(random === min ){
console.log("voici tes deux cartes IA")
}
else{
  console.log("Prend les tiens joueur");
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
        <button type="button" class="btn btn-outline-success" onClick={this.handleClickButton}>Start</button>
      </main>
    )
  }
}
export default App