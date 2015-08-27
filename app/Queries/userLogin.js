var el = new Everlive('I7pUPb0YeHTrKHP8');
var username='PeshoPe';
var password='111111';

el.authentication.login( username, password,function (data) {
        console.log(JSON.stringify(data));
    },
    function(error){
        console.log(JSON.stringify(error));
    });