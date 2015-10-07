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
            compile_firmata_uno: {
                command:function() {
                    
                    return arduino + " --verify --verbose-build --board "  + boards["uno"].package + 
                    " --pref build.path=bin/" + "uno" +  " build/StandardFirmata/StandardFirmata.ino";
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
                        'build/*',
                     ]
            },
            compiled_bins: {
                src: [
                        'bin/*',
                    ]
            },
        },
        'string-replace': {
            precompile: {
                files: [{
                    src: 'build/StandardFirmata/StandardFirmata.ino',
                    dest: 'build/StandardFirmata/StandardFirmata.ino',
                    }],
                options: {
                    replacements: [{
                        pattern: /<Firmata\.h>/,
                        replacement: '"Firmata.h"',
                    }],
                },
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
    grunt.loadNpmTasks('grunt-string-replace');

/**    // dynamically create the compile targets for the various boards
    Object.keys(boards).forEach(function(key) {
        grunt.config(["exec", key], {
            command:function() {
                return arduino + " --verify --verbose-build --board "  + boards[key].package + 
                " --pref build.path=bin/" + key +  " build/StandardFirmata/StandardFirmata.ino";
            },
        });
    }); **/

    grunt.registerTask('test', ['nodeunit:all']);
    grunt.registerTask('build', ['clean', 'copy', 'string-replace']);
/**    grunt.registerTask('compile', ['build', 'exec'])**/
};
