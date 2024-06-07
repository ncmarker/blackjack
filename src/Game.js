import './index.css';
import React from 'react';
import Deck from './Deck.js';
import $ from 'jquery';
import { useState } from 'react';

export default function Game() {
  // DEALER CARDS
  const [card1BG, setCard1BG] = useState('');
  const [card2BG, setCard2BG] = useState(
    'https://i.pinimg.com/originals/09/a5/8d/09a58d561b2a7b92bd506c83414ef1ab.png'
  );

  const [tempCard2, setTempCard2] = useState('');

  // USER CARDS
  const [card3BG, setCard3BG] = useState('');
  const [card4BG, setCard4BG] = useState('');

  const [userCardExtra1BG, setUserCardExtra1BG] = useState('');
  const [userCardExtra2BG, setUserCardExtra2BG] = useState('');
  const [userCardExtra3BG, setUserCardExtra3BG] = useState('');

  const [dCardExtra1BG, setDCardExtra1BG] = useState('');
  const [dCardExtra2BG, setDCardExtra2BG] = useState('');
  const [dCardExtra3BG, setDCardExtra3BG] = useState('');

  const [turnDirections, setTurnDirections] = useState('- Press DEAL to begin');
  const [dealerDirections, setDealerDirections] = useState('');

  // BETTING CHIP AND USER CHIP VALUES
  const [chipVisibilityRed, setChipVisibilityRed] = useState('hidden');
  const [chipAmountRed, setChipAmountRed] = useState(0);
  const [chipBetRed, setChipBetRed] = useState(0);

  const [chipVisibilityBlack, setChipVisibilityBlack] = useState('hidden');
  const [chipAmountBlack, setChipAmountBlack] = useState(0);
  const [chipBetBlack, setChipBetBlack] = useState(0);

  const [chipVisibilityBlue, setChipVisibilityBlue] = useState('hidden');
  const [chipAmountBlue, setChipAmountBlue] = useState(0);
  const [chipBetBlue, setChipBetBlue] = useState(0);

  const [chipVisibilityGreen, setChipVisibilityGreen] = useState('hidden');
  const [chipAmountGreen, setChipAmountGreen] = useState(0);
  const [chipBetGreen, setChipBetGreen] = useState(0);

  // CASHIER CHIP VALUES
  const [cashierChipAmountRed, setCashierChipAmountRed] = useState(0);
  const [cashierChipAmountBlack, setCashierChipAmountBlack] = useState(0);
  const [cashierChipAmountBlue, setCashierChipAmountBlue] = useState(0);
  const [cashierChipAmountGreen, setCashierChipAmountGreen] = useState(0);

  const [chipCostSubtotal, setChipCostSubtotal] = useState(0);
  const [userBank, setUserBank] = useState(100);

  // TEMP CARD VALUES USED TO SET STATE
  var url = '';
  var card1 = '';
  var card2 = '';
  var card3 = '';
  var card4 = '';

  // HIT BUTTON VARIABLES
  const [pec1Visibility, setPec1Visibility] = useState('hidden');
  const [pec2Visibility, setPec2Visibility] = useState('hidden');
  const [pec3Visibility, setPec3Visibility] = useState('hidden');

  const [dec1Visibility, setDec1Visibility] = useState('hidden');
  const [dec2Visibility, setDec2Visibility] = useState('hidden');
  const [dec3Visibility, setDec3Visibility] = useState('hidden');

  var extraCard1 = '';
  var extraCard2 = '';
  var extraCard3 = '';

  var extraDCard1 = '';
  var extraDCard2 = '';
  var extraDCard3 = '';

  // DEAL BUTTON CLICKED
  function handleOnDeal() {
    if (
      chipAmountRed == 0 &&
      chipAmountBlack == 0 &&
      chipAmountBlue == 0 &&
      chipAmountGreen == 0
    ) {
      alert(
        "Oh no, you don't have any chips!\nPurchase chips in the cashier section prior to beginning a game."
      );
    } else {
      // SHUFFLES NEW DECK
      $.ajax({
        url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
        dataType: 'json',
        async: false,
        success: function (response) {
          console.log('shuffled, deck_id: ' + response.deck_id);
          url =
            'https://deckofcardsapi.com/api/deck/' +
            response.deck_id +
            '/draw/?count=10';
          console.log(url);
        },
        error: function (error) {
          alert('AJAX Error');
          console.log(error);
        },
      });

      // DEALS CARDS TO PLAYER AND DEALER
      $.ajax({
        url: url,
        dataType: 'json',
        async: false,
        success: function (response) {
          for (let i = 0; i < 10; i++) {
            if (card1 == '') {
              document.querySelector('#dc1').style.visibility = 'visible';
              card1 = response.cards[i].image;
              setCard1BG(card1);
            } else if (card2 == '') {
              // NEED TO SHOW CARD LATER, FOR NOW JUST 'flipped upside down'
              document.querySelector('#dc2').style.visibility = 'visible';
              card2 = response.cards[i].image;
              setTempCard2(card2);
              // setCard2BG(card2);
            } else if (card3 == '') {
              document.querySelector('#pc1').style.visibility = 'visible';
              card3 = response.cards[i].image;
              setCard3BG(card3);
            } else if (card4 == '') {
              document.querySelector('#pc2').style.visibility = 'visible';
              card4 = response.cards[i].image;
              setCard4BG(card4);
            } else if (extraCard1 == '') {
              extraCard1 = response.cards[i].image;
              setUserCardExtra1BG(extraCard1);
            } else if (extraCard2 == '') {
              extraCard2 = response.cards[i].image;
              setUserCardExtra2BG(extraCard2);
            } else if (extraCard3 == '') {
              extraCard3 = response.cards[i].image;
              setUserCardExtra3BG(extraCard3);
            } else if (extraDCard1 == '') {
              extraDCard1 = response.cards[i].image;
              setDCardExtra1BG(extraDCard1);
            } else if (extraDCard2 == '') {
              extraDCard2 = response.cards[i].image;
              setDCardExtra2BG(extraDCard2);
            } else {
              extraDCard3 = response.cards[i].image;
              setDCardExtra3BG(extraDCard3);
            }
          }
          document.querySelector('#game-start').style.pointerEvents = 'none';
          document.querySelector('#game-start').style.backgroundColor =
            '#8b1b22';
          document.querySelector('#game-start').style.borderColor = '#8b1b22';

          var hitPassBtns = document.querySelectorAll('.hit-pass');
          hitPassBtns.forEach((item) => {
            item.style.visibility = 'visible';
          });
          // document.querySelectorAll('.hit-pass').style.pointerEvents = 'all';
          // document.querySelector('.hit-pass').style.backgroundColor = '#d12d36';
          // document.querySelector('.hit-pass').style.borderColor = '#d12d36';

          setTurnDirections('- Bet, then Hit or Pass');
          console.log(card1 + ', ' + card2 + ', ' + card3 + ', ' + card4);
        },
        error: function (error) {
          alert('AJAX Error.');
          console.log(error);
        },
      });
    }
  }

  function checkCardValue(value) {
    value = value.toUpperCase();
    if (
      value.indexOf('J') > -1 ||
      value.indexOf('Q') > -1 ||
      value.indexOf('K') > -1 ||
      value.indexOf('0') > -1 ||
      value.indexOf('1') > -1
    ) {
      return parseInt(10);
    } else if (value.indexOf('A') > -1) {
      return parseInt(1);
    } else {
      return parseInt(value);
    }
  }

  var playerCard1 = checkCardValue(card3BG.substr(38, 1));
  var playerCard2 = checkCardValue(card4BG.substr(38, 1));
  var playerCard3 = checkCardValue(userCardExtra1BG.substr(38, 1));
  var playerCard4 = checkCardValue(userCardExtra2BG.substr(38, 1));
  var playerCard5 = checkCardValue(userCardExtra3BG.substr(38, 1));

  var userTotal = 0;

  function handleOnHit() {
    if (playerCard1 + playerCard2 == 21) {
      alert('WIN!');
    } else {
      if (pec1Visibility == 'hidden') {
        setPec1Visibility('visible');
        if (playerCard1 + playerCard2 + playerCard3 >= 21) {
          alert('21 Reached or exceeded!');
          userTotal = playerCard1 + playerCard2 + playerCard3;
          setTurnDirections('- Total: ' + userTotal);
          var hitPassBtns = document.querySelectorAll('.hit-pass');
          hitPassBtns.forEach((item) => {
            item.style.visibility = 'hidden';
          });
          setDealerDirections('- turn');
          setTurnDirections('- Total: ' + userTotal);
          setTimeout(dealerTurn, 2000);
        }
      } else if (pec2Visibility == 'hidden') {
        setPec2Visibility('visible');
        if (playerCard1 + playerCard2 + playerCard3 + playerCard4 >= 21) {
          alert('21 Reached or exceeded!');
          userTotal = playerCard1 + playerCard2 + playerCard3 + playerCard4;
          setTurnDirections('- Total: ' + userTotal);
          var hitPassBtns = document.querySelectorAll('.hit-pass');
          hitPassBtns.forEach((item) => {
            item.style.visibility = 'hidden';
          });
          setDealerDirections('- turn');
          setTurnDirections('- Total: ' + userTotal);
          setTimeout(dealerTurn, 2000);
        }
      } else if (pec3Visibility == 'hidden') {
        setPec3Visibility('visible');
        userTotal =
          playerCard1 + playerCard2 + playerCard3 + playerCard4 + playerCard5;
        setTurnDirections('- Total: ' + userTotal);
        setDealerDirections('- turn');
        setTimeout(dealerTurn, 2000);
      }
    }
  }

  function handleOnPass() {
    if (playerCard1 + playerCard2 == 21) {
      alert('WIN!');
    } else {
      if (pec3Visibility == 'visible') {
        userTotal =
          playerCard1 + playerCard2 + playerCard3 + playerCard4 + playerCard5;
        setTurnDirections('- Total: ' + userTotal);
      } else if (pec2Visibility == 'visible') {
        userTotal = playerCard1 + playerCard2 + playerCard3 + playerCard4;
        setTurnDirections('- Total: ' + userTotal);
      } else if (pec1Visibility == 'visible') {
        userTotal = playerCard1 + playerCard2 + playerCard3;
        setTurnDirections('- Total: ' + userTotal);
      } else {
        userTotal = playerCard1 + playerCard2;
        setTurnDirections('- Total: ' + userTotal);
      }
      var hitPassBtns = document.querySelectorAll('.hit-pass');
      hitPassBtns.forEach((item) => {
        item.style.visibility = 'hidden';
      });
      setDealerDirections('- turn');
      setTimeout(dealerTurn, 2000);
    }
  }

  function dealerTurn() {
    setDealerDirections('- hit or pass');
    setCard2BG(tempCard2);

    setTimeout(dealerBets, 2000);
    setDealerDirections('- doubling bets');

    setTimeout(dealerTotaled, 2000);
  }

  function dealerBets() {
    setChipBetRed(parseInt(chipBetRed) * 2);
    setChipBetBlack(parseInt(chipBetBlack) * 2);
    setChipBetBlue(parseInt(chipBetBlue) * 2);
    setChipBetGreen(parseInt(chipBetGreen) * 2);
  }

  var dealerTotal = 0;

  function dealerTotaled() {
    var dealerCard1 = checkCardValue(card1BG.substr(38, 1));
    var dealerCard2 = checkCardValue(tempCard2.substr(38, 1));
    var dealerCard3 = checkCardValue(dCardExtra1BG.substr(38, 1));
    var dealerCard4 = checkCardValue(dCardExtra2BG.substr(38, 1));
    var dealerCard5 = checkCardValue(dCardExtra3BG.substr(38, 1));
    dealerTotal = dealerCard1 + dealerCard2;
    for (let i = 0; i < 5; i++) {
      if (dealerCard1 + dealerCard2 < 17) {
        setDec1Visibility('visible');
        dealerTotal = dealerCard1 + dealerCard2 + dealerCard3;
      }
      if (
        dec1Visibility == 'visible' &&
        dealerCard1 + dealerCard2 + dealerCard3 < 17
      ) {
        setDec2Visibility('visible');
        dealerTotal = dealerCard1 + dealerCard2 + dealerCard3 + dealerCard4;
      }
      if (
        dec2Visibility == 'visible' &&
        dealerCard1 + dealerCard2 + dealerCard3 + dealerCard4 < 17
      ) {
        setDec3Visibility('visible');
        dealerTotal =
          dealerCard1 + dealerCard2 + dealerCard3 + dealerCard4 + dealerCard5;
      }
    }
    setDealerDirections('- Total: ' + dealerTotal);
    setTimeout(winResults, 1000);
  }

  function winResults() {
    var winnings =
      (chipBetRed * 1 +
        chipBetBlack * 5 +
        chipBetBlue * 25 +
        chipBetGreen * 50) *
      2;
    if (userTotal > 21) {
      alert(
        'The dealer beat you, better luck next time!\nYou went over 21.\nYou lost $' +
          winnings +
          '.'
      );
      winnings = winnings * -1;
    } else if (userTotal > dealerTotal && dealerTotal <= 21) {
      alert('You won!\nYour earnings total to $' + winnings + '.');
    } else if (userTotal < dealerTotal && dealerTotal <= 21) {
      alert(
        'The dealer beat you, better luck next time!\nYou lost $' +
          winnings +
          '.'
      );
      winnings = winnings * -1;
    } else if (userTotal == dealerTotal && dealerTotal <= 21) {
      alert(
        'You tied with the dealer. You will receive half of the winnings, totalling to $' +
          winnings / 2 +
          '.'
      );
      winnings = winnings / 2;
    }
    setUserBank(userBank + winnings);
    refreshGame();
  }

  function refreshGame() {
    setTurnDirections('- Press DEAL to play again');

    var hitPassBtns = document.querySelectorAll('.hit-pass');
    hitPassBtns.forEach((item) => {
      item.style.visibility = 'hidden';
    });

    document.querySelector('#game-start').style.pointerEvents = 'auto';
    document.querySelector('#game-start').style.backgroundColor = '#d12d36';
    document.querySelector('#game-start').style.borderColor = '#d12d36';

    document.querySelector('#pc1').style.visibility = 'visible';
    document.querySelector('#pc2').style.visibility = 'visible';

    document.querySelector('#dc1').style.visibility = 'visible';
    document.querySelector('#dc1').style.visibility = 'visible';

    setPec1Visibility('hidden');
    setPec2Visibility('hidden');
    setPec3Visibility('hidden');

    setDec1Visibility('hidden');
    setDec2Visibility('hidden');
    setDec3Visibility('hidden');

    setChipBetRed(0);
    setChipBetBlack(0);
    setChipBetBlue(0);
    setChipBetGreen(0);

    setChipVisibilityRed('hidden');
    setChipVisibilityBlack('hidden');
    setChipVisibilityBlue('hidden');
    setChipVisibilityGreen('hidden');
  }

  //BET CHIP AND USER CHIP ACTIONS
  function handleOnClickChipRed() {
    if (chipAmountRed > 0) {
      setChipVisibilityRed('visible');
      setChipAmountRed(chipAmountRed - 1);
      setChipBetRed(chipBetRed + 1);
    }
  }

  function handleOnClickChipBlack() {
    if (chipAmountBlack > 0) {
      setChipVisibilityBlack('visible');
      setChipAmountBlack(chipAmountBlack - 1);
      setChipBetBlack(chipBetBlack + 1);
    }
  }

  function handleOnClickChipBlue() {
    if (chipAmountBlue > 0) {
      setChipVisibilityBlue('visible');
      setChipAmountBlue(chipAmountBlue - 1);
      setChipBetBlue(chipBetBlue + 1);
    }
  }

  function handleOnClickChipGreen() {
    if (chipAmountGreen > 0) {
      setChipVisibilityGreen('visible');
      setChipAmountGreen(chipAmountGreen - 1);
      setChipBetGreen(chipBetGreen + 1);
    }
  }

  // COMING SOON PAGE FOR NOW
  function handleComingSoon() {
    open(
      'https://static.vecteezy.com/system/resources/previews/002/115/431/original/coming-soon-business-sign-free-vector.jpg'
    );
  }

  return (
    <div>
      <div className="section" id="game">
        <h2>
          Dealer <em>{dealerDirections}</em>
        </h2>
        <img className="card" id="dc1" src={card1BG} alt="dealer card 1" />
        <img className="card" id="dc2" src={card2BG} alt="dealer card 2" />
        <img
          className="card"
          id="dec1"
          src={dCardExtra1BG}
          alt="dealer extra card 1"
          style={{ visibility: dec1Visibility }}
        />
        <img
          className="card"
          id="dec2"
          src={dCardExtra2BG}
          alt="dealer extra card 2"
          style={{ visibility: dec2Visibility }}
        />
        <img
          className="card"
          id="dec3"
          src={dCardExtra3BG}
          alt="dealer extra card 3"
          style={{ visibility: dec3Visibility }}
        />
        <div id="bets-placed">
          <div id="player-turn">
            <div className="hit-pass" onClick={handleOnHit}>
              Hit
            </div>
            <div className="hit-pass" onClick={handleOnPass}>
              Pass
            </div>
          </div>
          <Deck />
          <BetChip
            amount={chipBetRed}
            chipColor="https://www.pngitem.com/pimgs/m/518-5181524_red-poker-chip-png-transparent-png.png"
            bgSize="109%"
            show={chipVisibilityRed}
          />
          <BetChip
            amount={chipBetBlack}
            chipColor="https://sc04.alicdn.com/kf/H221f87790a01400098ad28f86c1bf75aN.jpg"
            bgSize="cover"
            show={chipVisibilityBlack}
          />
          <BetChip
            amount={chipBetBlue}
            chipColor="https://cutewallpaper.org/24/poker-chip-png/table-of-green-poker-chip-free-transparent-png-clipart-images-download.png"
            bgSize="150%"
            show={chipVisibilityBlue}
          />
          <BetChip
            amount={chipBetGreen}
            chipColor="https://image.pngaaa.com/618/3217618-middle.png"
            bgSize="199%"
            show={chipVisibilityGreen}
          />
          <div className="button" id="game-start" onClick={handleOnDeal}>
            DEAL
          </div>
        </div>
        <h2>
          You <em> {turnDirections}</em>
        </h2>
        <img className="card" id="pc1" src={card3BG} alt="player card 1" />
        <img className="card" id="pc2" src={card4BG} alt="player card 2" />
        <img
          className="card"
          id="pec1"
          src={userCardExtra1BG}
          alt="player extra card 1"
          style={{ visibility: pec1Visibility }}
        />
        <img
          className="card"
          id="pec2"
          src={userCardExtra2BG}
          alt="player extra card 2"
          style={{ visibility: pec2Visibility }}
        />
        <img
          className="card"
          id="pec3"
          src={userCardExtra3BG}
          alt="player extra card 3"
          style={{ visibility: pec3Visibility }}
        />
        <br />
        <Chip
          amount={chipAmountRed}
          chipColor="https://www.pngitem.com/pimgs/m/518-5181524_red-poker-chip-png-transparent-png.png"
          bgSize="109%"
          clickHandlerName={handleOnClickChipRed}
        />
        <Chip
          amount={chipAmountBlack}
          chipColor="https://sc04.alicdn.com/kf/H221f87790a01400098ad28f86c1bf75aN.jpg"
          bgSize="cover"
          clickHandlerName={handleOnClickChipBlack}
        />
        <Chip
          amount={chipAmountBlue}
          chipColor="https://cutewallpaper.org/24/poker-chip-png/table-of-green-poker-chip-free-transparent-png-clipart-images-download.png"
          bgSize="150%"
          clickHandlerName={handleOnClickChipBlue}
        />
        <Chip
          amount={chipAmountGreen}
          chipColor="https://image.pngaaa.com/618/3217618-middle.png"
          bgSize="199%"
          clickHandlerName={handleOnClickChipGreen}
        />
      </div>
      <div className="section" id="cashier">
        <h2>Cashier</h2>
        <CashierChips />
        <PurchasedChips />
        <h3>
          SUBTOTAL: $<span>{chipCostSubtotal}</span>
        </h3>
        <h3>
          Bank Account: $<span>{userBank}</span>
        </h3>
        <div className="button" id="purchase" onClick={handleOnPurchase}>
          Purchase
        </div>
        <div className="button" id="refresh" onClick={handleOnRefresh}>
          Restart
        </div>
      </div>
    </div>
  );

  function BetChip(props) {
    return (
      <div id="bets">
        <div
          id="bet-chip"
          style={{
            backgroundImage: 'url(' + props.chipColor + ')',
            backgroundSize: props.bgSize,
            visibility: props.show,
          }}
        >
          <p id="chip-amt">{props.amount}x</p>
        </div>
      </div>
    );
  }

  function Chip(props) {
    return (
      <div id="bets">
        <div
          id="chip"
          onClick={() => props.clickHandlerName()}
          style={{
            backgroundImage: 'url(' + props.chipColor + ')',
            backgroundSize: props.bgSize,
          }}
        >
          <p id="chip-amt">{props.amount}x</p>
        </div>
      </div>
    );
  }

  function onClickPlus(u) {
    if (u == 'red') {
      setCashierChipAmountRed(cashierChipAmountRed + 1);
      setChipCostSubtotal(chipCostSubtotal + 1);
    } else if (u == 'black') {
      setCashierChipAmountBlack(cashierChipAmountBlack + 1);
      setChipCostSubtotal(chipCostSubtotal + 5);
    } else if (u == 'blue') {
      setCashierChipAmountBlue(cashierChipAmountBlue + 1);
      setChipCostSubtotal(chipCostSubtotal + 25);
    } else if (u == 'green') {
      setCashierChipAmountGreen(cashierChipAmountGreen + 1);
      setChipCostSubtotal(chipCostSubtotal + 50);
    }
  }

  function onClickMinus(u) {
    if (u == 'red' && cashierChipAmountRed > 0) {
      setCashierChipAmountRed(cashierChipAmountRed - 1);
      setChipCostSubtotal(chipCostSubtotal - 1);
    } else if (u == 'black' && cashierChipAmountBlack > 0) {
      setCashierChipAmountBlack(cashierChipAmountBlack - 1);
      setChipCostSubtotal(chipCostSubtotal - 5);
    } else if (u == 'blue' && cashierChipAmountBlue > 0) {
      setCashierChipAmountBlue(cashierChipAmountBlue - 1);
      setChipCostSubtotal(chipCostSubtotal - 25);
    } else if (u == 'green' && cashierChipAmountGreen > 0) {
      setCashierChipAmountGreen(cashierChipAmountGreen - 1);
      setChipCostSubtotal(chipCostSubtotal - 50);
    }
  }

  function handleOnPurchase() {
    if (chipCostSubtotal > userBank) {
      alert(
        'Not enough money in account. Decrease cost of chips.\n\n If bank account is negative, you went bankrupt. Please restart the game to keep playing.'
      );
    } else {
      setUserBank(userBank - chipCostSubtotal);

      setChipAmountRed(chipAmountRed + cashierChipAmountRed);
      setChipAmountBlack(chipAmountBlack + cashierChipAmountBlack);
      setChipAmountBlue(chipAmountBlue + cashierChipAmountBlue);
      setChipAmountGreen(chipAmountGreen + cashierChipAmountGreen);

      setCashierChipAmountRed(0);
      setCashierChipAmountBlack(0);
      setCashierChipAmountBlue(0);
      setCashierChipAmountGreen(0);
      setChipCostSubtotal(0);
    }
  }

  function handleOnRefresh() {
    var userResponse = prompt(
      'Are you sure you want to restart the game?\nthis will clear all progress.\n\nType "y" for yes, all other characters assume no.'
    );
    if (userResponse.toLowerCase() == 'y') {
      window.location.reload(false);
    }
  }

  function CashierChips(props) {
    return (
      <div id="all-cashier-chips">
        <SingleCashierChip
          amount={cashierChipAmountRed}
          chipColor="https://www.pngitem.com/pimgs/m/518-5181524_red-poker-chip-png-transparent-png.png"
          bgSize="109%"
          unique="red"
          price="1"
        />
        <SingleCashierChip
          amount={cashierChipAmountBlack}
          chipColor="https://sc04.alicdn.com/kf/H221f87790a01400098ad28f86c1bf75aN.jpg"
          bgSize="cover"
          unique="black"
          price="5"
        />
        <SingleCashierChip
          amount={cashierChipAmountBlue}
          chipColor="https://cutewallpaper.org/24/poker-chip-png/table-of-green-poker-chip-free-transparent-png-clipart-images-download.png"
          bgSize="150%"
          unique="blue"
          price="25"
        />
        <SingleCashierChip
          amount={cashierChipAmountGreen}
          chipColor="https://image.pngaaa.com/618/3217618-middle.png"
          bgSize="199%"
          unique="green"
          price="50"
        />
      </div>
    );
  }

  function PurchasedChips(props) {
    return (
      <div id="all-cashier-chips">
        <SinglePurchasedChip
          amount={chipAmountRed}
          chipColor="https://www.pngitem.com/pimgs/m/518-5181524_red-poker-chip-png-transparent-png.png"
          bgSize="109%"
        />
        <SinglePurchasedChip
          amount={chipAmountBlack}
          chipColor="https://sc04.alicdn.com/kf/H221f87790a01400098ad28f86c1bf75aN.jpg"
          bgSize="cover"
        />
        <SinglePurchasedChip
          amount={chipAmountBlue}
          chipColor="https://cutewallpaper.org/24/poker-chip-png/table-of-green-poker-chip-free-transparent-png-clipart-images-download.png"
          bgSize="150%"
        />
        <SinglePurchasedChip
          amount={chipAmountGreen}
          chipColor="https://image.pngaaa.com/618/3217618-middle.png"
          bgSize="199%"
        />
      </div>
    );
  }

  function SingleCashierChip(props) {
    var chipCost = parseInt(props.price) * props.amount;
    return (
      <div id="cashier-chip-ctn">
        <div id="minus-icon" onClick={() => onClickMinus(props.unique)}>
          -
        </div>
        <div id="plus-icon" onClick={() => onClickPlus(props.unique)}>
          +
        </div>
        <div
          id="cashier-chips"
          style={{
            backgroundImage: 'url(' + props.chipColor + ')',
            backgroundSize: props.bgSize,
          }}
        >
          <p id="cashier-chip-amt">
            {props.amount}x = ${chipCost}
          </p>
        </div>
      </div>
    );
  }

  function SinglePurchasedChip(props) {
    return (
      <div id="cashier-chip-ctn">
        <div
          id="cashier-chips"
          onClick={() => props.clickHandlerName(props.unique)}
          style={{
            backgroundImage: 'url(' + props.chipColor + ')',
            backgroundSize: props.bgSize,
          }}
        >
          <p id="cashier-chip-amt">{props.amount}x</p>
        </div>
      </div>
    );
  }
}
