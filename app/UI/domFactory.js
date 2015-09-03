import 'jquery';

function createPlayerDashboard() {
    var dash = $('<div />').attr('id', 'dash');
    var submitButton = $('<button />').attr('id', 'submit-button').addClass('btn-success').html('Submit');
    submitButton.appendTo(dash);
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

    var row = 0;
    var col = 0;
    for (var i = 0; i < boardSize * boardSize; i += 1) {
        var newBoardSquare = boardSquare.clone().attr('row', (i / boardSize) | 0).attr('col', col);
        board.append(newBoardSquare);
        if ((i + 1) % boardSize === 0) {
            board.append($('</br>'));
            col = 0;
        } else {
            col++;
        }
    }

    return board;
}

export default {
    createBoard, createPlayerDashboard
};