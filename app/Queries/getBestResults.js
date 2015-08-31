import Everlive from 'everlive';
import  el from 'app/entryPoint.js';

var bestResult = (function () {
    function showTopResult() {
        var data = el.data('Users');
        var query = new Everlive.Query();
        query.orderDesc('score');
        data.get(query)
            .then(function (data) {
               $('#bestResults').html('');
               var ul=$('<ul>');
                ul.addClass('list-group')
                $('#bestResults').append(ul);
                for(var i=0;i<5;i++){
                ul.append('<li class="list-group-item">'+data.result[i].Username+'<span class="badge">'+data.result[i].score+'<span></li>');
                }
            },
            function (error) {
                alert(JSON.stringify(error.message));
            });
    }

    return{
        showTopResult:showTopResult
    }
}());

export  default bestResult;