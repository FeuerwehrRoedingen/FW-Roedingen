import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { mkdtemp, readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import browserify from 'browserify';
import { transformFileAsync } from '@babel/core';
import chalk from 'chalk';
import { Login } from './Login.js';
export async function generateHTML() {
    console.log(chalk.cyan('[info]'), 'creating HTML files');
    const template = await readFile(join(__dirname, 'index.html'), 'utf-8');
    const renderedLoginFile = renderToString(createElement(Login));
    console.log(chalk.green('[done]'), 'rendering static HTML');
    const loginOut = template.replace('<div id="root"></div>', `<div id="root">${renderedLoginFile}<div><a id="version_number" class="${process.env.npm_package_version}"></a><script defer src=\"/js/login.js\"></script>`).replace('<title></title>', `<link rel="stylesheet" href="/css/ReactToastify.css"><title>Login</title>`);
    console.log(chalk.cyan('[info]'), 'writing HTML files');
    writeFile(join(__dirname, '../dist', 'login.html'), loginOut, 'utf-8');
    console.log(chalk.green('[done]'), 'generating HTML');
}
export async function generateBundles() {
    const directory = await mkdtemp(__dirname);
    console.log(chalk.cyan('[info]'), 'creating tmp directory');
    // bundlefactoy takes a filename which should be present in components folder and creates a hydration bundle
    async function bundleFactory(file) {
        const filename = file.split('.').at(0);
        console.log(chalk.cyan('[info]'), 'creating bundle for', filename);
        const transformedFile = await transformFileAsync(join(__dirname, file));
        await writeFile(join(directory, `${filename}.js`), transformedFile?.code);
        // wrap a promise around browserify and call resolve when the bundling is done
        await (async () => {
            return new Promise(async function (resolve, reject) {
                browserify()
                    .add(join(directory, `${filename}.js`))
                    .bundle(async (error, buffer) => {
                    if (error) {
                        console.error(chalk.redBright('[error]'), error.message);
                        resolve();
                    }
                    else {
                        await writeFile(join(__dirname, `../public/js/${filename}.js`), buffer);
                        resolve();
                    }
                });
            });
        })();
        console.log(chalk.green('[done]'), 'bundling', filename);
        return Promise.resolve();
    }
    try {
        await Promise.all([
            bundleFactory('login.tsx')
        ]);
    }
    catch (error) {
        console.error(chalk.redBright('[error]'), error.message);
    }
    console.log(chalk.cyan('[info]'), 'removing tmp directory');
    rm(directory, { force: true, recursive: true });
    return Promise.resolve();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFDNUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQTtBQUMzQixPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUE7QUFDbkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ2hELE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUV6QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRWxDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWTtJQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN4RCxNQUFNLFFBQVEsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRXZFLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBRTNELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQy9CLHVCQUF1QixFQUN2QixrQkFBa0IsaUJBQWlCLHNDQUFzQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixvREFBb0QsQ0FDN0osQ0FBQyxPQUFPLENBQ1AsaUJBQWlCLEVBQ2pCLDJFQUEyRSxDQUM1RSxDQUFDO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDdkQsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV2RSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxlQUFlO0lBQ25DLE1BQU0sU0FBUyxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO0lBQzNELDRHQUE0RztJQUM1RyxLQUFLLFVBQVUsYUFBYSxDQUFDLElBQVk7UUFDdkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRW5FLE1BQU0sZUFBZSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXhFLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxRQUFRLEtBQUssQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFLLENBQUMsQ0FBQztRQUUzRSw4RUFBOEU7UUFDOUUsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQU8sS0FBSyxXQUFVLE9BQU8sRUFBRSxNQUFNO2dCQUNyRCxVQUFVLEVBQUU7cUJBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxRQUFRLEtBQUssQ0FBQyxDQUFDO3FCQUN0QyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDOUIsSUFBRyxLQUFLLEVBQUM7d0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTt3QkFDeEQsT0FBTyxFQUFFLENBQUM7cUJBQ1g7eUJBQU07d0JBQ0wsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsUUFBUSxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDeEUsT0FBTyxFQUFFLENBQUM7cUJBQ1g7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFFSixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFHO1FBQ0QsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2hCLGFBQWEsQ0FBQyxXQUFXLENBQUM7U0FDM0IsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFNLEtBQVUsRUFBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDekQ7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsd0JBQXdCLENBQUMsQ0FBQTtJQUUzRCxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUU5QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMzQixDQUFDIn0=