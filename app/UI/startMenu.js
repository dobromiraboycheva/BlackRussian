import $ from 'jquery';
import playScreen from 'app/UI/playScreen.js';
import userRegistration from 'app/Queries/userRegistration.js';
import userLogin from 'app/Queries/userLogin.js';

var webUiProvider = (function () {
    var $startMenu = $('#start-menu');
    var $gameRules = $('#game-rules');
    var $loginForm = $('#login-form');

    function start() {
        loadHandlers();
        $startMenu.show();
        $('#loading').hide();
    }

    function loadHandlers() {

        $('#loginbutton').on('click', onLoginClick);

        $('#play-button').click(function () {
            $startMenu.hide();
            playScreen.start();
        });

        $('#rules-button').click(function () {
            $startMenu.hide();
            $gameRules.show();
        });

        $('#back').click(function () {
            $startMenu.show();
            $gameRules.hide();
        });

        $('#registerButton').on('click', onRegisterClick);
        $('#register').on('click', onRegister);
    }

    function onRegisterClick() {

        $('#title').hide();
        $('#start-menu').hide();
        $('#registerPanel').show();
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

        event.preventDefault();
    }

    function onLoginClick() {
        var username = $('#username').val();
        var password = $('#password').val();
        var loginUrl = '' + username + '&password=' + password;

        $.ajax({
            url: loginUrl,
            type: 'GET',
            dataType: 'application/json',
            success: function (data) {
                onLoginResult(data);
                $loginForm.hide();
                $button.show();
            }
        });
    }

    function onLoginResult(data) {
        var status = data.status;
        var message = data.message;

        if (status === 'success') {
            // do whatever needs to be done after successful login
            $('#loginresult').html(message);
        }
    }

    return {
        start: start
    };
}());

export default webUiProvider;