import 'jquery';
import GameManager from 'app/gameEngine/gameManager.js';
import domFactory from 'app/UI/domFactory.js';

var selectedTile;
var gameManager = Object.create(GameManager);
var BOARD_SIZE = 15;
var PLAYERS_COUNT = 3;
var uiBoard;
var uiPlayerTiles;

function start() {
   gameManager.init(PLAYERS_COUNT, BOARD_SIZE);

   var gameControl = $('<div />').attr('id', 'game-control').appendTo(document.body);
   gameControl.addClass('text-center');
   gameControl.on('click', '.dash-tile', onTileClick);

   var board = domFactory.createBoard(BOARD_SIZE);
   board.on('click', '.board-square', onBoardSquareClick);
   board.appendTo('#game-control');

   var dash = domFactory.createPlayerDashboard();
   dash.on('click', onDashboardClick);
   dash.on('click', '#submit-button', onSubmitButtonClick);
   dash.appendTo('#game-control');

   drawBoardState();
   drawDashboardState();
}

function onSubmitButtonClick() {

   updateUiObjectsState();

   var isMoveValid = gameManager.makeMove(uiBoard, uiPlayerTiles);

   if (!isMoveValid) {
      alert('Invalid move');
   }

   drawBoardState();
   drawDashboardState();
}

function updateUiObjectsState() {
   uiBoard = gameManager.board.slice();
   // console.log(uiBoard);
   uiPlayerTiles = gameManager.currentPlayer.tiles.slice();
   var playerTileToPop;

   uiBoard.forEach(function (currentBoardTile, index, uiBoard) {
      var boardSquare = $('.board-square[index="' + index + '"]');

      if (boardSquare.children().length > 0 && !boardSquare.hasClass('fixed-tile')) {
         var letterOnBoard = boardSquare.children().html();

         uiPlayerTiles.forEach(function (tile) {
            if (tile.letter === letterOnBoard) {
               playerTileToPop = tile;
            }
         });

         uiBoard[index] = playerTileToPop;
         uiPlayerTiles = uiPlayerTiles.filter(function (tile) {
            return tile !== playerTileToPop;
         });
      }
   });

   // console.log(uiBoard);
}

function drawBoardState() {
   var board = gameManager.board;
   // console.log(board);
   board.forEach(function (tile, index) {
      if (tile) {
         var boardSquare = $('.board-square[index="' + index + '"]');
         var boardTile = domFactory.domTile.clone().addClass('fixed-tile').html(tile.letter);
         boardSquare.html(boardTile).append('&nbsp;');
      }
   });
}

function drawDashboardState() {
   var playerTiles = gameManager.currentPlayer.tiles;
   var dash = $('#dash');
   var dashTile = domFactory.domTile;
   var playerName = gameManager.currentPlayer.name;
   var tilesContainer = $('.tiles-container').html('');



   playerTiles.forEach(function (tile) {
      tilesContainer.append(dashTile.clone().html(tile.letter));
   });

   $('#player-name').html('').append(playerName);
}

function onDashboardClick() {
   if (selectedTile && this !== selectedTile.parent()[0]) {
      selectedTile.css('background', '');
      $('.tiles-container').append(selectedTile);
      selectedTile = null;
   }
}

function onTileClick() {
   var clickedTile = $(this);
   if (clickedTile.hasClass('fixed-tile')) {
      return;
   }

   if (!selectedTile) {
      selectedTile = clickedTile.css('background', '#999');
   } else if (clickedTile[0] === selectedTile[0]) {
      clickedTile.css('background', '');
      selectedTile = null;
   } else {
      selectedTile.css('background', '');
      selectedTile = clickedTile.css('background', '#999');
   }
}

function onBoardSquareClick() {
   var clickedSquare = $(this);

   if (selectedTile && clickedSquare[0] !== selectedTile.parent()[0] && clickedSquare.children().length === 0) {
      clickedSquare.append(selectedTile);
      selectedTile.css('background', '');
      selectedTile = null;
   }
}

export default {
   start
};
