module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        cwd: 'app/development/',
                        expand: true,
                        src: ['css/**/*', 'img/**/*', 'includes/**/*', 'js/JSP.js', 'overlays/**/*', 'vendor/**/*.min.js', '*.php'],
                        dest: 'app/production/'
                    }
                ]
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'app/development/js/',
                    src: 'JSP.js',
                    dest: 'app/development/js/'
                }]
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/templates',
                    src: '*.jade',
                    dest: 'app/development/',
                    ext: '.php'
                }]
            }
        },
        concat: {
            options: {
                separator: ' '
            },
            dist: {
                src: ['app/development/js/scripts/STARZ.startup.js', 'app/development/js/scripts/UTIL.url.js', 'app/development/js/scripts/UI.stepnav.js', 'app/development/js/scripts/STARZ.validateform.js', 'app/development/js/scripts/STARZ.photoeditor.js', 'app/development/js/scripts/STARZ.appscreens.js', 'app/development/js/scripts/STARZ.social.js', 'app/development/js/scripts/analytics.js'],
                dest: 'app/development/js/JSP.js'
            }
        }
    });

    grunt.registerTask("production", ['copy']);
    grunt.registerTask("scripts", ['concat', 'uglify']);
    grunt.registerTask("render", ['jade']);

};