import Everlive from 'everlive';
import  el from 'app/entryPoint.js';

var name='pesho';
var data = el.data('Player');
data.create({
        'name': name,
        'score': 12,
        'tiles':['�','�']
    },
    function (data) {
        console.log(JSON.stringify(data));
    },
    function (error) {
        console.log(JSON.stringify(error));
    });