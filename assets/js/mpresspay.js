///
///	@file app.js
///
///	@author Ferdi Ladeira
///
///	@brief Application Constructor
///
/// @description
///
///	Main application variable with event handlers and calls to plugins
///

/*
 * This is loaded on the Magento Server in the JavaScripts folder
 * and contains the payment call to the mPress plugin running
 * in the Cordova WebView
 * This will fail if run on a non-cordova webview
 */
var mpress;

    mpress = {
        //
        // Application Initializer
        initialize: function () {
            return true;
        },
        startPEDPayment: function(data) {
            console.log('Incoming mPress Payment Request :' + JSON.stringify(data));
            return window.Shoplit.startPEDPayment(JSON.stringify(data));
        },
        donePEDPayment: function(data) {
            console.log('Result Data :'+JSON.stringify(data));
            document.getElementById('mpress_result').value = JSON.stringify(data);
            document.getElementById('mpress_result').dispatchEvent(new Event("input")); // Triggers change event in Home.vue
        }
    };

(function(){
	// Include any directives at a top level
	'use strict';
})();
