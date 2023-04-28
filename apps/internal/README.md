# Public Website

## ENV
Inside some projects are **.env.example** files, these contain dummy variables for every required enviromental variable for the project.
If you dont have other information, copy this file and rename it to **.env** this will make all the variables inside the file accessible inside JS via process.env.
Inside the env file are secrets for api/database connections and other confidential information, these values should **nerver** be accessible, always make sure you do not push them to git!

## Node
NodeJS is a runtime for server side Javascript code (code that is never going to be sent to the client).
**BUT** only the invisible backend code is NodeJS, the code we write **WILL** be sent to a client, so do not use ther NodeJS Docs for Javascript code, but the V8 JS docs. And pay attention, that no secrets or other confidential data get sent to the client.

## NPM
NPM Stands for Node Package Manager, so ... it manages packages for node :p
In Node projects, you load the sourcecode of a package you need directly into your project. Inside the node_modules directory are all packages used inside the project. The benefit is, that you do not need to load packages at runtime, because you already installed them. You can install as many versions of a package as you want, because they are uniqque for each package i.e. the web package uses React18 while Mobile uses React16.

### Workspaces
The node_modules for all projects get hoisted into the toplevel node_modules folder, this minimizes duplicates and frees up some space. 
Normally you use 
```bash
npm install <package>
```
to install node packages, but here you need to tell npm which project uses the package.
You can either go into the folder of the project you want to install the package in and use npm install normally, or you stay at the root folder and use
```bash
npm install --workspace=<name> <package>
```
the name for the desired project can be found inside its package.json.

## Scripts
- npm run dev : starts the development server on http://localhost:3000
- npm run build : compiles a production build, found inside dist directory
- npm start : starts the built production version

## Routing
We use NextJS 13 with the experimental app directory, every page.tsx file inside the app directory will be a webpage.
Eevery layout.tsx file wraps around the page.tsx file see [layouts](https://beta.nextjs.org/docs/routing/pages-and-layouts#layouts) in NextJS 13.
The URL of the webpage is depending on the relative path inside the app directory.
- /app/page.tsx -> http://localhost:3000
- /app/about/page.tsx -> http://localhost:3000/about
- /app/foo/bar/page.tsx -> http://localhost:3000/foo/bar

## CSS
Place your css files next to the tsx file which needs it and at the top add
```javascript
import './<filename>.css'
```
where \<filename\> is the name of the css file.

## React Crashcourse

React adds renderable elements to Javascript, these are Class Components and Functional Components. A Class Component looks like this:
```typescript
import React, { Component } from 'react'

type IProps = {}
type IState = {}

class MyComponent extends Component<IProps, IState>
{
  constructor(props: IProps)
  {
    super(props);
    this.state = {}
  }

  render()
  {
    return (
      <div />
    )
  }
}
```

while a Functional Component looks like this:
```typescript
import React from 'react'

type IProps = {}

function MyComponent(props: IProps)
{

  return(
    <div />
  )
}
```
### Props

Both contain a IProps type, this type indicates which Props get parsed to the Element when rendering it in HTML:
```jsx

type IProps = {
  foo: string;
  bar: number;
}

function MyComponent(props: IProps)
{
  return (<div/>)
}
```

When rendering this Component, you need to specify its props:
```html

<html>
...
  <body>
    <MyComponent foo="foo" bar={69} />
  </body>
</html>

```
### State
Why bother with Class Components when Functional Components look so much easier ?
As you probably guessed, it has to do with the type IState. A Class Component and Functional Component can contain state variables, these will rerender the page, if changed. 
Example:

```jsx
import React, { UseState } from 'react'

type IProps = {}

function Counter(props: Props)
{
  const [count, setCount] = useState(0);

  return(
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count+1)}>+1</button>
      <button onClick={() => setCount(count-1)}>-1</button>
    </div>
  )
}
```

everytime a button is pressed, the state variable **count** is updated, and with it, the page gets refreshed. Why ? if the page would not refresh, the count variable displayed on the screen would stay 0.

Didn`t you just say Class Components use State ?
Yes, but Functional Components can too, its a bit uglier and slower, but it works. I would highly recommend using functional components.

### Exports and Imports
Javascript is based on the ECMAScript standard, since 2015 it uses the ES Module syntax
```JS
//file a
import foo, { bar } from 'b'

//file b
export default foo
export function bar(){}
```

Whats the difference ?
A file can only contain one default export, but unlimited named exports.
Just remember:
- export default -> **no** {} when importing
- export function foo -> use {} when importing
- export const bar -> use {} when importing

### NextJS

NextJS 13 uses the app directory, inside it are folders, page.tsx, layout.tsx, loading.tsx and other files. The three named files should all default export a renderable item (i.e. Functional Component). The folders indicate a new subroute and can contain brackets:
- (folder) : does not change the path
- \[folder] : will listen to every path

example:
- app/(foo)/bar/page.tsx -> http://localhost:3000/bar
- app/(foo)/dog/page.tsx -> http://localhost:3000/dog
- app/chat/[id]/page.tsx -> http://localhost:3000/chat/*
  - whatever gets entered at the * will be available as a variable in the component
  - i.e. if there are chatrooms, a user can go to /chat/10 and enter chatroom 10, or to /chat/22 for room 22... (dynamic routing)

#### Layout.tsx
The layout.tsx file gets wrapped around every page.tsx files thats below it inside the app directory, things that appear on every page should be placed here  (i.e. Header).

#### Loading.tsx
If a user has as bad of an internet connection as our firehouse, the loading of all HTML, CSS and JS files will probably not be instant, so instead the loading.tsx file will be displayed, while page.tsx is loading.a

#### Page.tsx
A page.tsx file should have a renderable default export, renderable means a HTML or React Element. Because NextJS 13 can handle both server and client components, you need to indicate if a component **HAS** to be a client component. These components cannot be prebuild on the server and sent as static HTML with some JS Code, but have to be built by the client. To indicate a client component add
```javascript
"use client"
```
as the first line of the tsx file.

#### Why could a component only be rendered by the client?
- Short answer: I don`t know either, sometimes it throws an error when you try and access the page, adding "use client" fixes this, so... 
- Long answer: Functional Components can be destructured into atomic elements with anbd without hooks, while Class Components cannot. Some of these atomic Elements and all Class Components cannot be prerendered by NextJS.

# Links

## [V8 JS Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript?retiredLocale=de)
## [NextJS 13 Docs](https://beta.nextjs.org/docs/getting-started)
## [React 18 Docs](https://react.dev/learn)
## [NodeJS 18 Docs](https://nodejs.org/docs/latest-v18.x/api/synopsis.html)
## [NPM Docs](https://docs.npmjs.com/about-npm)
