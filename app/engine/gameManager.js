var gameManager = function() {
    function init(inputProvider, outputProvider, logicProvider, playersCount) {
        this.inputProvider = inputProvider;
        this.outputProvider = outputProvider;
        this.logicProvider = logicProvider;

        this.players = getPlayers(playersCount);
        players.forEach(function (player) {
            logicProvider.giveNewTilesToPlayer(player, tilesPool);
        });
        this.currentPlayer = this.players[0];

        this.tilesPool = logicProvider.getGameTiles();
        this.tilesOnBoard = [];

        this.gameOver = false;
    }



    function gameLoop() {
        outputProvider.displayGameState(currentPlayer, players, tilesOnBoard);

        while (!gameOver) {
            outputProvider.displayMessage("Make move");
            var newWordTiles = inputProvider.getMove();

            if (!logicProvider.validateMove(newWordTiles, tilesOnBoard)) {
                outputProvider.displayMessage("Invalid move");
                continue;
            }

            updateGameState(newWordTiles);

            outputProvider.displayGameState(currentPlayer, players, tilesOnBoard);
            }
        }
    }

    function updateGameState(newWordTiles) {
        logicProvider.calculateScore(currentPlayer, newWordTiles, tilesOnBoard);
        tilesOnBoard.concat(newWordTiles);
        logicProvider.giveNewTilesToPlayer(currentPlayer, tilesPool);
        currentPlayer = logicProvider.getNextPlayer(currentPlayer, players);
    }

    function getPlayers(playersCount) {
        import player from 'app/gameObjects/player.js';
        var players = [];
        for (var i = 0; i < playersCount; i+=1) {
            players.push(Object.create(player).init('Player ' + i));
        }
        
        return players;
    }

}();