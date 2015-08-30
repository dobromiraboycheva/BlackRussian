import $ from 'jquery';
import manager from 'app/gameEngine/gameManager.js';

var webUiProvider = (function() {
    var selectedLetter;
    var gameManager = Object.create(manager);

    function start() {
        loadHandlers();
    }

    function play() {
        var PLAYERS_COUNT = 2;

        gameManager.init(PLAYERS_COUNT);
        createDOMBoard();
        createDOMPlayerDashboard();

        var board = gameManager.board;
        var player = gameManager.currentPlayer;

        drawBoardState();
        drawDashboardState();

    }

    function drawBoardState() {

    }

    function drawDashboardState() {
        var playerTiles = gameManager.currentPlayer.tiles;
        var dash = $('#dash');
        var dashTile = $('<div />').addClass('dash-tile')
            .css({
                width: '30px',
                height: '30px',
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

    function onDashTileClick() {
        selectedLetter = this.innerHTML;
    }

    function createDOMPlayerDashboard() {
        var dash = $('<div />').attr('id', 'dash');
        dash.on('click', '.dash-tile', onDashTileClick);
        var submitButton = $('<button />').attr('id', 'submit-button').html('Submit');
        submitButton.appendTo(dash);
        submitButton.on('click', gameManager.makeMove);
        dash.appendTo(document.body);
    }

    function createDOMBoard() {
        var board = $('<div />').attr('id', 'board');

        var boardSquare = $('<div />').addClass('board-square')
            .css({
                width: '20px',
                height: '20px',
                border: '1px solid black',
                display: 'inline-block',
                margin: 0,
                padding: 0
            })
            .html('&nbsp;'); // we need this for CSS

        var row = 0;
        var col = 0;
        for (var i = 0; i < 15 * 15; i += 1) {
            var newBoardSquare = boardSquare.clone().attr('row', (i / 15) | 0).attr('col', col);
            board.append(newBoardSquare);
            if ((i + 1) % 15 === 0) {
                board.append($('</br>'));
                col = 0;
            } else {
                col++;
            }
        }

        board.on('click', '.board-square', onBoardSquareClick)

        board.appendTo(document.body);
    }

    function onBoardSquareClick() {
        var clickedSquare = this;
        // console.log(selectedLetter);
        if (selectedLetter) {
            clickedSquare.innerHTML = selectedLetter;
            selectedLetter = '';
            // TODO: remove letter from player dash
        }
    }

    function loadHandlers() {
        var $gameMenu = $('#game-menu');
        var $gameRules = $('#game-rules');
        var $loginForm = $('#login-form');

        $(document).on("click", "#loginbutton", onLoginClick);

        $("#play-button").click(function() {
            $gameMenu.hide();
            play();
        });

        $("#rules-button").click(function() {
            $gameMenu.hide();
            $gameRules.show();
        });

        $("#back").click(function() {
            $gameMenu.show();
            $gameRules.hide();
        });
    }

    function onLoginClick() {
        var username = $("#username").val();
        var password = $("#password").val();
        var loginUrl = '' + username + '&password=' + password;

        $.ajax({
            url: loginUrl,
            type: 'GET',
            dataType: 'application/json',
            success: function(data) {
                onLoginResult(data);
                $loginForm.hide();
                $button.show();
            }
        });
    }

    function onLoginResult(data) {
        var status = data.status;
        var message = data.message;

        if (status === "success") {
            // do whatever needs to be done after successful login
            $("#loginresult").html(message);
        }
    }

    return {
        start: start,
    };
}());

export default webUiProvider;