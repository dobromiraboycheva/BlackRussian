import Everlive from 'everlive';
import  el from 'app/entryPoint.js';

var userLogin = (function () {
function login(username, password) {
    var username = username;
    var password = password;

    el.authentication.login(username, password, function (data) {
            console.log(JSON.stringify(data));
        },
        function (error) {
            console.log(JSON.stringify(error.message));
        });
}
    return{
        login:login
    }

}());

export default userLogin;