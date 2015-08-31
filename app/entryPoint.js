// http://www.sitepoint.com/understanding-es6-modules/
import webUiProvider from 'app/UI/startMenu.js';
import Everlive from 'everlive';
var el = new Everlive('I7pUPb0YeHTrKHP8');

(function() {
    webUiProvider.start();
}());

export  default  el;