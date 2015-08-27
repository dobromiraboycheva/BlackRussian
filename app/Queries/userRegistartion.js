var el = new Everlive('I7pUPb0YeHTrKHP8');

var username = 'PeshoPe';
var password = '111111';
var attrs = {
    Email: 'pesho.peshev@peho.com',
    DisplayName: 'Pesho Peshe'
};

el.Users.register(username, password, attrs, function (data) {
        console.log(JSON.stringify(data));
    },
    function (error) {
        console.log(JSON.stringify(error));
    });