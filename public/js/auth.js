var personalPortfolio = personalPortfolio || {};

personalPortfolio.authService = (function () {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        options.headers = options.header || {};
        options.headers.authorization = 'Bearer ' + personalPortfolio.authService.getToken();
    });
    
    function isAuthenticated() {
        return !!personalPortfolio.authService.getToken();
    }

    function getToken() {
        return localStorage.getItem('authToken');
    }

    function setToken( token, email ) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('email', email);
    }

    function removeToken() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
    }

    function getEmail() {
        return localStorage.getItem('email');
    }

    /**
     * @param {String} credentials.email
     * @param {String} credentials.password
     */
    function login(credentials, success, error) {
        $.ajax({
            method: 'post',
            url: '/login',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(credentials),
            success: function (response) {
                personalPortfolio.authService.setToken(response.authToken, response.email);
                success(response);
            },
            error: function (err) {
                console.log(err);
                error(err);
            }
        });
    }

    function logout() {
        personalPortfolio.authService.removeToken();
        window.location.pathname = '/login.html';
    }

    return {
        isAuthenticated: isAuthenticated,
        getToken: getToken,
        setToken: setToken,
        removeToken: removeToken,
        getEmail: getEmail,
        login: login,
        logout: logout
    };
}());