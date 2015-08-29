/*This module contains only the current game state - what`s the current player score,
what`s the state of the board, how many letters are left to pull*/
import player from 'app/gameObjects/player.js';

var gameManager = function() {

    // this method should be used to initialize the gameManager`s instance when created
    function init(logicProvider, playersCount) {

        this.logicProvider = logicProvider;

        this.tilesPool = logicProvider.getGameTiles();
        this.board = [];

        this.players = getPlayers(playersCount);
        this.players.forEach(function(player) {
            logicProvider.giveNewTilesToPlayer(player, this.tilesPool);
        }, this);
        this.currentPlayer = this.players[0];

        this.gameOver = false;
        return this;
    }

    // this is the main game loop
    function makeMove(newBoard) {
        var response = {
            board: this.board,
            player: currentPlayer,
            msg: '',
        };

        if (logicProvider.isBoardValid(newBoard)) {
            updateGameState(newBoard);
        } else {
            response.msg = 'Invalid move!';
        }

        return response;
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
        makeMove: makeMove,
    };
}();

export default gameManager;