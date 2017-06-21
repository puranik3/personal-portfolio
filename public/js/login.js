(function () {
    if (personalPortfolio.authService.isAuthenticated()) {
        window.location.pathname = '/messages.html';
    }

    $('#frm-login').on('submit', function ( $event ) {
        personalPortfolio.authService.login(
            {
                email: $('#email').val(),
                password: $('#password').val()
            },
            function success(response) {
                window.location.pathname = '/messages.html';
            },
            function error(err) {
                alert('Unable to login - Incorrect email id or password.');
            }
        );
        $event.preventDefault();
    });
}());