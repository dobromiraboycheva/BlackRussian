var el = new Everlive('I7pUPb0YeHTrKHP8');
var name='pesho'
var data = el.data('Player');
data.create({
        'name': name,
        'score': 12,
        'tiles':['à','ô']
    },
    function (data) {
        console.log(JSON.stringify(data));
    },
    function (error) {
        console.log(JSON.stringify(error));
    });