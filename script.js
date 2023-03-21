$(document).ready(function() {

    // Initialize variables
    var deck = [];
    var playerCards = [];
    var computerCards = [];
    var playerScore = 0;
    var computerScore = 0;
    var gameOver = false;
  
    // Create deck of cards
    function createDeck() {
      var suits = ["hearts", "diamonds", "clubs", "spades"];
      var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
          var card = {value: values[j], suit: suits[i]};
          deck.push(card);
        }
      }
    }
  
    // Shuffle deck of cards
    function shuffleDeck() {
      for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
    }
  
    // Deal initial cards
    function dealCards() {
      for (var i = 0; i < 2; i++) {
        playerCards.push(deck.pop());
        computerCards.push(deck.pop());
      }
      renderCards();
    }
  
    // Render cards
    function renderCards() {
      $(".player-area").empty();
      $(".computer-area").empty();
      $(".play-area").empty();
      for (var i = 0; i < playerCards.length; i++) {
        var card = $("<div>").addClass("card").text(playerCards[i].value + " " + playerCards[i].suit);
        $(".player-area").append(card);
      }
      for (var i = 0; i < computerCards.length; i++) {
        var card = $("<div>").addClass("card").text(computerCards[i].value + " " + computerCards[i].suit);
        $(".computer-area").append(card);
      }
    }
  
    // Calculate score
    function calculateScore(cards) {
      var score = 0;
      var hasAce = false;
      for (var i = 0; i < cards.length; i++) {
        var cardValue = cards[i].value;
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
    }
  
    // Check for game over
    function checkGameOver() {
      if (gameOver) {
        $("#deal-button").prop("disabled", false);
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);
      }
    }
  
    // Check for winner
    function checkWinner() {
      if (playerScore > 21) {
        $("#result").text("You bust! Computer wins!");
        gameOver = true;
      } else if (computerScore > 21) {
        $("#result").text("Computer busts! You win!");
        gameOver = true;
      } else if (playerScore === computerScore) {
        $("#result").text("It's a tie!");
        gameOver  = true;
    } else if (playerScore > computerScore) {
      $("#result").text("You win!");
      gameOver = true;
    } else {
      $("#result").text("Computer wins!");
      gameOver = true;
    }
    checkGameOver();
    
}

// Deal a card to the player
function hit() {
playerCards.push(deck.pop());
renderCards();
playerScore = calculateScore(playerCards);
$("#player-score").text(playerScore);
if (playerScore > 21) {
checkWinner();
}
}

// End player's turn
function stand() {
while (computerScore < 17) {
computerCards.push(deck.pop());
computerScore = calculateScore(computerCards);
}
renderCards();
$("#computer-score").text(computerScore);
checkWinner();
}

// Start a new game
function newGame() {
deck = [];
playerCards = [];
computerCards = [];
playerScore = 0;
computerScore = 0;
gameOver = false;
$("#result").empty();
$("#player-score").text("0");
$("#computer-score").text("0");
createDeck();
shuffleDeck();
dealCards();
$("#deal-button").prop("disabled", true);
$("#hit-button").prop("disabled", false);
$("#stand-button").prop("disabled", false);
}

// Event listeners
$("#deal-button").click(function() {
newGame();
});

$("#hit-button").click(function() {
hit();
});

$("#stand-button").click(function() {
stand();
});

});