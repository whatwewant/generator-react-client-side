# generator-react-client-side [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Eason React Client Side Generator

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-client-side using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-client-side
```

Then generate your new project:

```bash
yo react-client-side
```

Then run your new project on develop mode

```bash
npm start
```

Or run your project on production mode

```bash
npm build
```

## History
* 2016-12-07
  * + support typescript with `typescript` and `ts-loader` modules
* 2016-10-11
  * + add css module, please know more about css module before.
  * + add postcss: px2rem
* 2016-10-02
  * +fix bug: add `file-loader` package
  * +update: build assets file path correct, like src/img/* => dist dist/img
  * +update: add html-webpack-plugin for production mode, like copy index.html -> dist
  * +fix bug: 
    * Problem: `Couldn't find preset "stage-0" relative to directory`
    * Solution: `http://stackoverflow.com/questions/34574403/how-to-set-resolve-for-babel-loader-presets`
* 2016-09-27
  * fix bug: babel-polyfill
  * support: sftp-webpack-plugin 
* 2016-09-23
  * add command to update config: `cd /path/to/YOUR_PROJECT; yo react-client-side --update`
  * update wepack config
    * + `alias`
    * + `#inline-source-map` # js debug

## License

MIT © [Eason Smith](http://colesmith.space)


[npm-image]: https://badge.fury.io/js/generator-react-client-side.svg
[npm-url]: https://npmjs.org/package/generator-react-client-side
[travis-image]: https://travis-ci.org/whatwewant/generator-react-client-side.svg?branch=master
[travis-url]: https://travis-ci.org/whatwewant/generator-react-client-side
[daviddm-image]: https://david-dm.org/whatwewant/generator-react-client-side.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/whatwewant/generator-react-client-side
[coveralls-image]: https://coveralls.io/repos/whatwewant/generator-react-client-side/badge.svg
[coveralls-url]: https://coveralls.io/r/whatwewant/generator-react-client-side
