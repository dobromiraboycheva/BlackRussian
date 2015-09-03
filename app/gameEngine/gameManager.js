/*This module contains only the current game state - what`s the current player score,
 what`s the state of the board, how many letters are left to pull*/
import player from 'app/gameObjects/player.js';
import logicProvider from 'app/gameEngine/gameLogic.js';

var gameManager = (function () {

    // this method should be used to initialize the gameManager`s instance when created
    function init(playersCount, boardSize) {

        this.tilesPool = logicProvider.getShuffledTilesPool();
        this.board = [boardSize * boardSize];
        this.boardMask = [];

        this.players = getPlayers(playersCount);
        this.players.forEach(function (player) {
            logicProvider.giveNewTilesToPlayer(player, this.tilesPool);
        }, this);
        this.currentPlayer = this.players[0];

        this.gameOver = false;
        return this;
    }

    function makeMove(newBoard, playerLeftTiles) {

        if (logicProvider.isBoardValid(newBoard)) {
            updateGameState(newBoard, playerLeftTiles);
            return true;
        } else {
            return false;
        }

    }

    function updateGameState(newBoard, playerLeftTiles) {
        var turnScore = logicProvider.calculateScore(newBoard, board);
        currentPlayer.score += turnScore;
        board = newBoard;
        currentPlayer.tiles = playerLeftTiles;
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
        makeMove: makeMove
    };
}());

export default gameManager;