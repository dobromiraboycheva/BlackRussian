import Everlive from 'everlive';
import  el from 'app/entryPoint.js';

var userRegistration = (function () {
    function registerUser(userName, password, email, name) {

        var username = userName;
        var password = password;
        var attrs = {
            Email: email,
            DisplayName: name
        };

        el.Users.register(username, password, attrs, function (data) {
                console.log(JSON.stringify(data));
                alert('You are registered successfully and now you can login and play Scrabble');
            },
            function (error) {
               alert(JSON.stringify(error.message));
            });
    }

    return {
        registerUser: registerUser
    }

}());

export default userRegistration;