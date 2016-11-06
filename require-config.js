'use strict';

if(window.__karma__) {
	var allTestFiles = [];
	var TEST_REGEXP = /spec\.js$/;

	var pathToModule = function(path) {
		return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
	};

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			// Normalize paths to RequireJS module names.
			allTestFiles.push(pathToModule(file));
		}
	});
}

require.config({
	paths: {
		angular: 'bower_components/angular/angular',
		angularRoute: 'bower_components/angular-route/angular-route',
		angularMocks: 'bower_components/angular-mocks/angular-mocks',
		text: 'bower_components/requirejs-text/text',
		qrCodeLib1: 'bower_components/angular-qr-scanner/qr-scanner',
		qrCodeLib2: 'bower_components/angular-qr-scanner/src/jsqrcode-combined.min',
		angularUI: 'bower_components/angular-ui/build/angular-ui',
		angularBootstrap: 'bower_components/angular-bootstrap/ui-bootstrap',
        angularBootstrapTpls: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        firebase: 'bower_components/firebase/firebase',
        angularfire: 'bower_components/angularfire/dist/angularfire'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularUI' : {'exports' : 'angularUI',
			deps: ['angular']
		},
		'angularBootstrap' : {'exports' : 'angularBootstrap',
			deps: ['angular']
		},
        'angularBootstrapTpls' : {'exports' : 'angularBootstrapTpls',
            deps: ['angular']
        },
		'qrCodeLib1' : {'exports' : 'qrCodeLib1',
		deps: ['angular']
		},
		'qrCodeLib2' : {'exports' : 'qrCodeLib2',
			deps: ['angular']},
		'angularRoute': {'exports' : 'angularRoute',
			deps: ['angular']},
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
        'firebase' : {'exports' : 'firebase'},
        'angularfire' : {'exports' : 'angularfire',
            deps: ['angular']
        }
	},
	priority: [
		"angular"
	],
	deps: window.__karma__ ? allTestFiles : [],
	callback: window.__karma__ ? window.__karma__.start : null,
	baseUrl: window.__karma__ ? '/base/app' : '',
});

require([
	'angular',
	'app'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['myApp']);
		});
	}
);