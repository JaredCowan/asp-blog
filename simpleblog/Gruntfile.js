module.exports = function (grunt) {
    'use strict';

    // Dat encoding doe
    grunt.file.defaultEncoding = 'utf8';

    // Force unix line endings
    grunt.util.linefeed = '\n';

    // Configuration for custom Verde Circle Grunt config file
    var fs = require('fs')
      , path = require('path')
      , os = require('os')
      , base = path.dirname()
      , userInfo = path.join(base, 'Grunt/config.json')
      , customConfig = function () { }
      , configExist = grunt.file.exists(userInfo)
      , build;

    // Create config file if not present. Creates an empty json object
    if (!configExist) {
        grunt.file.write(userInfo, JSON.stringify({
            "name": "",
            "upstreamUrl": "",
            "originUrl": "",
            "buildNumber": "1",
            "commit": {
                "branch": "",
                "id": "",
                "message": ""
            }
        }, null, 2));
    }

    grunt.file.copy('../README.md', '../.git/temp/v1-README.md');
    grunt.file.copy('./README.md', '../.git/temp/v2-README.md');
    grunt.file.copy('./README.md', '../README.md');

    var repoConfig = grunt.file.readJSON(userInfo);
    var num = repoConfig.buildNumber;

    // Delete new-line endings from strings
    function raw(string) {
        return string.replace(/\r?\n|\r/, "");
    }

    // Write data from customConfig to json
    function writeJson(file, stdout) {
        return grunt.file.write(userInfo, JSON.stringify(file, null, 2));
    }

    build = function (num) {
        if (isNaN(num)) {
            num = "0";
        }
        num = parseInt(num) + 1;
        num = num.toString();
        repoConfig.buildNumber = num;
        writeJson(repoConfig, num);
    }
    build(num);

    var getBuild = function () {
        repoConfig = grunt.file.readJSON(userInfo);
        num = repoConfig.buildNumber;
        return num;
    }

    customConfig.prototype.userName = function (err, stdout, stderr, cb) {
        repoConfig.name = raw(stdout);
        writeJson(repoConfig, stdout);
        cb();
    }

    customConfig.prototype.currentBranch = function (err, stdout, stderr, cb) {
        repoConfig.commit.branch = raw(stdout);
        writeJson(repoConfig, stdout);
        cb();
    }

    customConfig.prototype.upstreamUrl = function (err, stdout, stderr, cb) {
        repoConfig.upstreamUrl = raw(stdout);
        writeJson(repoConfig, stdout);
        cb();
    }

    customConfig.prototype.originUrl = function (err, stdout, stderr, cb) {
        repoConfig.originUrl = raw(stdout);
        writeJson(repoConfig, stdout);
        cb();
    }

    customConfig.prototype.commitId = function (err, stdout, stderr, cb) {
        repoConfig.commit.id = raw(stdout);
        writeJson(repoConfig, stdout);
        cb();
    }

    customConfig.prototype.commitMsg = function (err, stdout, stderr, cb) {
        repoConfig.commit.message = raw(stdout);
        writeJson(repoConfig, stdout);
        cb();
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON('Content/styles/config/csscomb.json'),
        user: grunt.file.readJSON(userInfo),
        build: getBuild(),
        lintFile: 'Content/CSS-Lint-Report/build-<%= build %>-date-<%= grunt.template.date(\"mm-dd\") %>.txt',

        shell: {
            options: {
                stderr: false,
                stdout: false,
                failOnError: false
            },

            userName: {
                command: 'git config --get user.name',
                options: {
                    callback: customConfig.prototype.userName
                }
            },

            currentBranch: {
                command: 'git rev-parse --symbolic-full-name --abbrev-ref HEAD',
                options: {
                    callback: customConfig.prototype.currentBranch
                }
            },

            upstreamUrl: {
                command: 'git config --get remote.upstream.url',
                options: {
                    callback: customConfig.prototype.upstreamUrl
                }
            },

            originUrl: {
                command: 'git config --get remote.origin.pushurl',
                options: {
                    callback: customConfig.prototype.originUrl
                }
            },

            commitId: {
                command: 'git rev-parse --short HEAD',
                options: {
                    callback: customConfig.prototype.commitId
                }
            },

            commitMsg: {
                command: 'git log -1 --oneline',
                options: {
                    callback: customConfig.prototype.commitMsg
                }
            }
        },

        // Hack to remove all banners and comments from CSS
        concat: {
            options: {
                stripBanners: true
            },
            frontend: {
                src: ['Content/Styles/dist/frontend.css'],
                dest: 'Content/Styles/dist/frontend.css'
            },
            backend: {
                src: ['Content/Styles/dist/backend.css'],
                dest: 'Content/Styles/dist/backend.css'
            }
        },

        // Add New banner to head of production CSS files in 'dist' folder
        usebanner: {
            css: {
                options: {
                    position: 'top',
                    banner: '/* \n' +
                    ' * <%= pkg.cssInfo.title %> v<%= pkg.cssInfo.version %> * \n' +
                    ' * <%= pkg.cssInfo.coreTeam %> * \n' +
                    ' * Build Id: <%= build %> * \n' +
                    ' *****  WARNING WARNING WARNING  ***** \n' +
                    ' * DO NOT EDIT THIS FILE * \n' +
                    ' * THIS IS AN AUTO GENERATED FILE * \n' +
                    ' * ALL CHANGES WILL BE ERASED * \n' +
                    ' * PLEASE MAKE EDITS IN -- CONTENT/STYLES/SASS/** -- * \n' +
                    ' * Changed: <%= grunt.template.date(\"dddd, mmmm dS, yyyy, \'at\' h:MM:ss TT\") %> * \n' +
                    '*/ \n',
                    linebreak: true
                },
                files: {
                    src: ['Content/Styles/dist/*.css']
                }
            },

            // Add current user, repo, build and system info to CSS lint file
            report: {
                options: {
                    position: 'top',
                    banner: "<%= pkg.name %> | <%= pkg.cssInfo.title %> | Build: <%= build %>\n" +
                    "\n *** AUTO GENERATED FILE ***" +
                    "\nThis file is generated automaticly on every build. \n" +
                    "No info herin is manually entered.\n" +
                    "\n *** AUTO GENERATED FILE *** \n" +
                    "\n<%= user.name %> compiled this build on <%= grunt.template.date(\"dddd, mmmm dS, yyyy, 'at' h:MM:ss TT\") %> \n" +
                    "The build was completed on the (<%= user.commit.branch %>) branch.\n" +
                    "The commit mesagge and commit id(sha) at the time of build was (\"<%= user.commit.message %>\")\n" +
                    "You can view the code for this commit/build at www.<%= pkg.repository.url %>/commit/<%= user.commit.id %> \n" +
                    "Upstream Url: <%= user.upstreamUrl %> \n" +
                    "Origin Url: <%= user.originUrl %> \n" +
                    "Version: v<%= pkg.cssInfo.version %> \n" +
                    "Browsers Supported: <%= pkg.config.autoprefixerBrowsers %> \n" +
                    "\n *** AUTO GENERATED FILE ***",
                    linebreak: true
                },
                files: {
                    src: ['<%= lintFile %>']
                }
            }
        },

        // Task configuration.
        clean: {
            dist: 'Content/Styles/dist/**'
        },

        // Sass compiler and distribution task
        compass: {
            sasssource: {
                options: {
                    noLineComments: true,
                    sourcemap: true,
                    specify: ['Content/Styles/sass/frontend.scss',
                              'Content/Styles/sass/backend.scss'],
                    sassDir: 'Content/Styles/sass',
                    cssDir: 'Content/Styles/dist',
                    imagesDir: 'Content/Images',
                    fontsDir: 'Content/Fonts',
                    relativeAssets: true,
                    boring: true,
                    debugInfo: false,
                    outputStyle: 'expanded',
                    raw: "preferred_syntax = :scss\n"
                }
            }
        },

        // Prefix CSS to work prefix browsers
        autoprefixer: {
            options: {
                browsers: '<%= pkg.config.autoprefixerBrowsers %>',
                map: false
            },
            frontend: {
                src: 'Content/Styles/dist/frontend.css'
            },
            backend: {
                src: 'Content/Styles/dist/backend.css'
            }
        },

        // Check that CSS code styles are up to par and there are no obvious mistakes
        csslint: {
            options: {
                csslintrc: 'Content/Styles/config/csslintrc.json',
                formatters: [
                  {
                      id: 'text', dest: '<%= lintFile %>'
                  }
                ]
            },
            dist: [
              'Content/Styles/dist/frontend.css',
              'Content/Styles/dist/backend.css'
            ]
        },

        // Reformat CSS to code conventions listed in ~/Content/Styles/config
        csscomb: {
            options: {
                config: 'Content/Styles/config/csscomb.json'
            },
            dist: {
                expand: true,
                cwd: 'Content/Styles/dist/',
                src: ['*.css', '!*.min.css', '!*.css.map'],
                dest: 'Content/Styles/dist/'
            },
            sass: {
                expand: true,
                cwd: 'Content/Styles/sass/',
                src: ['*.scss', '**/**.scss'],
                dest: 'Content/Styles/sass/'
            }
        },

        // Watch for changes on Scss files and run task
        watch: {
            test: {
                files: ['Content/Styles/sass/*scss', 'Content/Styles/sass/**/*scss'],
                tasks: ['compass', 'autoprefixer', 'csscomb', 'concat', 'lint', 'usebanner']
            }
        }
    });

    // Load all grunt plugins listed in ~/package.json
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    // CSS Lint
    grunt.registerTask('lint', ['csslint']);

    // CSS Comb
    grunt.registerTask('comb', ['csscomb']);

    // Default Task
    grunt.registerTask('default', ['clean', 'compass', 'autoprefixer', 'csscomb', 'lint', 'usebanner']);

    // Full Distribution Task.
    grunt.registerTask('dist', ['shell', 'clean', 'compass', 'autoprefixer', 'csscomb', 'lint', 'usebanner']);

};
