module.exports = function (grunt) {

	grunt.initConfig({

		jshint: {
			files  : 'src/*.js',
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery  : true,
					console : true,
					module  : true,
					document: true
				}
			}
		},

		jasmine: {
			components: {
				src    : [
					'src/*js'
				],
				options: {
					specs     : 'tests/spec/*Spec.js',
					template: "_SpecRunner.html",
					keepRunner: true
					//helpers: 'test/spec/*.js'
				}
			}
		},

		jsdoc: {
			dist: {
				src    : ['src/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},

		uglify: {
			options: {
				sourceMap              : true,
				sourceMapIncludeSources: true
			},
			default: {
				files: {
					'dist/arrive.min.js': ['src/arrive.js', 'src/requestanimationframe-polyfill.js', 'src/queryselector-polyfill.js']
				}
			}
		},

		concat: {
			default: {
				src: ['src/arrive.js', 'src/requestanimationframe-polyfill.js', 'src/queryselector-polyfill.js'],
				dest: 'dist/arrive.js'
			}
		},

		release: {
			options: {
				indentation: '\t',
				file: 'bower.json',
				npm: false,
				github     : {
					'repo': 'daveross/arrive-js'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-release');

	grunt.registerTask('travis', ['jshint', 'concat', 'jasmine']);
	grunt.registerTask('docs', ['jsdoc']);
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'jasmine', 'jsdoc']);

};