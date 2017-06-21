(function () {
    var $frmContact = $('#frm-contact');
    var $frmContactInputs = $frmContact.find('input, textarea').not('[type=submit], [type=reset]');

    // state object to maintain up-to-date values of the form fields
    var message = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        message: $('#message').val()
    };

    /**
     * Validates a form input field's value and shows appropriate error feedback to user if required.
     * @param {jQuery wrapped DOM node} $el The form input field to be validated.
     * @returns bool {boolean} true or false depending on whether form input field value is valid or invalid.
     */
    function validateInput($el) {
        var isInvalid = $el.attr('required') && !$el.val();
    
        // provide user feedback if required
        if (isInvalid) {
            $el.closest('.form-group').addClass('has-error');
        } else {
            $el.closest('.form-group').removeClass('has-error');
        }
        
        return !isInvalid;
    }

    /**
     * Validates if form is valid (form is valid if each input inside it is valid)
     * @returns bool {boolean} true or false depending on whether form is valid or invalid.
     */    
    function validate() {
        var isValid = true;
        $frmContactInputs.each(function () {
            var isInputValid = validateInput($(this));
            isValid = isValid && isInputValid;
        });
        return isValid;
    }

    // updates state object on input
    $frmContactInputs.on('input', function () {
        var $this = $(this);
        
        message[$this.attr('id')] = $this.val();
        validateInput($this);
    });

    // checks if form input values are valid, and submits them if valid
    $frmContact.on('submit', function ($event) {
        if (validate()) {
            // close alerts if open
            $('.alert').hide();

            // post message to server
            $.ajax({
                method: 'post',
                url: '/messages',
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(message),
                success: function (response) {
                    $('#message-delivery-success').show();
                    setTimeout(function () {
                        $('#message-delivery-success').hide();
                    }, 5000);
                },
                error: function (err) {
                    console.log(err);
                    $('#message-delivery-failure').show();
                    setTimeout(function () {
                        $('#message-delivery-failure').hide();
                    }, 5000);
                }
            });
        }

        $event.preventDefault();
    });
}());