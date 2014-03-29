require.config({

	deps: [
		'lib/html5shiv/dist/html5shiv',
		'jquery'
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
	}
});
