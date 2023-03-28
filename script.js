$(document).ready(() => {
  // Initialize variables
  let deck = [];
  let playerCards = [];
  let computerCards = [];
  let playerScore = 0;
  let computerScore = 0;
  let gameOver = false;

  // Create deck of cards
  const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
  let deck = [];
  for (let suit in suits) {
    for (let value in values) {
      let card = {value: values[value], suit: suits[suit]};
      card.image = `cards/${card.value}_of_${card.suit}.png`;
      deck.push(card);
    }
  }
  return deck;
}

let deck = createDeck();


  // Shuffle deck of cards
  const shuffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  };

  // Deal initial cards
  const dealCards = () => {
    for (let i = 0; i < 2; i++) {
      playerCards.push(deck.pop());
      computerCards.push(deck.pop());
    }
    renderCards();
  };

  // Render cards
  const renderCards = () => {
    $(".player-area").empty();
    $(".computer-area").empty();
    $(".play-area").empty();
    for (const card of playerCards) {
      const $card = $("<div>").addClass("card").text(`${card.value} ${card.suit}`);
      $(".player-area").append($card);
    }
    for (const card of computerCards) {
      const $card = $("<div>").addClass("card").text(`${card.value} ${card.suit}`);
      $(".computer-area").append($card);
    }
  };

  // Calculate score
  const calculateScore = (cards) => {
    let score = 0;
    let hasAce = false;
    for (const card of cards) {
      const cardValue = card.value;
      if (cardValue === "A") {
        hasAce = true;
        score += 11;
      } else if (cardValue === "K" || cardValue === "Q" || cardValue === "J") {
        score += 10;
      } else {
        score += parseInt(cardValue);
      }
    }
    if (hasAce && score > 21) {
      score -= 10;
    }
    return score;
  };

  // Check for game over
  const checkGameOver = () => {
    if (gameOver) {
      $("#deal-button").prop("disabled", false);
      $("#hit-button").prop("disabled", true);
      $("#stand-button").prop("disabled", true);
    }
  };

  // Check for winner
  const checkWinner = () => {
    if (playerScore > 21) {
      $("#result").text("You bust! Computer wins!");
      gameOver = true;
    } else if (computerScore > 21) {
      $("#result").text("Computer busts! You win!");
      gameOver = true;
    } else if (playerScore === computerScore) {
      $("#result").text("It's a tie!");
      gameOver = true;
    } else if (playerScore > computerScore) {
      $("#result").text("You win!");
      gameOver = true;
    } else {
      $("#result").text("Computer wins!");
      gameOver = true;