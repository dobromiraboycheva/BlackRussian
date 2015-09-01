var db = require('../wordDB/word.js')();
//////////////////////////start test scenarios///////////////////////////////////////////////
var newTiles = [{value: 'p', xCoord: 4, yCoord: 1},
                {value: 'e', xCoord: 5, yCoord: 1},
                { value: 'n', xCoord: 6, yCoord: 1}];
//var board = [{xCoord: 2, yCoord: 7}];


var boardAfterPlayersTurn = [[null, null, null, {value: 'c', xCoord: 3, yCoord: 0}, null, null, null],
    [null, null, null, {value: 'o', xCoord: 3, yCoord: 1}, {value: 'p', xCoord: 4, yCoord: 1}, {
        value: 'e',
        xCoord: 5,
        yCoord: 1
    }, {value: 'n', xCoord: 6, yCoord: 1}],
    [null, null, null, {value: 'o', xCoord: 3, yCoord: 2}, null, null, null],
    [{value: 'p', xCoord: 0, yCoord: 3}, {value: 'a', xCoord: 1, yCoord: 3}, {
        value: 'c',
        xCoord: 2,
        yCoord: 3
    }, {value: 'k', xCoord: 3, yCoord: 3}, null, null, null]
];

var testBoard = [[null, null, null, {value: 'c', xCoord: 3, yCoord: 0}, null, null, null],
    [null, null, null, {value: 'o', xCoord: 3, yCoord: 1}, null, null, null],
    [null, null, null, {value: 'o', xCoord: 3, yCoord: 2}, null, null, null],
    [{value: 'p', xCoord: 0, yCoord: 3}, {value: 'a', xCoord: 1, yCoord: 3}, {value: 'c', xCoord: 2, yCoord: 3}, {value: 'k', xCoord: 3, yCoord: 3}, null, null, null]
];
//////////////////////////end test scenarios///////////////////////////////////////////////

// checks if the tile is placed on an already seized place

function checkFreeBoardPosition(tiles, board) {
    for (var k = 0; k < tiles.length; k++) {
        if (board[tiles[k].yCoord][tiles[k].xCoord] !== null) {
            console.log('false from checkFreeBoardPosition');
            return false;
        }
    }
    console.log('true from checkFreeBoardPosition');
    return true;
}

function isVerticalWord(tiles) {
    console.log(tiles[0].xCoord === tiles[1].xCoord + ' from isVerticalWord');
    return tiles[0].xCoord === tiles[1].xCoord;
}

// validates if the tiles are placed randomly on the board
function validTilesPlacement(tiles) {
    for (var i = 1; i < tiles.length; i++) {
        if (isVerticalWord(tiles)) {
            if (tiles[i].xCoord !== tiles[i - 1].xCoord) {
                console.log('false from validTilesPlacement');
                return false;
            }
        }
        else {
            if (tiles[i].yCoord !== tiles[i - 1].yCoord) {
                console.log('false from validTilesPlacement');
                return false;
            }
        }
    }
    console.log('true from validTilesPlacement');
    return true;
}

