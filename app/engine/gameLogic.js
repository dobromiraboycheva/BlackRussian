var standartGameLogic = function () {
    function init() {
        
    }

    function getGameTiles() {
        import tile from 'app/gameObjects/tile.js';

        // TODO: Implement better generator for game letters, this is just for testing
        // the real game has repeating letters
        var tiles = [];
        for (var i = 0; i < 26; i+=1) {
            var newLetter = String.fromCharCode(('a'.charCodeAt(0) + i));
            var newTile = Object.create(tile).init(newLetter);
            tiles.push(newTile);
        }
    }

    function giveNewTilesToPlayer(player, tilesPool) {
        while (player.tiles < 10 || tilesPool.length === 0) {
            player.tiles.push(tilesPool.pop());
        }
    }

    function getNextPlayer(currentPlayer, players) {
        var currentPlayerIndex;
        players.forEach(function (player, index) {
            if (currentPlayer = player) {
                currentPlayerIndex = index;
            }
        });

        currentPlayerIndex = ((currentPlayerIndex + 1) < players.length) ? currentPlayerIndex++ : currentPlayerIndex = 0;

        return players[currentPlayerIndex];
    }

    function calculateScore(currentPlayer, newWordTiles, tilesOnBoard) {
        throw;
    }

    function validateBoard(board) {
        throw;
    }
}();

export default standartGameLogic;