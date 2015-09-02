New files added to folder:
	* wordDb/word.js - few english words for logic tests /could be used for demonstration/
	
	* wordDb/wordsArray.js - more than 100 000 english words
	
	* calculateScore.js - returns the curretn player's result exports calculateScore(currentPlayer, newWordTiles, tilesOnBoard)
	
	* getWords.js - the function function getGeneratedWords(tiles, board) returns object with two properties: array of words and array of tiles, used for the words returned, or false 	if no words are generated
		- uses imports from wordDb/wordsArray.js for complete word reference, which could be changed with the smaller one wordDb/word.js, where additional words could be added
		- import from ./isBoardValid.js	
	exports getGeneratedWords(tiles, board)
	
	* isBoardValid.js - check the valid state of the board, based on the tile allocation before player's turn and the tiles that the same player places. Returns true or false