require.config({

	baseUrl: function (window) {
		window.thetheme = window.thetheme || {};
		return [window.thetheme.urlBase, '/core'].join('');
	}(this),

	deps: [
		'lib/html5shiv/dist/html5shiv'
	],

	paths: {
		'app': 'js'
	},

	shim: {}
});