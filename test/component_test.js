var grunt = require('grunt'),
    fs    = require('fs'),
    path  = require('path');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.component = {
  tearDown: function(done) {
    // setup here
    path.exists('./component.json', function(exists) {
      if (exists) {
        fs.unlink('./component.json', done);
      } else {
        done();
      }
    });
  },

  helper: function(test) {
    test.expect(3);

    var files = [
      'test/fixtures/simple_package.json'
    ];
    var dest = 'tmp/component';

    var simple_pkg = grunt.file.readJSON( files[0] );

    // basic test
    grunt.helper('component', simple_pkg, {});
    test.equal(grunt.file.read('component.json'),
               '{\n  "name": "simple_test_package",\n  "version": "1.0.0",\n  "main": "./foo.js",\n  "dependencies": {\n    "baz": "~1.0",\n    "qux": "git://github.com/user/project.git"\n  }\n}',
               'it should compile the component.json file');

    // specifying a component.main option
    grunt.helper('component', simple_pkg, {main:['./foo.js']});
    test.equal(grunt.file.read('component.json'),
               '{\n  "name": "simple_test_package",\n  "version": "1.0.0",\n  "main": [\n    "./foo.js"\n  ],\n  "dependencies": {\n    "baz": "~1.0",\n    "qux": "git://github.com/user/project.git"\n  }\n}',
               'it should compile the component.json file with a main config option');

    // specifying a component.dependencies option
    grunt.helper('component', simple_pkg, {dependencies:{foo:'1.0.0',qux:'https://raw.github.com/user/project/123abchash/qux.js'}});
    test.equal(grunt.file.read('component.json'),
               '{\n  "name": "simple_test_package",\n  "version": "1.0.0",\n  "main": "./foo.js",\n  "dependencies": {\n    "baz": "~1.0",\n    "qux": "https://raw.github.com/user/project/123abchash/qux.js",\n    "foo": "1.0.0"\n  }\n}',
               'it should compile the component.json file with a dependencies config option');

    test.done();
  }
};