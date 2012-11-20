/*
 * grunt-pkg-to-component
 * https://github.com/dlindahl/grunt-pkg-to-component
 *
 * Copyright (c) 2012 Derek Lindahl
 * Licensed under the MIT license.
 */

var extend = function(dest, src) {
  'use strict';
  Object.keys(src).forEach(function(prop) {
    dest[prop] = src[prop];
  });

  return dest;
};

module.exports = function(grunt) {
  'use strict';

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('component', function(files, options) {
    this.requiresConfig('pkg');

    grunt.helper('component', grunt.config('pkg'), grunt.config('component'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('component', function(pkg, compConfig) {
    var component = {};

    ['name','version','main','dependencies'].forEach(function(prop) {
      if (prop in pkg) { component[prop] = pkg[prop]; }
    });

    if( compConfig.main ) {
      component.main = compConfig.main;
    }

    if( compConfig.dependencies ) {
      Object.keys(compConfig.dependencies).forEach(function(prop) {
        component.dependencies[prop] = compConfig.dependencies[prop];
      });
    }

    grunt.file.write( 'component.json', JSON.stringify(component, null, 2) );
  });
};
