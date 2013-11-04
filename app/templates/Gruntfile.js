module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        // configurable paths
        yeoman: {
            app: 'app',
            dist: 'dist'
        },

        compass: {
            dev: {
                options: {
                    config: 'config-dev.rb',
                    force: true
                }
            },
            dist: {
                options: {
                    config: 'config-dist.rb',
                    force: true
                }
            }
        },

        copy: {
            dev: {
                files: [{
                    expand: true, 
                    cwd: '<%%= yeoman.app %>/', 
                    src: ['**','!**/*.scss','!**/*.coffee'], 
                    dest: '.tmp/'
                }]
            },
            dist: {
                files: [{
                    expand: true, 
                    cwd: '<%%= yeoman.app %>/', 
                    src: ['**','!**/*.scss','!**/*.coffee'], 
                    dest: '<%%= yeoman.dist %>/'
                }]
            }
        },

        coffee: {
            dev: {
                files: [{
                    expand: true, 
                    cwd: '<%%= yeoman.app %>/scripts', 
                    src: ['**/*.coffee'], 
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            dist: {
                files: [{
                    expand: true, 
                    cwd: '<%%= yeoman.app %>/scripts', 
                    src: ['**/*.coffee'], 
                    dest: '<%%= yeoman.dist %>/scripts',
                    ext: '.js'
                }]
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true, 
                    cwd: '<%%= yeoman.dist %>/scripts', 
                    src: ['**/*.js'], 
                    dest: '<%%= yeoman.dist %>/scripts'
                }]
            }
        },

        watch: {
            sass: {
                files: ['<%%= yeoman.app %>/sass/**/*.scss'],
                tasks: ['compass:dev']
            },
            html: {
                files: ['<%%= yeoman.app %>/**/*.{html,htm,xhtml,xml}'],
                tasks: ['copy:html']
            },
            js: {
                files: ['<%%= yeoman.app %>/scripts/main.js', '<%%= yeoman.dist %>/scripts/**/*.js'],
                tasks: ['uglify']
            },
            /* watch our files for change, reload */
            livereload: {
                files: ['<%%= yeoman.app %>/**/*.{html,htm,xhtml,xml}', '<%%= yeoman.app %>/images/*', '<%%= yeoman.app %>/scripts/{main.min.js, plugins.min.js}'],
                options: {
                    livereload: true
                }
            },
        },

        connect: {
            options: {
                port: 9001,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ]
                }
            }
        },

        clean: [".tmp", "<%%= yeoman.dist %>"]

    });

    grunt.registerTask('serve', [
        'clean',
        'compass:dev',
        'copy:dev',
        'coffee:dev',
        'connect',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'compass:dist',
        'copy:dist',
        'coffee:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);

}