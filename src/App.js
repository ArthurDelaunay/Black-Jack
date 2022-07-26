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
    if (this.state.resultCroupier < this.state.resultPlayer) {
      await this.cardDistributionCroupier()
      this.stand()
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
        <button onClick={this.startTurn}>Teste</button>
        <button onClick={this.stand}>Stand</button>
        <button onClick={this.cardDistributionPlayer}>Hit</button>
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
