# grunt-pkg-to-component

Generates a `component.json` based on your project's `package.json`

## Installation

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with:

`npm install grunt-pkg-to-component`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-pkg-to-component');
```

## Configuration

At a minimum, this will use your `package.json` file's `name`, `version`,
`main`, and `dependencies` properties.

If you wish to indicate which files are to be distributed, override properties,
or add additional dependencies, add the following to your `grunt.js` file:

```javascript
grunt.initConfig({
  component : {
    main : './path/to/a/file.js', // Can be a String or an Array
    dependencies : {
      'other_lib' : '~1.0.0',
      'another_lib' : https://raw.github.com/octocat/another_lib/123abchash/another_lib.min.js'
    }
  }
});
```