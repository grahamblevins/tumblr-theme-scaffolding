require.config({

	deps: [
		'jquery',
		'lib/html5shiv/dist/html5shiv'
	],

	map: {
		'*': {
			'jquery': 'app/lib/jquery/jquery-private'
		},
		'app/lib/jquery/jquery-private': {
			'jquery': 'jquery'
		}
    },

	paths: {
		'app': 'js',
		'jquery': 'lib/jquery/dist/jquery'
	},

	shim: {}
});