require.config({

	deps: [
		'lib/html5shiv/dist/html5shiv'
	],

	map: {
		'*': {
			'jquery': 'lib_local/jquery/jquery-private'
		},
		'lib_local/jquery/jquery-private': {
			'jquery': 'jquery'
		}
  },

	paths: {
		'jquery': 'lib/jquery/dist/jquery'
	}
});
