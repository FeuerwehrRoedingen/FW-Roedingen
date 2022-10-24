import React, { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { mkdtemp, readFile, rm, writeFile } from 'fs/promises'
import { join } from 'path'
import browserify from 'browserify'
import { transformFileAsync } from '@babel/core'
import chalk from 'chalk'

import { Login } from './Login.js'

export async function generateHTML(){
  console.log(chalk.cyan('[info]'),'creating HTML files');
  const template = await readFile(join(__dirname, 'index.html'), 'utf-8')

  const renderedLoginFile = renderToString(createElement(Login));
  console.log(chalk.green('[done]'),'rendering static HTML');

  const loginOut = template.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedLoginFile}<div><a id="version_number" class="${process.env.npm_package_version}"></a><script defer src=\"/js/login.js\"></script>`
  ).replace(
    '<title></title>',
    `<link rel="stylesheet" href="/css/ReactToastify.css"><title>Login</title>`
  );
  
  console.log(chalk.cyan('[info]'),'writing HTML files');
  writeFile(join(__dirname, '../dist', 'login.html'), loginOut, 'utf-8');

  console.log(chalk.green('[done]'),'generating HTML');
}

export async function generateBundles(){
  const directory = await mkdtemp(__dirname);
  console.log(chalk.cyan('[info]'), 'creating tmp directory')
  // bundlefactoy takes a filename which should be present in components folder and creates a hydration bundle
  async function bundleFactory(file: string){
    const filename = file.split('.').at(0)!;
    console.log(chalk.cyan('[info]'), 'creating bundle for', filename);

    const transformedFile = await transformFileAsync(join(__dirname, file));

    await writeFile(join(directory, `${filename}.js`), transformedFile?.code!);

    // wrap a promise around browserify and call resolve when the bundling is done
    await (async () => {
      return new Promise<void>(async function(resolve, reject){
        browserify()
        .add(join(directory, `${filename}.js`))
        .bundle(async (error, buffer) => {
          if(error){
            console.error(chalk.redBright('[error]'), error.message)
            resolve();
          } else {
            await writeFile(join(__dirname, `../public/js/${filename}.js`), buffer);
            resolve();
          }
        })
      })
    })()

    console.log(chalk.green('[done]'), 'bundling', filename);
    return Promise.resolve();
  }
  try{
    await Promise.all([
      bundleFactory('login.tsx')
    ]);
  }
  catch(error: any){
    console.error(chalk.redBright('[error]'), error.message)
  }
  console.log(chalk.cyan('[info]'), 'removing tmp directory')

  rm(directory, {force: true, recursive: true});

  return Promise.resolve();
}
