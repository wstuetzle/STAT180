$( document ).ready(function() {
    if (window.__venngage_email_octopus_loaded__) return;
    window.__venngage_email_octopus_loaded__ = true;
    var emailOctopus = {
        missingEmailAddressMessage: 'Your email address is required.',
        missingNamesMessage: 'Please enter your first name and last name.',
        invalidEmailAddressMessage: 'Your email address looks incorrect, please try again.',
        botSubmissionErrorMessage: 'This doesn\'t look like a human submission.',
        unknownErrorMessage: 'Sorry, an unknown error has occurred. Please try again later.',
        isBotPost: function() {
            return $('.email-octopus-form-row-hp input').val();
        },
        basicValidateEmail: function(email) {
            var regex = /\S+@\S+\.\S+/;
            return regex.test(email);
        },
        ajaxSuccess: function() {
            $('.email-octopus-success-message').show();
            $('.email-octopus-form').hide();
            $('.email-octopus-form-info').hide();
        },
        ajaxError: function(textStatus) {
            var response = $.parseJSON(textStatus.responseText);
            if (response && response.error && response.error.code) {
                switch(response.error.code) {
                    case 'INVALID_PARAMETERS':
                        $('.email-octopus-error-message').text(
                            emailOctopus.invalidParametersErrorMessage
                        );
                        return;
                    case 'BOT_SUBMISSION':
                        $('.email-octopus-error-message').text(
                            emailOctopus.botSubmissionErrorMessage
                        );
                        return;
                }
            }

            $('.email-octopus-error-message').text(
                emailOctopus.unknownErrorMessage
            );
        },
        ajaxSubmit: function(form) {
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize(),
                success: function() {
                    emailOctopus.ajaxSuccess();
                },
                error: function(textStatus) {
                    emailOctopus.ajaxError(textStatus);
                }
            });
        }
    };

    window.__venngage_email_octopus_trigger_submit__ = function(form) {
            $('.email-octopus-error-message').empty();
            var emailAddress = $(form).find('.email-octopus-email-address').val();
            var requireName = false;
            var firstName = '';
            var lastName = '';

            // If there are first/last name inputs, then make them required.
            if ($(form).find('.email-octopus-first-name').length > 0 && $(form).find('.email-octopus-last-name').length > 0) {
                requireName = true;
                firstName = $(form).find('.email-octopus-first-name').val();
                lastName = $(form).find('.email-octopus-last-name').val();
            }

            if (emailOctopus.isBotPost()) {
                $('.email-octopus-error-message').text(
                    emailOctopus.botSubmissionErrorMessage
                );
            } else if (!$.trim(emailAddress)) {
                $('.email-octopus-error-message').text(emailOctopus.missingEmailAddressMessage);
            } else if (requireName && (!$.trim(firstName) || !$.trim(lastName))) {
                $('.email-octopus-error-message').text(emailOctopus.missingNamesMessage);
            } else if (!emailOctopus.basicValidateEmail(emailAddress)) {
                $('.email-octopus-error-message').text(emailOctopus.invalidParametersErrorMessage);
            } else {
                emailOctopus.ajaxSubmit($(form));
            }
    };

    $('.email-octopus-form').submit(function(e) {
        window.__venngage_email_octopus_trigger_submit__(this);
        return false;
    });
});
