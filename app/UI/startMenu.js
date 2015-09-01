<<<<<<< HEAD
import $ from 'jquery';
import playScreen from 'app/UI/playScreen.js';

var webUiProvider = (function() {
    var $startMenu = $('#start-menu');
    var $gameRules = $('#game-rules');
    var $loginForm = $('#login-form');

    function start() {
        loadHandlers();
        $startMenu.show();
        $('#loading').hide();
    }

    function loadHandlers() {

        $("#loginbutton").on("click", onLoginClick);

        $("#play-button").click(function() {
            $startMenu.hide();
            playScreen.start();
        });

        $("#rules-button").click(function() {
            $startMenu.hide();
            $gameRules.show();
        });

        $("#back").click(function() {
            $startMenu.show();
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
=======
import 'jquery';
import playScreen from 'app/UI/playScreen.js';
import userRegistration from 'app/Queries/userRegistration.js';
import userLogin from 'app/Queries/userLogin.js';
import signOut from 'app/Queries/userSignout.js';
import bestResult from 'app/Queries/getBestResults.js';

var $startMenu = $('#start-menu');
var $gameRules = $('#game-rules');
var $loginForm = $('#login-form');

function start() {
    loadHandlers();
    $startMenu.show();
    $('#loading').hide();
}

function loadHandlers() {

    $('#loginButton').on('click', onLoginClick);

    $('#play-button').click(function() {
        $('#bestResults').hide();
        $startMenu.hide();
        playScreen.start();
    });

    $('#rules-button').click(function() {
        $startMenu.hide();
        $gameRules.show();
        $('#bestResults').hide();
    });

    $('#back').click(function() {
        $startMenu.show();
        $gameRules.hide();
    });

    $('#registerButton').on('click', onRegisterClick);
    $('#register').on('click', onRegister);
    $('#signoutButton').on('click', onSignout);
    $('#bestresults-button').on('click', showBestResult);

}

function onRegisterClick() {

    $('#title').hide();
    $('#start-menu').hide();
    $('#registerPanel').show();
    $('#bestResults').hide();
}

function onRegister(event) {
    var userName = $('#name').val();
    var password = $('#register-password').val();
    var email = $('#email').val();
    var name = $('#displayName').val();

    userRegistration.registerUser(userName, password, email, name);

    $('#registerPanel').hide();
    $('#title').show();
    $('#start-menu').show();
    $('#bestResults').hide();
    event.preventDefault();
}

function onLoginClick(event) {
    var username = $('#username').val();
    var password = $('#password').val();
    userLogin.login(username, password);

    $('#play-button').show();
    $('#signoutButton').show();
    $('#username').hide();
    $('#password').hide();
    $('#registerButton').hide();
    $('#loginButton').hide();
    $('#bestResults').hide();

    event.preventDefault();
}

function onSignout(event) {
    $('#play-button').hide();
    $('#signoutButton').hide();
    $('#username').show();
    $('#password').show();
    $('#registerButton').show();
    $('#loginButton').show();
    $('#bestResults').hide();
    signOut.signout();

    event.preventDefault();
}

function showBestResult(event) {
    bestResult.showTopResult();
    $('#bestResults').toggle();

    event.preventDefault();
}

export default {
    start
};
>>>>>>> e912aa02a1e53833a0ce2cdc84e60a23ac2b6cbf
