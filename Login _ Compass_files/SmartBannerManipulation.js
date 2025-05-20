$(document).ready(function() {
	//Find out what browser is accessing the website, if its safari, return else continue
	//var isSafari = (/(iPad|iPhone|iPod).*OS [1-9].*AppleWebKit.*Mobile.*Safari/.test(navigator.userAgent));
	var browser = get_browser();

	var notUsingSarafi = browser.name.indexOf("Safari") === -1 ||
		(navigator.userAgent.match('CriOS') && browser.name.indexOf("Safari") !== -1);

	if (notUsingSarafi) {
		//Find out what type of device is loading the website

		var storeText = null;
		getMobileOperatingSystem();

		function getMobileOperatingSystem() {
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;

			// Windows Phone must come first because its UA also contains "Android"
			if (/windows phone/i.test(userAgent)) {
				storeText = "On the Windows App Store";
			}

			if (/Android/i.test(userAgent)) {
				storeText = "In Google Play";
			}

			// iOS detection from: http://stackoverflow.com/a/9039885/177710
			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				storeText = "On the App Store";
			}

			return "unknown";
		}


		// Initialize Banner 
		var smartBanner = new SmartBanner({
			daysHidden: 30, // days to hide banner after close button is clicked (defaults to 15)
			daysReminder: 0, // days to hide banner after "VIEW" button is clicked (defaults to 90)
			appStoreLanguage: 'us', // language code for the App Store (defaults to user's browser language)
			title: 'Compass School Manager',
			author: 'JDLF International Pty Ltd',
			button: 'Open',
			store: {
				ios: storeText,
				android: storeText
			},
			price: {
				ios: 'FREE',
				android: 'FREE',
				windows: 'FREE'
			},
			force: null,
			// Add an icon (in this example the icon of Our Code Editor)
			//This link points to Apple's image servers, and can be obtained by getting the image link from the App Store
			icon: "https://is4-ssl.mzstatic.com/image/thumb/Purple116/v4/a8/2d/8c/a82d8c75-80d5-fde5-1ab3-5145ba3eee8c/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp",

			//theme: 'ios', // put platform type ('ios', 'android', etc.) here to force single theme on all device
			//icon: '', // full path to icon image if not using website icon image
			//force: 'windows' // Uncomment for platform emulation
		});
	};

	

	function get_browser() {
		var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return { name: 'IE', version: (tem[1] || '') };
		}
		if (M[1] === 'Chrome') {
			tem = ua.match(/\bOPR|Edge\/(\d+)/)
			if (tem != null) { return { name: 'Opera', version: tem[1] }; }
		}
		M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
		if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
		return {
			name: M[0],
			version: M[1]
		};
	}
});

