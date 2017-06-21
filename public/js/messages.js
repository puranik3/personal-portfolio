(function () {
    $('#logged-in-user-email').html(personalPortfolio.authService.getEmail());

    $.ajax({
        method: 'get',
        url: '/messages',
        success: function (response) {
            var str = response.reduce(function (str, message) {
                return str + [
                    '<tr>',
                        '<td class="message-received">',
                            '<span class="message-received-date">' + new Date(message.received).toDateString() + '</span>',
                            '<br />',
                            '<span class="message-received-time">' + new Date(message.received).toTimeString().match(/\d{1,2}:\d{1,2}/) + '</span>',
                        '</td>',
                        '<td>' + message.name + '</td>',
                        '<td>' + message.email + '</td>',
                        '<td>' + message.phone + '</td>',
                        '<td>' + message.message + '</td>',
                    '</tr>'
                ].join('');
            }, '');
            $('#tbl-messages > tbody').html(str);
        }
    });
}());