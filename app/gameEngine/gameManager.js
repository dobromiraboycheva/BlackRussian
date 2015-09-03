/*This module contains only the current game state - what`s the current player score,
 what`s the state of the board, how many letters are left to pull*/
import player from 'app/gameObjects/player.js';
import logicProvider from 'app/gameEngine/gameLogic.js';

var gameManager = (function () {

   // this method should be used to initialize the gameManager`s instance when created
   function init(playersCount, boardSize) {

      this.tilesPool = logicProvider.getShuffledTilesPool();
      this.board = Array.apply(null, Array(boardSize * boardSize))
         .map(function () {
            return null;
         });

      this.board[0] = {
         letter: 'a',
         points: 5
      };

      this.players = getPlayers(playersCount);
      this.players.forEach(function (player) {
         logicProvider.giveNewTilesToPlayer(player, this.tilesPool);
      }, this);
      this.currentPlayer = this.players[0];

      this.gameOver = false;
      return this;
   }

   function makeMove(newBoard, newPlayerTiles) {
      // console.log(newBoard);
      // console.log(newPlayerTiles);

      if (logicProvider.isBoardValid(newBoard)) {
         updateGameState.call(this, newBoard, newPlayerTiles);
         
         // var turnScore = logicProvider.calculateScore(newBoard, this.board);
         // this.currentPlayer.score += turnScore;
         // this.board = newBoard.slice();
         // this.currentPlayer.tiles = newPlayerTiles;
         // logicProvider.giveNewTilesToPlayer(this.currentPlayer, this.tilesPool);
         // this.currentPlayer = logicProvider.getNextPlayer(this.currentPlayer, this.players);
         return true;
      } else {
         return false;
      }

   }

   function updateGameState(newBoard, newPlayerTiles) {
      var turnScore = logicProvider.calculateScore(newBoard, this.board);
      this.currentPlayer.score += turnScore;
      this.board = newBoard.slice();
      this.currentPlayer.tiles = newPlayerTiles;
      logicProvider.giveNewTilesToPlayer(this.currentPlayer, this.tilesPool);
      this.currentPlayer = logicProvider.getNextPlayer(this.currentPlayer, this.players);
      // console.log(this.board);
   }

   // this creates and initializes the player objects for the game. It is called only
   // when a new game instance is created and initialized
   function getPlayers(playersCount) {
      var players = [];
      for (var i = 0; i < playersCount; i += 1) {
         players.push(Object.create(player).init('Player ' + i));
      }
      // console.log(players);
      return players;
   }

   return {
      init: init,
      makeMove: makeMove
   };
}());

export default gameManager;
