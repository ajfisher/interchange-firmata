# Interchange Firmata

This project creates precompiled hex files of StandardFirmata so that they can
be used by any project that needs them to be loaded automatically such as by 
ChromeBots, Interchange or avrgirl. They will be periodically updated as required
in order to maintain higher alignment with firmata than the arduino project can
provide.

## Installation

Generally if you need to use interchange firmata you're best off using it from
one of the downstream tools such as interchange. Installing standard firmata
on your board is as simple as:

```
interchange install firmata -a [boardtype] -p [port]
```

That instruction will consume this repo as required and pull it down.

## Development & contribution

If you'd like to contribute to this project, please raise any issues in
GH Issues and raise PRs. 

## Environment set up

This project does use firmata as a submodule so you will need to do the following:

```
git clone https://github.com/ajfisher/interchange-firmata.git
git submodule init
npm install
```

This will pull in the relevant latest version of arduino firmata to the project.

Other dependencies include at least version 1.6.6 of the arduino in order to 
build the hex files.

### Building hex files

To build the hex files you will need to export an `ARDUINO_PATH` variable to
your environment in order to provide the path to the arduino-cli application. 
More details on the location of this [can be found at the arduino project](https://github.com/arduino/Arduino/blob/master/build/shared/manpage.adoc)

Then from a command line execute:

```
grunt compile
```

the clean, build, compile process should then unfold.




