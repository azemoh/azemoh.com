---
layout: post
title:  "Tic-tac-toe strategy: Implementing the Minimax Algorithm"
date:   2016-04-27 09:30:00
---

This is an update to [Ire Aderinokun's](http://twitter.com/ireaderinokun) [post](http://bitsofco.de/tic-tac-toe-revisited/) about a game of [Tic-tac-toe](http://ireade.github.io/tic-tac-toe-2/) she built. I made the Computer player unbeatable using the Minimax Algorithm and she encouraged me to write about it. I will focus on the Computer player's strategy so check out her initial [blog post](http://bitsofco.de/tic-tac-toe-revisited/) to see how she built the game. Play against my [AI player](http://azemoh.github.io/tic-tac-toe/) and checkout the [code](https://github.com/azemoh/tic-tac-toe).


## Tic-tac-toe strategy
A perfect Tic-tac-toe player will always win or draw and if the opponent is also a perfect player the game will always end in a draw. Normally as human players we think ahead and try to make moves based on the current state of the game, and what we think the opponent will do next. Some basic strategy include:

- <b>Win:</b> If a player has two pieces in a row, they should place a third to win the game.
- <b>Block:</b> If the opponent has two pieces in a row, the player should place his piece to prevent a win for the opponent.
- <b>Fork:</b> Create an opportunity where the player has two possible ways to win.
- <b>Blocking an opponent's fork:</b> If there is an opportunity where the opponent can create a fork, the player should block that fork and so on.

To create an intelligent player we need to make the computer simulate the same forward thinking and enable it to make decisions just like we would. To accomplish this the Minimax algorithm is used to generate every possible move based on the current state of the game and choose the move that would most likely lead to a loss for the opponent.

## Minimax Algorithm
The [Minimax Algorithm](https://en.wikipedia.org/wiki/Minimax) is used to determine the next move in games where players take turns, by minimizing the opponent's (referred to as the minimizing player) chances of wining. Thereby maximizing the player's (referred to as the maximizing player) chances of wining.

The Minimax Algorithm generates every possible move by means of [recursion](https://en.wikipedia.org/wiki/Recursion_%28computer_science%29) and assigns a score to each move. The move with the highest score is then selected and returned. The score for a move is calculated by a function that evaluates the current state of the game and determines how good that move is for the current player. The higher the score, the better.

### Implementation
Let's walk through the implementation. We define Minimax as a function that receives two arguments: `dept` and `player`. We use the `dept` parameter to determine how many moves ahead the computer should simulate, and the `player`, represented as `"X"` or `"O"` to keep track of the current player.


```javascript
function miniMax(dept, player) {
  var bestMove = -1;
  var bestScore = (player === "O") ? -Infinity : Infinity;
  ...
}
```

To begin, a `bestScore` variable is initialized to negative `Infinity` if the current player is the maximizing player, and positive `Infinity` if the current player is the minimizing player i.e the opponent.

The Minimax algorithm is a recursive algorithm so we need a base case that returns an actual value to prevent further calls to itself.


```javascript
function miniMax(dept, player) {
  var bestMove = -1;
  var bestScore = (player === "O") ? -Infinity : Infinity;

  if (over() || dept === 0) {
    bestScore = scoreBoard();
    return [bestScore, bestMove];
  }
  ...
}
```

The function `returns` the `bestScore` and `bestMove` when the game is over, or when the `dept` parameter becomes zero. `over()` is a predefined function that checks if the game is won or the game board if full. So we need to stop generating moves when this condition is met and return a score for that move which is calculated by another function `scoreBoard()`.

Next we call a function that returns an array of possible/un-played moves, than we use a for loop to iterate over each move and place the current player's piece on the board.

```javascript
function miniMax(dept, player) {
  ...
  var validMoves = possibleMoves();

  // Iterate over the possible moves and try each.
  for (var i = 0; i < validMoves.length; i++) {
    board[validMoves[i] - 1] = player; // Make the move. (account for array index)
  ...
}
```

At this point, we check to see who the current `player` is and call the `miniMax` function with the opposing player's piece. We also decrease the `dept` variable by one.

```javascript
function miniMax(dept, player) {
  ...
  // Iterate over the possible moves and try each.
  for (var i = 0; i < validMoves.length; i++) {
    board[validMoves[i] - 1] = player; // Make the move. (account for array index)

    if (player === "O") { // maximizing player's turn
      var score = miniMax(dept-1, "X")[0];
      ...
    } else { // opponent's/minimizing player's turn
      var score = miniMax(dept-1, "O")[0]
      ...
    }
  ...
}
```

The score result for the recursive call is then compared with the current `bestScore`. Keeping with the idea of maximizing the player's chances and minimizing the opponent's chances, If it's the maximizing player's turn, we set `bestScore` to the score result, and `bestMove` to the current move, if `bestScore` is less than the score result. And if it's the minimizing player's turn and the `bestScore` is greater than the score result, we set `bestScore` to the score result, and `bestMove` to the current move.

```javascript
function miniMax(dept, player) {
  ...
    if (player === "O") { // maximizing player's turn
      var score = miniMax(dept-1, "X")[0];

      if (bestScore < score) {
        bestScore = score;
        bestMove = validMOves[i];
      }
    } else { // opponent's/minimizing player's turn
      var score = miniMax(dept-1, "O")[0]

      if (bestScore > score) {
        bestScore = score;
        bestMove = validMOves[i];
      }
    }
  ...
}
```

Finally we undo the current move so we can try other moves then `return` `bestScore` and `bestMove`.

```javascript
function miniMax(dept, player) {
  ...
  // Iterate over the possible moves and try each.
  for (var i = 0; i < validMoves.length; i++) {
    board[validMoves[i] - 1] = player; // Make the move. (account for array index)
    ...
    board[validMoves[i] - 1] = "" // Undo move
  }

  return [bestScore, bestMove]
}
```
Putting it all together:

```javascript
/**
 * Determine the best move for Computer player.
 * @param {Number} dept - Dept of game tree
 * @param {string} player - Current player's piece, X or O
 * @returns {Array} Array containing bestMove and bestScore
 */
function miniMax(dept, player) {
  var bestMove = -1;
  var bestScore = (player === "O") ? -Infinity : Infinity;

  if (over() || dept === 0) {
    bestScore = scoreBoard();
    return [bestScore, bestMove];
  }

  var validMoves = possibleMoves();

  // Iterate over the possible moves and try each.
  for (var i = 0; i < validMoves.length; i++) {
    board[validMoves[i] - 1] = player; // Make the move. (account for array index)

    if (player === "O") { // maximizing player's turn
      var score = miniMax(dept-1, "X")[0];

      if (bestScore < score) {
        bestScore = score;
        bestMove = validMoves[i];
      }

    } else { // opponent's/minimizing player's turn
      var score = miniMax(dept-1, "O")[0]

      if (bestScore > score) {
        bestScore = score;
        bestMove = validMoves[i];
      }
    }

    board[validMoves[i] - 1] = ""; // Undo move
  }

  return [bestScore, bestMove]
}
```

### Scoring Game state. `scoreBoard()`
The `scoreBoard()` function iterate through an array of predefined win combinations after a move is made and returns a score for the current state of the game. This can be done differently but my implementation returns `100` for an immediate win and `-100` for an immediate loss. `10` for two in a row and `-10` for two in a row for the opponent. The function also returns `20` if there is a chance for a fork, so a fork would be preferred to a move that would yield just two in a row. See full [implementation](https://github.com/azemoh/tic-tac-toe/blob/gh-pages/tictactoe.js#L278).

### Improving Efficiency
Despite Tic-tac-toe's simplicity, it has about [362,880](https://en.wikipedia.org/wiki/Tic-tac-toe#Combinatorics) (9! Factorial) possible moves, imagine that number for a game like Chess. To improve the Minimax Algorithm's efficiency, [Alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) is used. Alpha-beta pruning is a search algorithm that reduces the amount of moves the Minimax Algorithm generates, by ignoring moves that will not influence the final decision. See the [implementation](https://github.com/azemoh/tic-tac-toe/blob/gh-pages/tictactoe.js#L208).

I hope this has been helpful. Don't forget to [play](http://azemoh.github.io/tic-tac-toe/) the game and checkout the code on [Github](https://github.com/azemoh/tic-tac-toe).
