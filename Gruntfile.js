module.exports = function (grunt) {
    
        require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'), //read in the package data
    
            // ------------------------------------------------
            // Watch
            // Description: watches scss and js source directories for changes
            // ------------------------------------------------
            watch: {
                options: {
                    livereload: true,
                    spawn: false
                },
                css: {
                    files: '<%= pkg.path.src.scss %>/**/*.scss',
                    tasks: ['css']
                },
                js: {
                    files: ['<%= pkg.path.src.js %>/**/*.js'],
                    tasks: ['js']
                }
            },
            // ------------------------------------------------
    
    
            // ------------------------------------------------
            // Sass
            // Description: compiles .scss files into .css file(s)
            // ------------------------------------------------
            sass: {
                options: {
                    sourceMap: true,
                    outputStyle: 'expanded'
                },
                dist: {
                    files: {
                        '<%= pkg.path.dest.css %>/style.css': '<%= pkg.path.src.scss %>/style.scss'
                    }
                }
            },
            // ------------------------------------------------
    
    
            // ------------------------------------------------
            // Autoprefixer
            // Description: add vendor prefixes to the compiled .css file(s)
            // ------------------------------------------------
            autoprefixer: {
                options: {
                    browsers: ['last 7 versions'],
                    map: true
                },
                prod: {
                    src: '<%= pkg.path.dest.css %>/style.css',
                    dest: '<%= pkg.path.dest.css %>/style.css'
                }
            },
            // ------------------------------------------------
    
    
            // ------------------------------------------------
            // CSS Min
            // Description: minifies .css files
            // ------------------------------------------------
            cssmin: {
                cutup: {
                    keepSpecialComments: true,
                    expand: true,
                    cwd: '<%= pkg.path.dest.css %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= pkg.path.dest.css %>',
                    ext: '.min.css'
                }
            },
            // ------------------------------------------------
    
    
            // ------------------------------------------------
            // JS Hint
            // Description: checks JS code for errors
            // ------------------------------------------------
            jshint: {
                all: ['<%= pkg.path.src.js %>/**/*.js'],
                options: {
                    esversion: 6
                }
            },
            // --------------------------------------------
    
            // ------------------------------------------------
            // Rollup
            // Description: Ecma Script 6 Javascript module bundler
            // -
            rollup: {
                main: {
                    'dest': 'dev/library/js/mainES6.js',
                    'src': 'dev/library/src/js/main/main.js'
                }
            },
            // ------------------------------------------------
    
            // ------------------------------------------------
            // Babel
            // Description: compiles js files from ES6 using Babel
            // ------------------------------------------------
            babel: {
                options: {
                    sourceMap: true,
                    presets: ['babel-preset-es2015']
                },
                dist: {
                    files: {
                        'dev/library/js/main.js': 'dev/library/js/mainES6.js'
                    }
                }
            },
            // ------------------------------------------------
    
    
            // ------------------------------------------------
            // Uglify
            // Description: minifies JS file
            // ------------------------------------------------
            uglify: {
                options: {
                    mangle: {
                        except: ['jQuery']
                    },
                    preserveComments: 'none'
                },
                '<%= pkg.path.dest.js %>/main.js': ['<%= pkg.path.dest.js %>/main.js']
            },
            // ------------------------------------------------
    
    
            // ------------------------------------------------
            // Copy
            // Description: library to dest
            // ------------------------------------------------
            copy: {
                dev: {
                    files: [
                      { expand: true, cwd: "dev/library/", src: "**", dest: "dest/library/" },
                    ]
                }
            },
            // ------------------------------------------------
    
            // ------------------------------------------------
    
    
            // ------------------------------------------------
            // Copy
            // Description: starts up a connect server with live reload
            // ------------------------------------------------
            express: {
                dev: {
                    options: {
                        port: 8000,
                        script: 'index.js'
                    }
                }
            },
            // ------------------------------------------------

            browserSync: {
                dev: {
                    bsFiles: {
                        src : ['dev/App/**/*.ejs', 'dev/library/css/**/*.css', 'dev/library/js/**/*.js']
                    },
                    options: {
                        proxy: "http://localhost:8000/",
                        watchTask: true
                    }
                }
            }
        });
    
        grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);
        grunt.registerTask('js', ['jshint', 'rollup', 'babel', 'uglify']);
        grunt.registerTask('default', ['css', 'js', 'express','browserSync', 'watch']);
    };