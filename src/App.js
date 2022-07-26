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
      start : ""
    }
  }
  handleClickButton = e =>{

    // const max = ?
    // const min = ?
  //  const random = Math.floor(Math.random() * max) + min
this.setState({image : "Bienvenue dans le jeu Black Jack"})

  }
reset = ()=>{
  location.reload();
}

  render() {
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
        <h2>{this.state.image}</h2>
        <button type="button" class="btn btn-success"onClick={this.handleClickButton}>Start</button>
        <button type="button" class="btn btn-warning"onClick={this.reset}>Replay Game</button>

      </main>
    )
  }
}
export default App
