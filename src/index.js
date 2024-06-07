import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Game from './Game.js';

const root = createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    {/*<------NAVBAR------>*/}
    <div id="navbar">
      <div id="nav-container">
        <p id="logo">BLACKJACK</p>
        <a href="#rules-content">Game Rules</a>
        <a href="#cashier">Cashier</a>
        <a href="#game">
          <strong>Play Game</strong>
        </a>
        <div className="clear"></div>
      </div>
    </div>
    {/*<------HEADER------>*/}
    {/*<div id="container">*/}
    <div id="header">
      <p>Welcome to</p>
      <h1>BLACKJACK</h1>
      <p>
        <em>Can you beat the dealer?</em>
      </p>
      <a href="#game" className="button">
        Play Now
      </a>
    </div>
    {/*<------RULES CONTENT------>*/}
    <div id="container">
      <div className="section" id="rules-content">
        <h2>Game Rules</h2>
        <p>
          <em>*This is a modified version of the classic Blackjack game.</em>
          <br />
          <br />
          <u>OBJECTIVE:</u> Attempt to beat the dealer by getting as close to 21
          as you can without going over. <br />
          <br />
          This is a 1v1 (player vs. dealer) form of Blackjack. This form of the
          game will use 1 deck of 52 cards that are shuffled together. Cards are
          each worth the value of the number on the card, with all face cards
          (Jack, Queen King) being equal to 10, and Ace being equal to only
          1--although traditional Blackjack allows the Ace to equal 1 OR 11,
          this version assumes the Ace to be 1. Jokers are removed. <br />
          <br />
          The game will begin when the dealer clicks the "DEAL" button. The
          dealer will then deal out a face up card to both the player and
          themself. The dealer then deals out a second card to both the player
          and themself, however the player's card is face up while the dealer's
          is dealt face down (so the player cannot see). Thus, the player has
          two cards placed face up, and the dealer has two cards, one face up
          and one face down. <br />
          <br />
          At this point in the game the player has the opportunity to place a
          bet prior to choosing whether or not to receive another card. All bets
          placed by the player will be doubled by the dealer when the player
          completes their turn. For example, if the player bets $10, the dealer
          will also bet $10 upon their turn. <br />
          <br />
          NOTE: the player has a choice to make a bet or not, however in the
          case that they do not, no money can be won by the player (since the
          dealer only doubles bets placed by the player). <br />
          <br />
          After placing a bet (or choosing not to), the player will have the
          choice to receive another card in attempt to get closer to 21, or to
          remain with the two they have ("Hit" means receive a new card, "Pass"
          means remain with what you currently have). The player can continue
          receiving more cards until 21 is reached or exceeded. <br />
          <br />
          After the player's turn is up, the dealer's turn then begins. The
          dealer's second card will be revealed. If the total of the cards in
          the dealer's hand is below 17, the dealer must receive another card.
          While under 17, the dealer will continue to receive additional cards.
          <br />
          <br />
          After both the player and dealer are done receiving cards, the total
          of both hands are compared. Whoever is closer to 21 without going
          over, will win the money. In this case, the player either wins the
          money, or loses the money. If there is a tie between the player and
          dealer, the player wins half of the total money. The game is now over.
          <br />
          <br />
          The game can be played as many times as the player would like, with
          the cards being randomly shuffled each time. The player will also be
          granted $100 to start, and shall 'purchase' chips in the 'Cashier'
          section of the game prior to begin playing. Any money won can be used
          to purchase additional chips in order to continue playing with the
          dealer in the same session. If the player wishes to clear all progress
          and restart the game, the 'Restart' button at the bottom of the page
          will refresh the entire game, including money won.
        </p>
        <h2 className="topic-space">About</h2>
        <p>
          This independent project was designed and developed by Nick Marker in
          the Spring of 2023. Programming languages include HTML, CSS,
          JavaScript, and JS React. The length of the project took about 1
          month, working sparratically througout.
          <br />
          <br />
          This project makes use of the "Deck of Cards API" in order to perform
          actions dealing with the members within a deck of cards. Additional
          information regarding this API or its directions for use can be found{' '}
          <a href="https://deckofcardsapi.com" target="_blank">
            here
          </a>
          .
          <br />
          <br />
          Reflecting back on the project, I hope to develop the project further
          to allow for multiple players to take part in the game, whether that
          be through 'bot' like players or other players on the user-end. I also
          would like to add more of the specific Blackjack rules, for example
          when a player is dealt a specific combination of cards, a specific
          action is then implemented. I also would like to create additional
          sections of the game, including a leaderboard section that displays
          potential data like a username with their highest amount of winnings
          earned, and most games won in a row. <br />
          <br />
          As far as challenges, the greatest complication I faced was
          establishing a successful connection between each of the chip colors
          and their various types. For example, the connection between
          purchasing a red chip, to updating the amount of player red chips, to
          then updating the amount of red chips bet, and ensuring each of these
          actions are all affected by one another, without mixing actions made
          by other colored chips.
          <br />
          <br />
          Click{' '}
          <a
            id="code"
            href="https://stackblitz.com/edit/react-rvfhqs?embed=1&file=src/index.js&view=editor"
          >
            here
          </a>{' '}
          to view the full code for this project.
        </p>
      </div>
      {/*<------GAME------>*/}
      <Game />
    </div>
    {/*<------FOOTER------>*/}
    <div id="footer">
      <p>Thanks for trying out my game!</p>
      <p id="copywright">
        This game was designed and developed by Nick Marker &copy; April 2023
      </p>
    </div>
  </React.StrictMode>
);
