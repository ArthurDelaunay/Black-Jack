import React, { Component } from "react"
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
      playerHand: [],
      croupierHand: [
        {
          cardName: "four",
          color: "diamond",
          value: 4,
          imageUrl: "./assets/img/diamond_4.png",
        },
        {
          cardName: "four",
          color: "diamond",
          value: 4,
          imageUrl: "./assets/img/diamond_4.png",
        },
      ],
      resultPlayer: 0,
      resultCroupier: 0,
      winner: "",
      whosTurn: "player",
      gameStatus: "distribution",
      jeton: 100,
      jetonBet: 0,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.winner !== "") {
      return
    }
    // Distribution
    if (this.state.gameStatus === "distribution") {
      if (this.state.playerHand.length > prevState.playerHand.length) {
        this.calculResultPlayer()
      }
      if (this.state.croupierHand.length > prevState.croupierHand.length) {
        this.calculResultCroupier()
      }
      if (_.isEmpty(this.state.cardDeal)) {
        this.pickUpCard()
      } else {
        if (
          this.state.playerHand.length < 1 ||
          this.state.croupierHand.length < 2
        ) {
          if (this.state.whosTurn === "player") {
            this.addToPlayerHandDistribution()
          } else if (this.state.whosTurn === "croupier") {
            this.addToCroupierHandDistribution()
          }
        } else {
          this.setState({
            gameStatus: "hit",
          })
        }
      }
    }
    // Hit

    if (this.state.gameStatus === "hit") {
      if (this.state.playerHand.length > prevState.playerHand.length) {
        this.calculResultPlayer()
      }
      if (_.isEmpty(this.state.cardDeal)) {
        this.pickUpCard()
      }
      if (this.state.resultPlayer > 21) {
        const index = this.state.playerHand.findIndex((card) => {
          return card.value === 11
        })
        if (index >= 0) {
          const clonePlayerHand = [...this.state.playerHand]
          let sum = 0
          clonePlayerHand[index].value = 1
          clonePlayerHand.forEach((card) => {
            sum += card.value
          })
          this.setState({
            playerHand: clonePlayerHand,
            resultPlayer: sum,
          })
        } else {
          this.setState({
            winner: "croupier",
          })
        }
      }
    }
    // STAND
    if (this.state.gameStatus === "stand") {
      if (this.state.croupierHand.length > prevState.croupierHand.length) {
        this.calculResultCroupier()
      }
      if (_.isEmpty(this.state.cardDeal)) {
        this.pickUpCard()
      } else {
        if (
          this.state.resultCroupier < this.state.resultPlayer ||
          this.state.resultCroupier < 16
        ) {
          this.addToCroupierHand()
        } else if (this.state.resultCroupier > 21) {
          const index = this.state.croupierHand.findIndex((card) => {
            return card.value === 11
          })
          if (index >= 0) {
            const cloneCroupierHand = [...this.state.croupierHand]
            let sum = 0
            cloneCroupierHand[index].value = 1
            cloneCroupierHand.forEach((card) => {
              sum += card.value
            })
            this.setState({
              croupierHand: cloneCroupierHand,
              resultCroupier: sum,
            })
          } else
            this.setState({
              winner: "player",
            })
        } else if (this.state.resultCroupier === this.state.resultPlayer) {
          this.setState({
            winner: "both",
          })
        } else {
          this.setState({
            winner: "croupier",
          })
        }
      }
    }
  }

  // prend une carte du paquet
  pickUpCard = () => {
    const clonedDeck = [...this.state.deck]
    const cardDeal = clonedDeck.pop()
    this.setState({
      deck: clonedDeck,
      cardDeal: cardDeal,
    })
  }
  addToPlayerHand = () => {
    const clonePlayerHand = [...this.state.playerHand, this.state.cardDeal]
    this.setState({
      playerHand: clonePlayerHand,
      cardDeal: {},
    })
  }
  addToCroupierHand = () => {
    const clonedCroupierHand = [...this.state.croupierHand, this.state.cardDeal]
    this.setState({
      croupierHand: clonedCroupierHand,
      cardDeal: {},
    })
  }
  addToPlayerHandDistribution = () => {
    const clonePlayerHand = [...this.state.playerHand, this.state.cardDeal]
    this.setState({
      playerHand: clonePlayerHand,
      cardDeal: {},
      whosTurn: "croupier",
    })
  }
  addToCroupierHandDistribution = () => {
    const clonedCroupierHand = [...this.state.croupierHand, this.state.cardDeal]
    this.setState({
      croupierHand: clonedCroupierHand,
      cardDeal: {},
      whosTurn: "player",
    })
  }

  calculResultPlayer = () => {
    let sum = 0

    this.state.playerHand.forEach((card) => {
      sum = sum + card.value
    })

    this.setState({
      resultPlayer: sum,
    })
  }

  calculResultCroupier = () => {
    let sum = 0

    this.state.croupierHand.forEach((card) => {
      sum = sum + card.value
    })

    this.setState({
      resultCroupier: sum,
    })
  }

  changeAceValueForCroupier = () => {
    if (this.state.resultCroupier > 21) {
      const index = this.state.croupierHand.findIndex((card) => {
        return card.value === 11
      })

      if (index >= 0) {
        const cloneCroupierHand = [...this.state.croupierHand]
        cloneCroupierHand[index].value = 1

        this.setState({
          croupierHand: cloneCroupierHand,
        })
      }
    }
  }
  toCroupierTurn = () => {
    this.setState({
      whosTurn: "croupier",
    })
  }
  toPlayerTurn = () => {
    this.setState({
      whosTurn: "player",
    })
  }
  whoWin = () => {
    if (this.state.resultPlayer > this.state.resultCroupier) {
      this.setState({
        winner: "player",
      })
    } else if (this.state.resultPlayer < this.state.resultCroupier) {
      this.setState({
        winner: "croupier",
      })
    } else {
      this.setState({
        winner: "draw",
      })
    }
  }

  // handleJetonPlus = () => {
  //   if (this.state.jeton > 0) {
  //     this.setState({
  //       jeton: this.state.jeton - 10,
  //       jetonBet: this.state.jetonBet + 10
  //     })
  //   } else {
  //     alert("You haven't jetons")
  //   }
  // }

  // handleJetonMinus = () => {
  //   if (this.state.jetonBet > 0) {
  //     this.setState({
  //       jetonBet: this.state.jetonBet - 10,
  //       jeton: this.state.jeton + 10
  //     })
  //   } else {
  //     alert("No more jetons")
  //   }
  // }

  stand = () => {
    this.setState({
      gameStatus: "stand",
    })
  }

  startTurn = () => {
    this.pickUpCard()
  }
  render() {
    return (
      <main className="flex flex-column">
        <CroupierSide
          hand={this.state.croupierHand}
          score={this.state.resultCroupier}
        />
        <PlayerSide />
      </main>
    )
  }
}
export default App
