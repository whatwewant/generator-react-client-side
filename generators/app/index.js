'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const os = require('os');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');

const USERNAME = os.userInfo().username

module.exports = yeoman.Base.extend({
  initializing () {
    this.props = {};
  },

  prompting () {
    this.log(yosay(
      'Welcome to the mathematical ' + chalk.red('generator-react-client-side') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Input Project Name:',
    }, {
      type: 'input',
      name: 'projectDesc',
      message: 'Input Project Description:',
    }, {
      type: 'confirm',
      name: 'projectMain',
      message: 'Main File (app.js):',
      default: true
    }, {
      type: 'input',
      name: 'projectAuthor',
      message: `Author (Default: ${ USERNAME }):`,
      default: USERNAME
    }, {
      type: 'list',
      name: 'projectLicense',
      message: 'Choose License (Default: MIT):',
      choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0'],
      default: 'MIT',
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  },

  defaults () {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        `You generator must be inside a folder named ${this.props.projectName} I will automatically create this folder.`
      );
    }

    mkdirp(this.props.projectName);
    this.destinationRoot(this.destinationPath(this.props.projectName));
  },

  writing () {
    // File Tree
    //    .
    //    ├── package.json
    //    ├── src
    //    │   ├── actions/
    //    │   ├── app.js
    //    │   ├── components/
    //    │   ├── containers/
    //    │   ├── index.html
    //    │   ├── reducers/
    //    │   ├── store/
    //    │   └── lib/
    //    └── webpack.config.js


    // 1 package.json
    const defaultPkg = this.fs.readJSON(this.templatePath('package.json'), {});
    const pkg = extend(
      {},
      defaultPkg,
      {
        name: this.props.projectName,
        description: this.props.projectDesc,
        main: this.props.projectMain,
        author: this.props.projectAuthor,
        license: this.props.projectLicense,
        keywords: [ ...defaultPkg.keywords, 'generator-react-client-side' ],
        devDependencies: {
          // develop dependencies
        },
        dependencies: {
          // production dependencies
        }
      }
    );
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // 2 webpack config
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

    // 3 .gitignore
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    // 4 directories
    mkdirp('src/components');
    mkdirp('src/containers');
    mkdirp('src/actions');
    mkdirp('src/reducers');
    mkdirp('src/store');
    mkdirp('src/lib');

    // 5 index.html
    this.fs.copy(
      this.templatePath('index.html'),
      'src/index.html'
    );

    // 6 entry: app.js
    this.fs.copy(
      this.templatePath('app.js'),
      `src/app.js`
    );

    // 7 License
    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE')
    );
  },

  install () {
    this.installDependencies();
  }
});
