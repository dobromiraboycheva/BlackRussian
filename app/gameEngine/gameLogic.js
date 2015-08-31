import Tile from 'app/gameObjects/tile.js';

function generateGameTiles() {
    var allTiles = [],
        LETTER_POINTS = {
            '0': {
                'blank': 2
            },
            '1': {
                'a': 9,
                'e': 8,
                'i': 8,
                'n': 4,
                'o': 9,
                'p': 4,
                'r': 4,
                's': 4,
                't': 5
            },
            '2': {
                'b': 3,
                'v': 4,
                'd': 4,
                'k': 3,
                'l': 3,
                'm': 4
            },
            '3': {
                'g': 3,
                'aa': 2
            },
            '4': {
                'j': 2,
                'z': 2
            },
            '5': {
                'ikaratko': 1,
                'u': 3,
                'h': 1,
                'ch': 2,
                'q': 2
            },
            '8': {
                'c': 1,
                'sh': 1,
                'iu': 1
            },
            '10': {
                'f': 1,
                'sht': 1,
                'ermaluk': 1
            }
        };

    for (var points in LETTER_POINTS) {
        for (var letter in LETTER_POINTS[points]) {
            for (var count = 0; count < LETTER_POINTS[points][letter]; count++) {
                var newTile = Object.create(Tile).init(letter, points);
                allTiles.push(newTile);
            }
        }
    }

    return allTiles;
}

function getShuffledTilesPool() {
    var tiles = [],
        tilesInOrder = generateGameTiles();

    while (tilesInOrder.length) {
        var index = Math.random() * tilesInOrder.length | 0;

        tiles.push(tilesInOrder.splice(index, 1));
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

export default {
    getShuffledTilesPool,
    giveNewTilesToPlayer,
    getNextPlayer,
    calculateScore,
    isBoardValid
};