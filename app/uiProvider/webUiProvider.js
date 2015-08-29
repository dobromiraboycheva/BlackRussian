import $ from 'jquery';

var webUiProvider = function () {
    function init() {
        $('body').append($('<div />').html(''));
        return this;
    }
    var $container = $('#container');
    var $gameRules = $('#gamerules');
    var $logForm = $('#logform');
    var $buttons = $('#buttons');

    $(document).ready(function() {
        $("#loginbutton").click(function(){
            $logForm.hide();
            $buttons.show();
        }); 
    });

    $(document).ready(function() {
        $("#play").click(function(){
            $container.hide();
        }); 
    });

    $(document).ready(function() {
        $("#rules").click(function(){
            $container.hide();
            $gameRules.show();
        }); 
    });

    $(document).ready(function() {
        $("#back").click(function(){
            $container.show();
            $gameRules.hide();
        }); 
    });

    function loginClick() {
        var username = $("#username").val();
        var password = $("#password").val();
        var loginUrl = ''+username+'&password='+password;

        $.ajax({
            url: loginUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                handleLoginResult(data);
            }
        });
    }

    $(document).on("click", "#loginbutton", loginClick);

    function handleLoginResult(data) {
        var status = data.status;
        var message = data.message;

        if (status === "success") {
            // do whatever needs to be done after successful login
            $("#loginresult").html(message);
        }
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