import React, { Component } from "react"
import DeckCards from "./components/DeckCards"
import deckCardsData from "./deckCards.json"
import CroupierSide from "./components/CroupierSide"
import PlayerSide from "./components/PlayerSide"
import _ from "lodash"
import "./reset.css"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      deck: _.shuffle([...deckCardsData]),
      cardDeal: {},
      image: ""
    }
  }
  handleClickButton = e =>{

    // const max = ?
    // const min = ?
  //  const random = Math.floor(Math.random() * max) + min
this.setState({image : "Bienvenue dans le jeu Black Jack"})

  }
reset = () =>{
  location.reload()
}

  cardDistribution = () => {
    const clonedDeck = [...this.state.deck]
    const cardDeal = clonedDeck.pop()
    this.setState({
      deck: clonedDeck,
      cardDeal: cardDeal,
    })
  }

  startTurn = () => {
    this.cardDistribution(() => {})
  }

  render() {
    return (
      <main>
        <button onClick={this.startTurn}>CLick Click</button>
        {/* <ul>
          {this.state.deck.map((card) => {
            return (
              <li key={`${card}${card.color}`}>
                <DeckCards card={card} />
              </li>
            );
          })}
        </ul> */}
        {/* {this.state.deck.map((card) => {
          return <img src={card.imageUrl} alt="" width={70} height={100} />
        })} */}
        <button type="button" class="btn btn-success"onClick={this.handleClickButton}>Start</button>
        <button type="button" class="btn btn-warning" onClick={this.reset}>Replay Game</button>
      </main>
    )
  }
}
export default App
