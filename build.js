({
  appDir: 'www/core',

	baseUrl: '.',

  dir: 'www/build',

	fileExclusionRegExp: /^\./,

	findNestedDependencies: true,

	mainConfigFile: 'www/core/app/theme.js',

  modules: [{

    excludeShallow: [
      'app/theme'
    ],

    include: [
      'lib/almond/almond'
    ],

    name: 'app/theme'
  }],

	preserveLicenseComments: false,

  skipDirOptimize: true,

	wrap: true
})
