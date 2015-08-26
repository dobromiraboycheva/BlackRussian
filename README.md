# BlackRussian
Teamwork repo for JS APPS course at Telerik Academy 2015

---------------------------------------------------------------------

# How to load the dependencies
* Install bower:
`npm install -g bower`
* Install bower dependencies (bower.json)
Navigate to the project root dir in the console and write:
`bower install`
* Install node.js dependencies (package.json)
Navigate to the project root dir in the console and write:
`npm install`

---------------------------------------------------------------------

# How to play
The game starts with 10 tiles with letters. Put tiles on the board with mouse click. Click on tile will select it. Clicking on an empty square on the board will put the tile there. Or if the same tile is clicked again it will be deselected. To submit the word written ob the board, click on submit button. To skip a turn simply click submit without writing anything on the board.
Only the current player`s name and tiles should be shown per turn.
All of the players` scores should be shown always.

---------------------------------------------------------------------

# Current code structure

##gameManager.cs
holds the current game state: player`s points, board`s state etc.

##gameLogic.cs
contains the entire game logic - who`s turn is next, is the board state valid according to the rules, player`s score calculation etc.

##uiProvider.js
this will be the portal for the entire front-end logic - requesting user input, visualizing game state ect.

---------------------------------------------------------------------
