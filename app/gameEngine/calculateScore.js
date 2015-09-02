
// newWordTiles = getWords.getGeneratedWords(tiles, board)

function calculateScore(currentPlayer, newWordTiles, tilesOnBoard) {
    var currentPlayerScore = currentPlayer.score;
    var result = newWordTiles.reduce(function(currentPlayerScore, tile) {
        return currentPlayerScore + tile.points;
    }, currentPlayerScore);
}

export default calculateScore;