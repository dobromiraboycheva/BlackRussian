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
    $('#game-control').hide();
    $startMenu.show();
    $('#game-control').remove();
    signOut.signout();

    event.preventDefault();
}

function showBestResult(event) {
    bestResult.showTopResult();
    $('#bestResults').toggle();

    event.preventDefault();
}

export default {start};