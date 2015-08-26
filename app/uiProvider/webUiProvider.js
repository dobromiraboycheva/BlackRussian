import $ from 'jquery';

var webUiProvider = function () {
    function init() {
        $('body').append($('<div />').html('hello world'));
        return this;
    }

    // this is called by gameManager in the main game loop and should return the
    // new board state or the same board if no changes were made
    function makeMove(player, board) {

    }

    // this is also called by gameManager
    function message(msg) {

    }

    return {
        init: init,
        makeMove: makeMove,
        message: message
    };
}();

export default webUiProvider;