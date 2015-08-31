import Everlive from 'everlive';
import  el from 'app/entryPoint.js';

var signOut = (function () {
    function signout() {
               el.users.logout()
    }
    return{
        signout:signout
    }

}());

export default signOut;