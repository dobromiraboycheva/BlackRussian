import 'jquery';
import GameManager from 'app/gameEngine/gameManager.js';
import domFactory from 'app/UI/domFactory.js';

var selectedTile;
var gameManager = Object.create(GameManager);
var BOARD_SIZE = 15;
var PLAYERS_COUNT = 2;

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
    var submitButton = $('#dash button');
    submitButton.on('click', onSubmitButtonClick);

    dash.appendTo('#game-control');

    drawBoardState();
    drawDashboardState();
}

function onSubmitButtonClick() {
    var newBoard = getBoardState();
    var leftPlayerTiles = getPlayerTilesState();

    gameManager.makeMove(newBoard, leftPlayerTiles);
}

function drawBoardState() {

}

function drawDashboardState() {
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
    }
}

export default {
    start
};