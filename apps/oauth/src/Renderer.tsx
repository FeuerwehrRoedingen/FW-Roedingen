import React from 'react'
import { renderToString } from 'react-dom/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { transformAsync, transformFileAsync } from '@babel/core'
import browserify from 'browserify'
import { Readable } from 'stream'
import chalk from 'chalk'

import AuthPage from './components/authorize'
import HomePage from './components/home'
import LoginPage from './components/login'

export async function generateHTML(){
  console.log('readinging HTML template')
  var template = await readFile(join(__dirname, 'index.html'), 'utf-8')

  console.log('rendering static HTML')
  const renderedAuthFile = renderToString(<AuthPage/>);
  const renderedHomeFile = renderToString(<HomePage/>);
  const renderedLoginFile = renderToString(<LoginPage/>);

  console.log('creating html files')
  const authOut = template.replace(
    '<div id=\"root\”><div>',
    `<div id=\"root\”>${renderedAuthFile}<div><script defer src=\"auth.js\"/>`
  ).replace(
    '<title></title>',
    `<title>Authentication</title>`
  );
  const homeOut = template.replace(
    '<div id=\"root\”><div>',
    `<div id=\"root\”>${renderedHomeFile}<div><script defer src=\"home.js\"/>`
  ).replace(
    '<title></title>',
    `<title>Home</title>`
  );
  const loginOut = template.replace(
    '<div id=\"root\”><div>',
    `<div id=\"root\”>${renderedLoginFile}<div><script defer src=\"login.js\"/>`
  ).replace(
    '<title></title>',
    `<title>Login</title>`
  );
  
  console.log('writing files')
  writeFile(join(__dirname, '../public/html/auth.html') , authOut , 'utf-8')
  writeFile(join(__dirname, '../public/html/index.html'), homeOut , 'utf-8');
  writeFile(join(__dirname, '../public/html/login.html'), loginOut, 'utf-8');
}

//bundlefactoy takes a filename which should be present in components folder and creates a hydration bundle
function bundleFactory(filename:string){
  return async function(){
    console.log(chalk.cyan('[info]'), 'transforming files for' , filename);
    
    const _hydrationFile = (await transformFileAsync(join(__dirname, 'hydration.js')))?.code!;
    const hydrationFile = _hydrationFile.replace('%%filename', filename);
    const hydrationBuffer = Buffer.from(hydrationFile);
    const hydrationStream = Readable.from(hydrationBuffer);

    
    const pageFile = (await transformFileAsync(join(__dirname, `components/${filename}.tsx`)))?.code!;
    const pageBuffer = Buffer.from(pageFile);
    const pageStream = Readable.from(pageBuffer);
    
    console.log(chalk.magenta('[done]'), 'Babelifiying', filename)

    console.log(chalk.cyan('[info]'), 'bundling', filename)
    browserify()
    .require(pageStream, {expose: filename})
    .add(hydrationStream)
    .bundle()
    .pipe(process.stdout)

    console.log(chalk.magenta('[done]'), 'bundling', filename)
  }
}

export async function generateBundles(){
  return Promise.all([
    bundleFactory('authorize')(),
    bundleFactory('home')(),
    bundleFactory('login')()
  ])
}
