var gameManager = function() {
    function init(uiProvider, logicProvider, playersCount) {
        this.uiProvider = uiProvider;
        this.logicProvider = logicProvider;

        this.players = getPlayers(playersCount);
        players.forEach(function (player) {
            logicProvider.giveNewTilesToPlayer(player, tilesPool);
        });
        this.currentPlayer = this.players[0];

        this.tilesPool = logicProvider.getGameTiles();
        this.board = [];

        this.gameOver = false;
    }



    function gameLoop() {

        while (!gameOver) {
            var newBoard = uiProvider.getMove(currentPlayer, board);
            
            if (!logicProvider.validateBoard(newBoard)) {
                uiProvider.message("Invalid move!");
                continue;
            }

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

    function getPlayers(playersCount) {
        import player from 'app/gameObjects/player.js';
        var players = [];
        for (var i = 0; i < playersCount; i+=1) {
            players.push(Object.create(player).init('Player ' + i));
        }
        
        return players;
    }

}();