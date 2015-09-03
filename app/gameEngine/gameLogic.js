import Tile from 'app/gameObjects/tile.js';

function generateGameTiles() {
    var allTiles = [],
        LETTER_POINTS = {
            '0': {
                'й': 2
            },
            '1': {
                'а': 9,
                'е': 8,
                'и': 8,
                'н': 4,
                'о': 9,
                'п': 4,
                'р': 4,
                'с': 4,
                'т': 5
            },
            '2': {
                'б': 3,
                'в': 4,
                'д': 4,
                'к': 3,
                'л': 3,
                'м': 4
            },
            '3': {
                'г': 3,
                'ъ': 2
            },
            '4': {
                'ж': 2,
                'з': 2
            },
            '5': {
                'й': 1,
                'у': 3,
                'х': 1,
                'ч': 2,
                'я': 2
            },
            '8': {
                'ц': 1,
                'ш': 1,
                'ю': 1
            },
            '10': {
                'ф': 1,
                'щ': 1,
                'ь': 1
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

        tiles.push(tilesInOrder.splice(index, 1)[0]);
    }

    return tiles;
}

function giveNewTilesToPlayer(player, tilesPool) {
    // console.log(player);
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

    if (currentPlayerIndex + 1 >= players.length) {
        currentPlayerIndex = -1;
    }

    return players[currentPlayerIndex + 1];
}

function calculateScore(newBoard, board) {
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