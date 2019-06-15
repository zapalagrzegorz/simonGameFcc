module.exports = function (grunt) {

    // Load the plugins tasks 
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['dev/js/*.js', 'test/*.js'],
                tasks: ['js']
            },
            sass: {
                files: ['dev/css/*.scss'],
                tasks: ['sass:dev']
            },
            options: {
                spawn: false,
                livereload: false,
                event: ['added', 'changed']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'build/css/*.css',
                        'build/js/*.js',
                        '*.html',
                        'test/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
        clean: {
            build: ['build/**/*'],
            dev_temp: ['dev/temp/']
        },
        concat: {
            dev: {
                files: {
                    'dev/temp/scripts.js': ['dev/js/*.js']
                }
            },
            dist: {
                files: {
                    'dev/temp/scripts.js': ['dev/js/*.js']
                }
            }
        },
        browserify: {
            dist: {
                src: 'dev/js/main.js',
                dest: 'dev/temp/bundled.js',
            }
        },
        babel: {
            dist: {
                options: {
                    sourceMap: false,
                    presets: ['env']
                },
                files: {
                    'dev/temp/scriptsEs5.js': 'dev/temp/bundled.js'
                }
            },
            dev: {
                options: {
                    sourceMap: true,
                    presets: ['env']
                },
                files: {
                    'build/js/scriptsEs5.js': 'dev/temp/bundled.js'
                }
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'build/js/scripts.min.js': 'dev/temp/scriptsEs5.js'
                }
            }
        },
        sass: {
            options: {
                sourceMap: false,
                includePaths: [
                    'node_modules/bootstrap/scss'
                ]
            },
            dev: {
                files:
                [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.scss'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            },
            dist: {
                files:
                [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.scss'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
               src: 'build/css/main.css',
                dest: 'build/css/main.min.css'
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,                  // Enable dynamic expansion 
                    cwd: 'dev/img/',                   // Src matches are relative to this path 
                    src: ['*.{png,jpg,gif}'],   // Actual patterns to match 
                    dest: 'build/img/'
                }]
            }
        },
});

// Default task(s).
grunt.registerTask('default', ['clean', 'sass:dev', 'concat:dev', 'browserify', 'babel:dev', 'imagemin', 'browserSync', 'watch']);
grunt.registerTask('dist', ['clean', 'imagemin', 'sass:dist', 'postcss', 'browserify', 'babel:dist', 'uglify']);
grunt.registerTask('js', ['clean:dev_temp', 'concat:dev', 'browserify', 'babel:dev']);

};