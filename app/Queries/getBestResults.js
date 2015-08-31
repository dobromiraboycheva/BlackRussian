import Everlive from 'everlive';
import  el from 'app/entryPoint.js';

var data = el.data('Player');
var query = new Everlive.Query();
query.order('score');
data.get(query)
    .then(function (data) {
        console.log(JSON.stringify(data));
    },
    function (error) {
        console.log(JSON.stringify(error));
    });