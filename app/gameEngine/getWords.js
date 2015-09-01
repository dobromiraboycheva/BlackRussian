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
    var tiles = [];
    var tile;
    var tilesLengthAdditionalWords = 0;
    // var removedTile;

    if (!validTilesPlacedOnBoard && !freeChecker) {
        console.log('false from getGeneratedWords when checking for checkFreeBoardPosition and validTilesPlacement');
        return false; /*Could throw an Exception also*/
    }

    // fill updatedBoard with letters from board
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
        while (yPosition > -1 && updatedBoard[yPosition][xPosition] !== null) {
            yStart = yPosition;
            yPosition--;
        }
        yPosition++;

        //search for word end
        while (yPosition < updatedBoard[0].length && updatedBoard[yPosition][xPosition] !== null) {
            yEnd = yPosition;
            yPosition++;
        }
        // yPosition--; to return the letter of yPosition in board range

        for (var j = yStart; j <= yEnd; j++) {
            word += updatedBoard[j][xPosition].letter;
            tile = JSON.parse(JSON.stringify(updatedBoard[j][xPosition]));
            tiles.push(tile);
        }

        words.push(word);
        //word = '';


        yPosition = sortedTiles[0].yCoord;

        //looking for additional words generated
        for (var i = sortedTiles[0].yCoord; i <= sortedTiles[sortedTiles.length - 1].yCoord; i++) {
            xPosition = sortedTiles[0].xCoord;
            while (updatedBoard[i][xPosition] !== null && xPosition > -1) {
                xStartAdditionalWords = xPosition;
                xPosition--;
            }
            xPosition++;

            tilesLengthAdditionalWords = tiles.length;

            while (xStartAdditionalWords < updatedBoard[0].length && updatedBoard[i][xStartAdditionalWords] !== null) {
                additionalWords += updatedBoard[i][xStartAdditionalWords].letter;
                tile = updatedBoard[i][xStartAdditionalWords];
                tiles.push(tile);
                xStartAdditionalWords++;
            }

            if(tiles.length - tilesLengthAdditionalWords == 1) {
                tiles.pop();
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
        while (xPosition > -1 && updatedBoard[yPosition][xPosition] !== null) {
            xStart = xPosition;
            xPosition--;
        }

        xPosition = sortedTiles[sortedTiles.length - 1].xCoord;

        //search for word end
        while (xPosition < updatedBoard[0].length && updatedBoard[yPosition][xPosition] !== null) {
            xEnd = xPosition;
            xPosition++;
        }

        for (var p = xStart; p <= xEnd; p++) {
            word += updatedBoard[yPosition][p].letter;
            tile = JSON.parse(JSON.stringify(updatedBoard[yPosition][p]));
            tiles.push(tile);
        }

        words.push(word);
        //word = '';

        xPosition = sortedTiles[0].xCoord;


        //looking for additional words generated
        for (var i = sortedTiles[0].xCoord; i <= sortedTiles[sortedTiles.length - 1].xCoord; i++) {
            yPosition = sortedTiles[0].yCoord;
            while (yPosition > -1 && updatedBoard[yPosition][i] !== null) {
                yStartAdditionalWords = yPosition;
                yPosition--;
            }
            //yPosition++;

            tilesLengthAdditionalWords = tiles.length;

            while (yStartAdditionalWords < updatedBoard[0].length && updatedBoard[yStartAdditionalWords][i] !== null) {
                additionalWords += updatedBoard[yStartAdditionalWords][i].letter;
                tile = updatedBoard[yStartAdditionalWords][i];
                tiles.push(tile);
                yStartAdditionalWords++;
            }

            if(tiles.length - tilesLengthAdditionalWords === 1) {
                tiles.pop();
            }

            if (additionalWords.length > 1) {
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

    return {
        words: words.slice(),
        tiles: tiles.slice()
    }
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