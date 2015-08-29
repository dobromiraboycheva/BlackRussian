import $ from 'jquery';

var webUiProvider = function() {
    function start() {
        loadHandlers();
    }

    function play() {
        var board = $('<div />').attr('id', 'board');

        var tileSquare = $('<div />').addClass('tile-square')
            .css({
                width: '20px',
                height: '20px',
                border: '1px solid black',
                display: 'inline-block',
                margin: 0,
                padding: 0
            })
            .html('&nbsp');

        for (var i = 0; i < 15 * 15; i += 1) {
            board.append(tileSquare.clone().attr('id', i));
            if ((i + 1) % 15 === 0) {
                board.append($('</br>'));
            }
        }

        board.appendTo(document.body);
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
}();

export default webUiProvider;