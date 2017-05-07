var page = gauge.siteMap.getPageObject('google');

gauge.step('Search on google.', function (done: any) {
    page.navigateTo().then(() => {
        console.log('It is cool!!!!');
        done();
    }).catch((error: any) => {
        done(error);
    })
});


gauge.step('Find gauge on google.', function () {
    console.log('searchTerm', 'GAUGE');
});