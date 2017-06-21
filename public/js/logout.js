(function () {
    $('#btn-logout').on('click', function () {
        personalPortfolio.authService.logout();
    });
}());