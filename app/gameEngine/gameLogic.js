import tile from 'app/gameObjects/tile.js';

var standartGameLogic = (function() {

    function getGameTiles() {

        // TODO: Implement better generator for game letters, this is just for testing
        // the real game has repeating letters
        var tiles = [];
        for (var i = 0; i < 26; i += 1) {
            var newLetter = String.fromCharCode(('a'.charCodeAt(0) + i));
            var newTile = Object.create(tile).init(newLetter);
            tiles.push(newTile);
        }
        
        return tiles;
    }

    function giveNewTilesToPlayer(player, tilesPool) {
        while (player.tiles.length < 10 && tilesPool.length > 0) {
            player.tiles.push(tilesPool.pop());
        }
    }

    function getNextPlayer(currentPlayer, players) {
        var currentPlayerIndex;
        players.forEach(function(player, index) {
            if (currentPlayer === player) {
                currentPlayerIndex = index;
            }
        });

        currentPlayerIndex = ((currentPlayerIndex + 1) < players.length) ? currentPlayerIndex++ : currentPlayerIndex = 0;

        return players[currentPlayerIndex];
    }

    function calculateScore(currentPlayer, newWordTiles, tilesOnBoard) {
        // TODO: Implement logic!
        return 0;
    }

    function isBoardValid(board) {
        // TODO: Implement logic
        return true;
    }

    return {
        getGameTiles: getGameTiles,
        giveNewTilesToPlayer: giveNewTilesToPlayer,
        getNextPlayer: getNextPlayer,
        calculateScore: calculateScore,
        isBoardValid: isBoardValid
    };
}());

export default standartGameLogic;