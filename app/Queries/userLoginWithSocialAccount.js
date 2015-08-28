var el = new Everlive('I7pUPb0YeHTrKHP8');
var userId = 'cb90fab0-4ca1-11e5-a078-056c171b2270';
var accessToken = 'Facebook access token';
el.Users.linkWithFacebook(userId, accessToken,
    function (data) {
        console.log(JSON.stringify(data));
    },
    function(error){
        console.log(JSON.stringify(error));
    });