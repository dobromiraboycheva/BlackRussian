/*This module contains only the current game state - what`s the current player score,
 what`s the state of the board, how many letters are left to pull*/
import player from 'app/gameObjects/player.js';
import logicProvider from 'app/gameEngine/gameLogic.js';

<<<<<<< HEAD
var gameManager = (function() {
=======
var gameManager = (function () {
>>>>>>> e912aa02a1e53833a0ce2cdc84e60a23ac2b6cbf

    // this method should be used to initialize the gameManager`s instance when created
    function init(playersCount) {

<<<<<<< HEAD
        this.tilesPool = logicProvider.getTilesPool();
=======
        this.tilesPool = logicProvider.getShuffledTilesPool();
>>>>>>> e912aa02a1e53833a0ce2cdc84e60a23ac2b6cbf
        this.board = [];

        this.players = getPlayers(playersCount);
        this.players.forEach(function(player) {
            logicProvider.giveNewTilesToPlayer(player, this.tilesPool);
        }, this);
        this.currentPlayer = this.players[0];

        this.gameOver = false;
        return this;
    }

    function makeMove(newBoard) {
<<<<<<< HEAD
        
=======

>>>>>>> e912aa02a1e53833a0ce2cdc84e60a23ac2b6cbf
        if (logicProvider.isBoardValid(newBoard)) {
            updateGameState(newBoard);
        }

    }

    function updateGameState(newBoard) {
        var turnScore = logicProvider.calculateScore(newBoard, board);
        currentPlayer.score += turnScore;
        board = newBoard;
        logicProvider.giveNewTilesToPlayer(currentPlayer, tilesPool);
        currentPlayer = logicProvider.getNextPlayer(currentPlayer, players);
    }

    // this creates and initializes the player objects for the game. It is called only
    // when a new game instance is created and initialized
    function getPlayers(playersCount) {
        var players = [];
        for (var i = 0; i < playersCount; i += 1) {
            players.push(Object.create(player).init('Player ' + i));
        }

        return players;
    }

    return {
        init: init,
<<<<<<< HEAD
        makeMove: makeMove,
=======
        makeMove: makeMove
>>>>>>> e912aa02a1e53833a0ce2cdc84e60a23ac2b6cbf
    };
}());

export default gameManager;