/**
 * Nudge loader.
 */
(function (initial_nudge_obj) {
    "use strict";

    // Check if we have necessary info to load
    if (typeof initial_nudge_obj !== "object" ||
        typeof initial_nudge_obj['account_id'] !== "string" ||
        initial_nudge_obj['account_id'].length < 1) {
        console.log("Error: Nudge script is not loaded correctly. Please contact support.");
        return;
    }

    // injects css/html/js and custom data for a particular nudge id
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status != 200) {
            // Failed to get good response from server.
            console.log("Sorry, could not fetch Nudge account data.");

        } else if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {

            // Request is successful, parse JSON
            var json_data = JSON.parse(xhttp.responseText);

            // Export nudge data(overriding initial nudge obj, making sure the object doesn't have anything else)
            window.NudgeWidget = {

                /**
                 * Version of the widget.
                 */
                'version': json_data.version,

                /**
                 * Unique identifier of Nudge installation.
                 */
                'account_id': json_data.account_id,

                /**
                 * Place holder for actions data that should be fetched from API per client.
                 *
                 * See : [url that describes datastructure/api]
                 */
                'actions': json_data.actions
            };

            // Append css to document
            var nudge_style = document.createElement('style');
            nudge_style.type = 'text/css';
            nudge_style.innerHTML = json_data.css;
            document.body.appendChild(nudge_style);

            // Append HTML to document
            var nudge_div = document.createElement('div');
            nudge_div.id = "nudge-widget";
            nudge_div.innerHTML = json_data.html;
            document.body.appendChild(nudge_div);

            // Append JS to document
            var nudge_js_vendors = document.createElement('script');
            nudge_js_vendors.innerHTML = json_data.js_vendors;
            document.body.appendChild(nudge_js_vendors);

            var nudge_js = document.createElement('script');
            nudge_js.innerHTML = json_data.js;
            document.body.appendChild(nudge_js);
        }
    };

    // Make the request, which injects css/html/js customized for a particular id
    xhttp.open(
        "GET",
        "//nudge-widget.herokuapp.com/api/v1/widget" +
        "?account_id=" + initial_nudge_obj['account_id'] +
        "&href=" + encodeURIComponent(window.location.href) +
        "&version=0",
        true
    );
    xhttp.send();

}(window.NudgeWidget));
