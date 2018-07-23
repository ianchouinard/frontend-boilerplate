
# Front End Boilerplate
Boilerplate setup I use for static front end web development. This boilerplate includes...
    - Node.js express server to serve the front end
    - EJS templating engine
    - Bootstrap 4
    - Grunt.js with configured tasks for the following....
        - Browsersync & live reload
        - Babel for ES6 JS to ES5 compilation
        - Rollup for JS bundling
        - SCSS compass to CSS compilation
        - CSS and JS minification

## File Structure
    - /dev : This contains the source files for the front end
        - /dev/library : This contains the assets, css, and JS (Make sure you do CSS and JS dev in /library/src !!!)
            - /dev/library/src : This contains the precompiled SCSS and ES6 JS files (Do css & js development here!!!!)
        - /dev/App : This contains the EJS template files.
            - /dev/App/MasterPages : Master page for project. (Import css/jss and router header/footer/content)
            - /dev/App/Templates : Page templates for project (Use this to create new web pages. Ex: .../inner-page would be /Templates/inner-page.ejs)
            - /dev/App/UserControls : Partial templates (or includes if you will) to be used in project. 
    - /Static : The static html project. Only exists after running 'node compile-frontend.js'.

## Getting started
- Have node installed. LTS is fine. https://nodejs.org/en/
- Install grunt js https://gruntjs.com/getting-started
- Run 'npm install' from this directory.
- Run 'grunt' to start the dev server that serves the ejs files.
    - This will also listen to the scss and es6 JS files, and compile them.

## Compile static HTML
- To compile the /dev directory into normal, node node.js html files (files you can throw up on a server), Run 'node compile-frontend.js'. This will create a /static directory with the html output for the project.