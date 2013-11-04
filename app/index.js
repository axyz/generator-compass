'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var CompassGenerator = module.exports = function CompassGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CompassGenerator, yeoman.generators.Base);

CompassGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/sass');
  this.mkdir('app/sass/fonts');
  this.mkdir('app/images');
  this.template('_compass-modules.rb', 'compass-modules.rb');
  this.template('_config-dev.rb', 'config-dev.rb');
  this.template('_config-dist.rb', 'config-dist.rb');
  this.template('_package.json', 'package.json');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('_index.html', 'app/index.html');
  this.copy('sass/ie.scss', 'app/sass/ie.scss');
  this.copy('sass/print.scss', 'app/sass/print.scss');
  this.copy('sass/screen.scss', 'app/sass/screen.scss');

  this.copy('_bower.json', 'bower.json');
};

CompassGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
