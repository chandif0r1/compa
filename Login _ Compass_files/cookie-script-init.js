// Basic script to initialise the cookie banner script.
var initCookieScript = function () {
	if (!Compass || !Compass.showCookieBanner) {
		return;
	}

	if (CookieScript && typeof CookieScript.init === 'function') {
		CookieScript.init();
	}
};

initCookieScript();
