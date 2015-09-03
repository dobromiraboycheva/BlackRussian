import 'jquery';
import playScreen from 'app/UI/playScreen.js';
import db from 'app/DB/webDB.js';

var $startMenu = $('#start-menu');
var $gameRules = $('#game-rules');
var $loginForm = $('#login-form');

function start() {
    if(db.userIsLoged(localStorage.currentUser)){
        db.loginOperations();
    }
    loadHandlers();
    $startMenu.show();
    $('#loading').hide();
}

function onLoginClick(event) {
    var username = $('#username').val();
    var password = $('#password').val();
    db.login(username, password);
    event.preventDefault();
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

    $('#register-button').on('click', onRegisterButtonClick);
    $('#register-submit').on('click', onRegisterSubmit);
    $('#signoutButton').on('click', onSignout);
    $('#bestresults-button').on('click', showBestResult);

}

function onRegisterButtonClick() {

    $('#title').hide();
    $('#start-menu').hide();
    $('#registerPanel').show();
    $('#bestResults').hide();
}

function onRegisterSubmit(event) {
    var userName = $('#name').val();
    var password = $('#register-password').val();
    var email = $('#email').val();
    var name = $('#displayName').val();

    db.registerUser(userName, password, email, name);

    $('#registerPanel').hide();
    $('#title').show();
    $('#start-menu').show();
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
    $('#game-control').hide();
    $startMenu.show();
    $('#game-control').remove();
    db.signOut();

    event.preventDefault();
}

function showBestResult(event) {
    db.showTopResult();
    $('#bestResults').toggle();

    event.preventDefault();
}

export default {start};
