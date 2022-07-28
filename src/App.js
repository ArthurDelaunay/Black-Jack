import React, { Component } from "react"
import deckCardsData from "./deckCards.json"
import CroupierSide from "./components/CroupierSide"
import PlayerSide from "./components/PlayerSide"
import Buttons from "./components/Buttons"
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
      croupierHand: [],
      resultPlayer: 0,
      resultCroupier: 0,
      winner: "",
      whosTurn: "player",
      gameStatus: "",
      tokens: 100,
      tokensBet: 0,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.winner !== "") {
      return
    }
    if (this.state.deck.length === 0) {
      this.setState({
        deck: _.shuffle([...deckCardsData]),
      })
    }
    // Bet
    if (this.state.gameStatus === "bet") {
      if (this.state.tokensBet > 0) {
      }
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
            gameStatus: "lost",
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
              gameStatus: "win",
            })
        } else if (this.state.resultCroupier === this.state.resultPlayer) {
          this.setState({
            gameStatus: "draw",
          })
        } else {
          this.setState({
            gameStatus: "lost",
          })
        }
      }
    }

    // Lost

    if (this.state.gameStatus === "lost") {
      this.setState({
        tokensBet: 0,
        gameStatus: "",
        winner: "croupier",
      })
    }
    // draw
    if (this.state.gameStatus === "draw") {
      this.setState({
        tokens: this.state.tokens + this.state.tokensBet,
        tokensBet: 0,
        gameStatus: "",
        winner: "both",
      })
    }
    // win
    if (this.state.gameStatus === "win") {
      this.setState({
        tokens: this.state.tokens + this.state.tokensBet + this.state.tokensBet,
        tokensBet: 0,
        gameStatus: "",
        winner: "player",
      })
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

  startDistribution = () => {
    if (this.state.tokensBet > 0) {
      this.setState({
        tokens: this.state.tokens - this.state.tokensBet,
        gameStatus: "distribution",
      })
    } else {
      alert("Bet some tokens PLEASE")
    }
  }

  handleTokenPlus = () => {
    if (this.state.tokens >= 10 && this.state.tokens > this.state.tokensBet) {
      this.setState({
        tokensBet: this.state.tokensBet + 10,
      })
    }
  }

  handleTokenMinus = () => {
    if (this.state.tokensBet >= 10) {
      this.setState({
        tokensBet: this.state.tokensBet - 10,
      })
    }
  }

  stand = () => {
    this.setState({
      gameStatus: "stand",
    })
  }

  startTurn = () => {
    this.handleGameStatus()
  }

  handleGameStatus = () => {
    this.setState({
      gameStatus: "bet",
    })
  }
  replay = () => {
    this.setState({
      playerHand: [],
      croupierHand: [],
      resultCroupier: 0,
      resultPlayer: 0,
      winner: "",
    })
  }

  resetFunction = () => {
    this.setState({
      cardDeal: {},
      playerHand: [],
      croupierHand: [],
      resultPlayer: 0,
      resultCroupier: 0,
      winner: "",
      gameStatus: "",
    })
  }

  render() {
    return (
      <main className="flex flex-column">
        <CroupierSide
          hand={this.state.croupierHand}
          score={this.state.resultCroupier}
          gameStatus={this.state.gameStatus}
        />
        <PlayerSide
          hand={this.state.playerHand}
          score={this.state.resultPlayer}
        />

        <Buttons
          stand={this.stand}
          hit={this.addToPlayerHand}
          play={this.startTurn}
          status={this.state.gameStatus}
          winner={this.state.winner}
          reset={this.resetFunction}
          tokens={this.state.tokens}
          bet={this.state.tokensBet}
          plusTen={this.handleTokenPlus}
          minusTen={this.handleTokenMinus}
          checkBet={this.startDistribution}
          replay={this.replay}
        />
        {this.state.winner !== "" && (
          <section className="render-player-status flex justify-content-center align-items-center">
            {this.state.winner === "player" && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/1021/1021220.png"
                alt="win cup"
              />
            )}
            {this.state.winner === "croupier" && (
              <img
                src="https://c.tenor.com/XpZ1nVvr6DsAAAAM/diary-of-a-wimpy-kid-loser.gif"
                alt="loser little girl"
                width={400}
              />
            )}
            {this.state.winner === "both" && (
              <img
                src="https://c.tenor.com/bQAJd4X4MN8AAAAC/its-the-exact-same-thing-ian-carter.gif"
                alt="draw"
              />
            )}
          </section>
        )}
      </main>
    )
  }
}
export default App
