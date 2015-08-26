/*This module contains only the current game state - what`s the current player score,
what`s the state of the board, how many letters are left to pull*/
import player from 'app/gameObjects/player.js';

var gameManager = function() {

    // this method should be used to initialize the gameManager`s instance when created
    function init(uiProvider, logicProvider, playersCount) {
        this.uiProvider = uiProvider;
        this.logicProvider = logicProvider;

        this.tilesPool = logicProvider.getGameTiles();
        this.board = [];

        this.players = getPlayers(playersCount);
        this.players.forEach(function (player) {
            logicProvider.giveNewTilesToPlayer(player, this.tilesPool);
        }, this);
        this.currentPlayer = this.players[0];

        this.gameOver = false;
        return this;
    }

    // this is the main game loop
    function startGame() {
        console.log('game started!');
        // while (!gameOver) {
        //     var newBoard = uiProvider.makeMove(currentPlayer, board);            
        //     if (!logicProvider.validateBoard(newBoard)) {
        //         uiProvider.message("Invalid move!");
        //         continue;
        //     }

        //     updateGameState(newBoard);
        // }
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
        for (var i = 0; i < playersCount; i+=1) {
            players.push(Object.create(player).init('Player ' + i));
        }
        
        return players;
    }

    return {
        init: init,
        startGame: startGame,
    };
}();

export default gameManager;