import Everlive from 'everlive';
import  el from 'app/entryPoint.js';

var userLogin = (function () {
    function login(username, password) {
        var username = username;
        var password = password;

        el.authentication.login(username, password, function (data) {
            console.log(JSON.stringify(data));

            $('#play-button').show();
            $('#signoutButton').show();
            $('#username').hide();
            $('#password').hide();
            $('#registerButton').hide();
            $('#loginButton').hide();
            $('#bestResults').hide();
        },
            function (error) {
                alert(JSON.stringify(error.message));
            });
    }
    return{
        login:login
    }

}());

export default userLogin;