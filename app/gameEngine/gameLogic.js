import tile from 'app/gameObjects/tile.js';

var standartGameLogic = (function() {

    function getTilesPool() {
        var tiles = [],
            tilesInOrder = tile.getAllTiles();

        //for (var i = 0; i < 26; i += 1) {
        //    var newLetter = String.fromCharCode(('a'.charCodeAt(0) + i));
        //    var newTile = Object.create(tile).init(newLetter);
        //    tiles.push(newTile);
        //}

        while (tilesInOrder.length) {
            var index = Math.random() * tilesInOrder.length | 0;

            tiles.push(tilesInOrder.splice(index,1));
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
        getTilesPool: getTilesPool,
        giveNewTilesToPlayer: giveNewTilesToPlayer,
        getNextPlayer: getNextPlayer,
        calculateScore: calculateScore,
        isBoardValid: isBoardValid
    };
}());

export default standartGameLogic;
