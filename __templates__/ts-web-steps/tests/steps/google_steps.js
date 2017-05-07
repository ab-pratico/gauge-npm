var page = gauge.siteMap.getPageObject('google');
gauge.step('Search on google.', function (done) {
    page.navigateTo().then(function () {
        console.log('It is cool!!!!');
        done();
    }).catch(function (error) {
        done(error);
    });
});
gauge.step('Find gauge on google.', function () {
    console.log('searchTerm', 'GAUGE');
});
