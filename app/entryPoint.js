// http://www.sitepoint.com/understanding-es6-modules/
<<<<<<< HEAD
import webUiProvider from 'app/UI/startMenu.js';

(function() {
    webUiProvider.start();
}());
=======
import startMenu from 'app/UI/startMenu.js';
import Everlive from 'everlive';
var el = new Everlive('I7pUPb0YeHTrKHP8');

(function() {
    startMenu.start();
}());

export  default  el;
>>>>>>> e912aa02a1e53833a0ce2cdc84e60a23ac2b6cbf
