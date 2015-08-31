var db = require('../wordDB/word.js')();
//////////////////////////start test scenarios///////////////////////////////////////////////
var newTiles = [{value: 'p', xCoord: 4, yCoord: 1}, {value: 'e', xCoord: 5, yCoord: 1}, {
    value: 'n',
    xCoord: 6,
    yCoord: 1
}];
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
    [{value: 'p', xCoord: 0, yCoord: 3}, {value: 'a', xCoord: 1, yCoord: 3}, {
        value: 'c',
        xCoord: 2,
        yCoord: 3
    }, {value: 'k', xCoord: 3, yCoord: 3}, null, null, null]
];
//////////////////////////end test scenarios///////////////////////////////////////////////

// first check words in dictionary
function validateBoard(tiles, board) {

    var words = getGeneratedWords(tiles, board);
    if (!words) {
        return false; /*Could throw an Exception also*/
    }


}
// first check words in dictionary


// checks if the tile is placed on an already seized place
function checkFreeBoardPosition(tiles, board) {
    for (var k = 0; k < tiles.length; k++) {
        if (board[tiles[k].xCoord][tiles[k].yCoord] !== null) {
            return false;
        }
    }
    return true;
}

function isVerticalWord(tiles) {
    return tiles[0].xCoord === tiles[1].xCoord;
}

// validates if the tiles are placed randomly on the board
function validTilesPlacement(tiles) {
    for (var i = 1; i < tiles.length; i++) {
        if (isVerticalWord(tiles)) {
            if (tiles[i].yCoord !== tiles[i - 1].yCoord) {
                return false;
            }
        }
        else {
            if (tiles[i].xCoord !== tiles[i - 1].xCoord) {
                return false;
            }
        }
    }
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

    if (!checkFreeBoardPosition(tiles, board) && !validTilesPlacement(tiles)) {
        return false; /*Could throw an Exception also*/
    }

    if (isVerticalWord(tiles)) {
        sortedTiles = tiles.sort(function (a, b) {
            return a.yCoord - b.yCoord;
        });

        xPosition = sortedTiles[0].xCoord;
        yPosition = sortedTiles[0].yCoord;

        // search for word start
        while (board[xPosition][yPosition] !== null && yPosition > -1) {
            yStart = yPosition;
            yPosition--;
        }
        yPosition++;

        //search for word end
        while (board[xPosition][yPosition] !== null && yPosition < board[0].length) {
            yEnd = yPosition;
            yPosition++;
        }
        // yPosition--; to return the value of yPosition in board range

        for (var j = yStart; j <= yEnd; j++) {
            word += board[xPosition][j].value;
        }

        words.push(word);
        //word = '';

        xPosition = sortedTiles[0].xCoord;
        yPosition = yStart;

        //looking for additional words generated
        for (var i = yStart; i <= yEnd; i++) {
            while (board[xPosition][yPosition] !== null && xPosition > -1) {
                xStartAdditionalWords = xPosition;
                xPosition--;
            }
            xPosition++;

            while (board[xStartAdditionalWords][yPosition] !== null && xStartAdditionalWords < board[0].length) {
                additionalWords += board[xStartAdditionalWords][yPosition].value;
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
        while (board[xPosition][yPosition] !== null && xPosition > -1) {
            xStart = xPosition;
            xPosition--;
        }
        xPosition++;

        //search for word end
        while (board[xPosition][yPosition] !== null && xPosition < board[0].length) {
            xEnd = xPosition;
            xPosition++;
        }

        for (var p = xStart; p <= xEnd; p++) {
            word += board[p][yPosition].value;
        }

        words.push(word);
        //word = '';

        xPosition = xStart;
        yPosition = sortedTiles[0].yCoord;

        //looking for additional words generated
        for (var i = xStart; i <= xEnd; i++) {
            while (board[i][yPosition] !== null && yPosition > -1) {
                yStartAdditionalWords = yPosition;
                yPosition--;
            }
            yPosition++;

            while (board[xPosition][yStartAdditionalWords] !== null && yStartAdditionalWords < board[0].length) {
                additionalWords += board[xPosition][yStartAdditionalWords].value;
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
        return false;
    }

    return words;
}

function wordChecker(words) {
    for (var word = 0; word < words.length; word++) {
        if (indexOf(words[word]) === -1) {
            return false;
        }
    }
    return true;
}