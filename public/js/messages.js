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
                        '<td class="message-received-email">' + message.email + '</td>',
                        '<td>' + message.phone + '</td>',
                        '<td>',
                            '<div class="message">' + message.message + '</div>',
                            '<br />',
                            '<a class="btn btn-sm btn-info btn-trigger-dialog-reply" href="#dialog-reply" data-toggle="modal">Reply</a>',
                        '</td>',
                    '</tr>'
                ].join('');
            }, '');
            $('#tbl-messages > tbody').html(str);
        }
    });

    $('#tbl-messages').on('click', '.btn-trigger-dialog-reply', function () {
        console.log('j');
        $('#to').attr('value', $(this).closest('tr').find('.message-received-email').html());
    });

    $('#frm-reply').on('submit', function ($event) {
        $.ajax({
            method: 'post',
            url: '/reply',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                to: $('#to').val(),
                subject: $('#subject').val(),
                text: $('#text').val()
            }),
            success: function (response) {
                $('#dialog-reply').modal('hide');
                alert('Reply was successfully sent');
            },
            error: function (err) {
                console.log(err);
                $('#dialog-reply').modal('hide');
                alert('Some error occured. Reply may not have been sent successfully.');
            }
        });

        $event.preventDefault();
    });
}());