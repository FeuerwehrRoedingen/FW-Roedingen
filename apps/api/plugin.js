const { esbuildDecorators } = require('@anatine/esbuild-decorators');
const path = require('path');

const cwd = process.cwd();
const tsconfig = path.resolve(cwd, 'tsconfig.json');

module.exports = [esbuildDecorators({ tsconfig, cwd })];
