import 'jquery';

var domTile = $('<div />').addClass('dash-tile')
   .css({
      width: '20px',
      height: '20px',
      border: '1px solid black',
      display: 'inline-block',
      margin: 0,
      padding: 0
   })
   .html('&nbsp;');

function createPlayerDashboard() {
   var dash = $('<div />').attr('id', 'dash');
   var submitButton = $('<button />').attr('id', 'submit-button').addClass('btn-success').html('Submit');
   submitButton.appendTo(dash);

   var tilesContainer = $('<div />').addClass('tiles-container');
   tilesContainer.appendTo(dash);

   var playerName = $('<div />').attr('id', 'player-name');
   playerName.appendTo(dash);

   return dash;
}

function createBoard(boardSize) {
   var board = $('<div />').attr('id', 'board');

   var boardSquare = $('<div />').addClass('board-square')
      .css({
         width: '30px',
         height: '30px',
         border: '1px solid black',
         display: 'inline-block',
         margin: 0,
         padding: 0
      })
      .html('&nbsp;'); // we need this for CSS

   for (var i = 0; i < boardSize * boardSize; i += 1) {
      var newBoardSquare = boardSquare.clone().attr('index', i);
      board.append(newBoardSquare);
      if ((i + 1) % boardSize === 0) {
         board.append($('</br>'));
      }
   }

   return board;
}

export default {
   createBoard, createPlayerDashboard, domTile
};
