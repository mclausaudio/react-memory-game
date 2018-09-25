import React, { Component } from 'react';
import shuffle from 'shuffle-array'
import Card from './Card'
import NavBar from './NavBar'
import './Game.css';

const CardState = {
  HIDING: 0,
  SHOWING: 1, 
  MATCHING: 2
}

class Game extends Component {
  constructor(props){
    super(props)
    
    let cards = [
    {id:0, cardState: CardState.HIDING, backgroundColor: 'teal'},
    {id:1, cardState: CardState.HIDING, backgroundColor: 'teal'},
    {id:2, cardState: CardState.HIDING, backgroundColor: 'LimeGreen'},
    {id:3, cardState: CardState.HIDING, backgroundColor: 'LimeGreen'},
    {id:4, cardState: CardState.HIDING, backgroundColor: 'MistyRose'},
    {id:5, cardState: CardState.HIDING, backgroundColor: 'MistyRose'},
    {id:6, cardState: CardState.HIDING, backgroundColor: 'SteelBlue'},
    {id:7, cardState: CardState.HIDING, backgroundColor: 'SteelBlue'},
    {id:8, cardState: CardState.HIDING, backgroundColor: 'SeaGreen'},
    {id:9, cardState: CardState.HIDING, backgroundColor: 'SeaGreen'},
    {id:10, cardState: CardState.HIDING, backgroundColor: 'FireBrick'},
    {id:11, cardState: CardState.HIDING, backgroundColor: 'FireBrick'},
    {id:12, cardState: CardState.HIDING, backgroundColor: 'BurlyWood'},
    {id:13, cardState: CardState.HIDING, backgroundColor: 'BurlyWood'},
    {id:14, cardState: CardState.HIDING, backgroundColor: 'LightSalmon'},
    {id:15, cardState: CardState.HIDING, backgroundColor: 'LightSalmon'},
    ]
    cards = shuffle(cards)
    this.state = {cards}
    
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame =  this.handleNewGame.bind(this);
  }
  
  handleClick(id){
    //takes array of cards, array of card id's to change, and the state they should have.
    const mapCardState = (cards, idsToChange, newCardState) => {
      //maps over cards array
      return cards.map(c => {
        ///if the current card id matches any of the ids we need to change, change the current cards cardState, else just return it unmodified
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
      return c;
      });
    }
    //next, we'll grab the card we want out of the array
    const foundCard = this.state.cards.find(c => c.id === id);
    //if the play clicks a card that is already showing, or noClick is active(they've won) then return and exit function
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    //noClick refers if they use is unable to click (for ex 2 cards are showing)
    let noClick = false;
    //map the card that we clicked on to be showing
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    //filter to only show the showing cards
    const showingCards = cards.filter((c)=>c.cardState === CardState.SHOWING);
    ///now lets get jut the id of the showing cards
    const ids = showingCards.map(c => c.id);
    //at this point we have an array of showing cards w ids, check if we have 2 showing cards and if their background colors match
    if (showingCards.length === 2 &&
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
          cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      
      noClick = true;
      
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          this.setState({cards: hidingCards, noClick: false});
        }, 1300);
      });
      return;
    }
    //the only way we reach here is if there is a) 1 card showing, b) 2 cards showing that match
    this.setState({cards, noClick});
    
    //below was previously used to make sure onclick was working, just getting cards to show, but no game logic
    // this.setState(prevState => {
    //   let cards = prevState.cards.map((c) => (
    //     c.id === id ? {
    //       ...c, 
    //       cardState: c.cardState === CardState.HIDING ? CardState.MATCHING : CardState.HIDING 
    //     } : c
    //   ));
    //   return {cards};
    // });
  }
  
  handleNewGame(){
    let cards = this.state.cards.map((c)=>({
      ...c,
      cardState: CardState.HIDING
    }));
    shuffle(cards);
    this.setState({cards})
  }
  
  render() {
    const cards = this.state.cards.map((c, i)=> (
      <Card 
        key={c.id} 
        showing={c.cardState !== CardState.HIDING}
        backgroundColor={c.backgroundColor}
        onClick={() => {this.handleClick(c.id)}}
      />
    ));
    return (
      <div className="App">
      <NavBar onNewGame={this.handleNewGame}/>
        {cards}
      </div>
    );
  }
}

export default Game;
