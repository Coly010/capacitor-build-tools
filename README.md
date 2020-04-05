# Capacitor Build Tools

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Build tools to aid automated CI/CD of capacitor apps.

This set of build tools currently contains tools to:

- [Generate Resources](#generate-resources)

## Generate Resources

The Generate Resources tool generates icons and splash screens at different resolutions for Android and iOS Apps built with Capacitor from a base icon and splash image.
The tool requires you to pass the arguments of icon path and splash plath. For a full list of arguments, see below:

```
Usage: gen-cap-res [options]

Generate Icon and Splash for Apps

Options:
  -V, --version       output the version number
  --android           Generate Android Resources (default: true)
  --ios               Generate iOS Resources (default: true)
  -i --icon <path>    Path to Icon file (default: "")
  -s --splash <path>  Path to Splash file (default: "")
  -v --verbose        Verbose Logging (default: false)
  -h, --help          display help for command
```
