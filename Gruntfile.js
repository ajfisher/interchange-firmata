var arduino = process.env.ARDUINO_PATH;

var boards = {
    "uno" :{
        package: "arduino:avr:uno",
    },
    "nano": {
        cpu: "atmega328",
        package: "arduino:avr:nano:cpu=atmega328",
    },
    "promini": {
        cpu: "16MHzatmega328",
        package: "arduino:avr:pro:cpu=16MHzatmega328",
    },
};

module.exports = function(grunt) {
 
    // configure the tasks
    grunt.initConfig({
        exec: {
            compile_firmata: {
                cwd: "bin/",
                command:function(board) {
                    return arduino + " --verify --verbose-build --board "  + boards[board].package + 
                    " --pref build.path=bin/" + board +  " build/hcsr04_firmata/hcsr04_firmata.ino";
                },
            },
        },

        copy: {
            options: {
                timestamp: true,
            },

            firmata: {
                cwd: 'arduino',
                flatten: true,
                src: [ 'examples/StandardFirmata/*', 'Boards.h', 'Firmata.cpp', 'Firmata.h' ],
                dest: 'build/StandardFirmata/',
                expand: true,
                filter: 'isFile',
            },
        },
        clean: {
            firmware_build: {
                src: [  
                        'build/**',
                     ]
            },
            compiled_bins: {
                src: [
                        'bin/**',
                    ]
            },
        },
        nodeunit: {
            all: ['test/',],
            options: {
                reporter: "verbose",
            },
        },
    });
 
    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['nodeunit:all']);
    grunt.registerTask('build', ['clean', 'copy']);
    grunt.registerTask('compile', ['build', 'exec:compile_firmata:uno', 'exec:compile_firmata:nano', 'exec:compile_firmata:promini' ]);
};
