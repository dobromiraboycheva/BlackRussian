import Everlive from 'everlive';
import start from 'app/UI/startMenu.js';
var el = new Everlive('I7pUPb0YeHTrKHP8');

function userIsLoged(val){
    if(localStorage.currentUser === undefined){
        return false;
    }
    else{
        return true;
    }
}

function loginOperations() {
    $('#play-button').show();
    $('#signoutButton').show();
    $('#username').hide();
    $('#password').hide();
    $('#register-button').hide();
    $('#loginButton').hide();
    $('#bestResults').hide();
}

function login(username, password) {
    var username = username;
    var password = password;

    el.authentication.login(username, password, function(data) {
        localStorage.currentUser = username;
        loginOperations();
        
    },
       function(error) {
           alert(JSON.stringify(error.message));
       });
}

function showTopResult() {
    var data = el.data('Users');
    var query = new Everlive.Query();
    query.orderDesc('score');
    data.get(query)
        .then(function(data) {
            $('#bestResults').html('');
            var ul = $('<ul>');
            ul.addClass('list-group')
            $('#bestResults').append(ul);
            for (var i = 0; i < 5; i++) {
                ul.append('<li class="list-group-item">' + data.result[i].Username + '<span class="badge">' + data.result[i].score + '<span></li>');
            }
        },
            function(error) {
                alert(JSON.stringify(error.message));
            });
}

function registerUser(userName, password, email, name) {

    var username = userName;
    var password = password;
    var attrs = {
        Email: email,
        DisplayName: name
    };

    el.Users.register(username, password, attrs, function(data) {
        console.log(JSON.stringify(data));
        alert('You are registered successfully and now you can login and play Scrabble');
    },
        function(error) {
            alert(JSON.stringify(error.message));
        });
}

function signOut() {
    localStorage.clear();
    el.users.logout()
}

export default {
    login, showTopResult, registerUser, signOut, userIsLoged, loginOperations
};