function getGeneratedWords(tiles, board) {
    var words = [];
    var word = '';
    var sortedTiles = [];
    var xPosition;
    var yPosition;
    var yStart;
    var yEnd;
    var xStart;
    var xEnd;
    var xStartAdditionalWords;
    var yStartAdditionalWords;
    var additionalWords = '';
    var freeChecker = checkFreeBoardPosition(tiles, board);
    var validTilesPlacedOnBoard = validTilesPlacement(tiles);
    var updatedBoard = [];

    if (!validTilesPlacedOnBoard && !freeChecker) {
        console.log('false from getGeneratedWords when checking for checkFreeBoardPosition and validTilesPlacement');
        return false; /*Could throw an Exception also*/
    }

    // fill updatedBoard with values from board
    for (var pos = 0; pos < board.length; pos++) {
        updatedBoard[pos] = board[pos].slice();
    }

    // add new tiles to updatedBoard
    for (var t = 0; t < tiles.length; t++) {
        updatedBoard[tiles[t].yCoord][tiles[t].xCoord] = tiles[t];
    }

    // console.log(updatedBoard);

    if (isVerticalWord(tiles)) {
        sortedTiles = tiles.sort(function (a, b) {
            return a.yCoord - b.yCoord;
        });

        xPosition = sortedTiles[0].xCoord;
        yPosition = sortedTiles[0].yCoord;

        // search for word start
        while (updatedBoard[yPosition][xPosition] !== null && yPosition > -1) {
            yStart = yPosition;
            yPosition--;
        }
        yPosition++;

        //search for word end
        while (updatedBoard[yPosition][xPosition] !== null && yPosition < updatedBoard[0].length) {
            yEnd = yPosition;
            yPosition++;
        }
        // yPosition--; to return the value of yPosition in board range

        for (var j = yStart; j <= yEnd; j++) {
            word += updatedBoard[j][xPosition].value;
        }

        words.push(word);
        //word = '';

        xPosition = sortedTiles[0].xCoord;
        yPosition = sortedTiles[0].yCoord;

        //looking for additional words generated
        for (var i = sortedTiles[0].yCoord; i <= sortedTiles[sortedTiles.length - 1].yCoord; i++) {
            while (updatedBoard[i][xPosition] !== null && xPosition > -1) {
                xStartAdditionalWords = xPosition;
                xPosition--;
            }
            xPosition++;

            while (updatedBoard[i][xStartAdditionalWords] !== null && xStartAdditionalWords < updatedBoard[0].length) {
                additionalWords += updatedBoard[i][xStartAdditionalWords].value;
                xStartAdditionalWords++;
            }

            if (additionalWords.lengh > 1) {
                words.push(additionalWords);
            }
            additionalWords = '';
            xPosition = sortedTiles[0].xCoord;
        }
    }
    else {
        sortedTiles = tiles.sort(function (a, b) {
            return a.xCoord - b.xCoord;
        });

        xPosition = sortedTiles[0].xCoord;
        yPosition = sortedTiles[0].yCoord;

        // search for word start
        while (updatedBoard[yPosition][xPosition] !== null && xPosition > -1) {
            xStart = xPosition;
            xPosition--;
        }

        xPosition = sortedTiles[sortedTiles.length - 1].xCoord;

        //search for word end
        while (updatedBoard[yPosition][xPosition] !== null && xPosition < updatedBoard[0].length) {
            xEnd = xPosition;
            xPosition++;
        }

        for (var p = xStart; p <= xEnd; p++) {
            word += updatedBoard[yPosition][p].value;
        }

        words.push(word);
        //word = '';

        xPosition = sortedTiles[0].xCoord;
        yPosition = sortedTiles[0].yCoord;

        //looking for additional words generated
        for (var i = sortedTiles[0].xCoord; i <= sortedTiles[sortedTiles.length - 1].xCoord; i++) {
            while (updatedBoard[yPosition][i] !== null && yPosition > -1) {
                yStartAdditionalWords = yPosition;
                yPosition--;
            }
            yPosition++;

            while (updatedBoard[yStartAdditionalWords][i] !== null && yStartAdditionalWords < updatedBoard[0].length) {
                additionalWords += updatedBoard[yStartAdditionalWords][i].value;
                yStartAdditionalWords++;
            }

            if (additionalWords.lengh > 1) {
                words.push(additionalWords);
            }
            additionalWords = '';
            yPosition = sortedTiles[0].yCoord;
        }
    }

    if (!wordChecker(words)) {
        console.log('false from wordChecker inside getGeneratedWords');
        return false;
    }

    return words;
}

function wordChecker(words) {
    for (var word = 0; word < words.length; word++) {
        if (db.indexOf(words[word]) === -1) {
            console.log('false from wordChecker');
            return false;
        }
    }
    return true;
}

function validateBoard(tiles, board) {

    var words = getGeneratedWords(tiles, board);
    if (!words) {
        console.log('false from getGeneratedWords inside validateBoard');
        return false; /*Could throw an Exception also*/
    }

    return words;
}

console.log(validateBoard(newTiles, testBoard));