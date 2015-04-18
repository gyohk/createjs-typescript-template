module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        opt: {
            "tsDir": "src",
            "outDir": "dest"
        },
        ts: {
            options: {
                target: 'es5',
                module: 'commonjs',
                noImplicitAny: true
            },
            main: {
                src: ['<%= opt.tsDir %>/*.ts'],
                out: '<%= opt.outDir %>/js/Main.js'
            }
        },
        dtsm: {
            main: {
                options: {
                    config: "./conf/dtsm.json"
                }
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("./conf/tslint.json")
            },
            files: {
                src: ['<%= opt.tsDir %>/Main.ts']
            }
        },
        typedoc: {
            build: {
                options: {
                    module: 'commonjs',
                    out: './docs',
                    name: 'my-project',
                    target: 'es5'
                },
                src: ['./<%= opt.tsDir %>/**/*']
            }
        },
        copy: {
            app: {
                files: [
                    {expand: true, cwd: 'skeleton/', src: ['**'], dest: '<%= opt.outDir %>/'}
                ]
            }
        },
        clean: {
            build: {
                src: [
                    '<%= opt.outDir %>/**/*'
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: '<%= opt.outDir %>',
                    open: {
                        target: 'http://localhost:9001',
                        appName: 'Chrome' // open, Firefox, Chrome
                    },
                    keepalive: true
                    
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './<%= opt.outDir %>/libs',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false
                }
            }
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './<%= opt.outDir %>',
                    src: './js/**/**.js',
                    dest: './js/'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './<%= opt.outDir %>',
                    src: './css/**/**.css',
                    dest: './css/'
                }]
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './<%= opt.outDir %>', 
                    src: ['./images/*.{png,jpg,gif,svg}'],
                    dest: './images/'
                }]
            }
        },
        
    });
    
    grunt.registerTask('setup', ['clean', 'dtsm', 'copy', 'bower']);
    grunt.registerTask('default', ['ts', 'tslint']);
    grunt.registerTask('min', ['uglify', 'cssmin', 'imagemin']);
    
    /*
    // This feature has not yet been reflected in the NPM.
    // https://github.com/elsassph/createjs-def/pull/8/files?short_path=04c6e90
    
    grunt.registerTask('cjsdef', 'create d.ts file(s) from an output of the Toolkit for CreateJS', function() {
        var config = grunt.config();
        
        module.paths.push('./node_modules');
        var fs = require("fs");
        var createjs = require('createjs-def');
        
        var animation_data = fs.readFileSync(config.opt.outDir + 'assets/shape.js');
        var data = createjs.createDef(animation_data, 'typescript');
        fs.writeFile(config.opt.srcDir + 'shape.d.ts', data);
        
    });
    */
    
    // 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-dtsm');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
};