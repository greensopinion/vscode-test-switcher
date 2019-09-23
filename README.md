# test-switcher README

Switch between source and test files with a single command. For use with JavaScript and TypeScript and Jest, inspired by MoreUnit.

## Features

Use `CTRL+SHIFT+T` or `CMD+SHIFT+T` to switch between application source code and test code.

If the test doesn't exist, a new file is created.

## Limitations

* There is no way to configure the extension to know about various folder structures
* There is no way to configure the new test template

## Changelog

### 0.2.0

Initial release including basic functionality.

## Contributing

Feel free to fork and experiment with changes.

### Building and Installing

To package your changes for local installation, try:

`npm run package`

Then from Visual Studio Code, run the "Extensions: Install from VSIX..." command

## Publishing

Running the following command will run tests, package and publish the extension to the marketplace:

`npm run publish`