import $ from 'jquery';
import GameManager from 'app/gameEngine/gameManager.js';
import domFactory from 'app/UI/domFactory.js';

var playScreen = (function() {

    var selectedTile;
    var gameManager = Object.create(GameManager);

    function start() {
        var PLAYERS_COUNT = 2;
        gameManager.init(PLAYERS_COUNT);

        var gameControl = $('<div />').attr('id', 'game-control').appendTo(document.body);
        gameControl.on('click', '.dash-tile', onTileClick);

        var board = domFactory.createBoard();
        board.on('click', '.board-square', onBoardSquareClick);
        board.appendTo('#game-control');

        var dash = domFactory.createPlayerDashboard();
        dash.on('click', onDashboardClick);
        var submitButton = $('#dash button');
        submitButton.on('click', gameManager.makeMove);

        dash.appendTo('#game-control');

        updateBoardState();
        updateDashboardState();
    }

    function updateBoardState() {

    }

    function updateDashboardState() {
        var playerTiles = gameManager.currentPlayer.tiles;
        var dash = $('#dash');
        var dashTile = $('<div />').addClass('dash-tile')
            .css({
                width: '20px',
                height: '20px',
                border: '1px solid black',
                display: 'inline-block',
                margin: 0,
                padding: 0
            })
            .html('&nbsp;');

        playerTiles.forEach(function(tile) {
            dash.append(dashTile.clone().html(tile.letter));
        });
    }

    function onDashboardClick() {
        if (selectedTile && this !== selectedTile.parent()[0]) {
            selectedTile.css('background', '');
            $('#dash').append(selectedTile);
            selectedTile = null;
        }
    }

    function onTileClick() {
        var clickedTile = $(this);
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
            console.log(selectedTile);
        }
    }

    return {
        start: start
    }
}());

export default playScreen;