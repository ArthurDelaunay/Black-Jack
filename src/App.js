import React, { Component } from "react"
// import DeckCards from "./components/DeckCards"
import deckCardsData from "./deckCards.json"
import CroupierSide from "./components/CroupierSide"

import _ from "lodash"
import "./reset.css"
import "./App.css"
import PlayerSide from "./components/PlayerSide"

class App extends Component {
  constructor() {
    super()
    this.state = {
      deck: _.shuffle([...deckCardsData]),
      cardDeal: {},
      playerHand: [],
      croupierHand: [],
      resultPlayer: 0,
      resultCroupier: 0,
      jeton: 100,
      jetonBet: 0
    }
  }

  cardDistributionPlayer = () => {
    const clonedDeck = [...this.state.deck]
    const cardDeal = clonedDeck.pop()

    const clonePlayerHand = [...this.state.playerHand, cardDeal]

    const result = this.sumOfCards(clonePlayerHand)

    if (result > 21) {
      const index = clonePlayerHand.findIndex((card) => {
        return card.value === 11
      })

      if (index >= 0) {
        clonePlayerHand[index].value = 1
      } else {
        alert("player has lost")
      }
    }

    this.setState({
      deck: clonedDeck,
      playerHand: clonePlayerHand,
      resultPlayer: this.sumOfCards(clonePlayerHand),
    })
  }

  cardDistributionCroupier = () => {
    const clonedDeck = [...this.state.deck]
    const cardDeal = clonedDeck.pop()

    const cloneCroupierHand = [...this.state.croupierHand, cardDeal]

    const result = this.sumOfCards(cloneCroupierHand)
    if (result > 21) {
      const index = cloneCroupierHand.findIndex((card) => {
        return card.value === 11
      })

      if (index >= 0) {
        cloneCroupierHand[index].value = 1
      }
    }

    this.setState({
      deck: clonedDeck,
      croupierHand: cloneCroupierHand,
      resultCroupier: this.sumOfCards(cloneCroupierHand),
    })
  }

  croupierHand = () => {
    this.cardDistribution()
    const clonedCroupierHand = [...this.state.croupierHand, this.state.cardDeal]
    this.setState({
      croupierHand: clonedCroupierHand,
    })
  }
  sumOfCards = (cards) => {
    let sum = 0
    cards.forEach((card) => {
      sum = sum + card.value
    })
    return sum
  }
  stand = async () => {
    if (
      this.state.resultCroupier < this.state.resultPlayer ||
      this.state.resultCroupier < 16
    ) {
      await this.cardDistributionCroupier()
      this.stand()
    } else if (this.state.resultCroupier > 21) {
      alert("Ia Lost")
    } else {
      alert("Ia Win")
    }
  }

  handleJetonPlus = () => {
    if (this.state.jeton > 0) {
      this.setState({
        jeton: this.state.jeton - 10,
        jetonBet: this.state.jetonBet + 10
      })
    } else {
      alert("You haven't jetons")
    }
  }
  
  handleJetonMinus = () => {
    if (this.state.jetonBet > 0) {
      this.setState({
        jetonBet: this.state.jetonBet - 10,
        jeton: this.state.jeton + 10
      })
    } else {
      alert("No more jetons")
    }
  }

  
  startTurn = async () => {
    await this.cardDistributionPlayer()
    await this.cardDistributionPlayer()
    await this.cardDistributionCroupier()
    await this.cardDistributionCroupier()
  }
  render() {
    console.log(this.state)
    return (
      <main>


        <div className="croupier_card"></div>

        <div className="player_card"></div>

        <div className="jetons">
            {this.state.jeton}
        </div>

        <div className="downmenu">

          <div className="betmenu" style={{display: 'none'}}>
            <button onClick={this.handleJetonMinus} className="menubutton">-10</button>
            <button onClick={this.startTurn} className="menubutton">Play</button>
            <button onClick={this.handleJetonPlus} className="menubutton">+10</button>
          </div>

          <div className="playmenu" style={{display: 'flex'}}>
            <button onClick={this.cardDistributionPlayer} className="menubutton">Hit</button>
            <button onClick={this.startTurn} className="menubutton">Restart</button>
            <button onClick={this.stand} className="menubutton">Stand</button>
          </div>
          
        </div>

        <span>You bet {this.state.jetonBet}</span>
        {/* <button onClick={this.sumOfCardsPlayer}>Teste</button> */}

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
      </main>
    )
  }
}
export default App
