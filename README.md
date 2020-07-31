# Gulp Starter Kit

A simple Gulp 4 starter kit
### Features
  - Compile PUG template files to HTML files 
  - Compile SASS files to CSS
  - SASS files are organized according to the 7-1 pattern and includes styles for Bootstrap 4 in the vendors folder
  - Autoprefix and minify CSS files
  - Concatenate all CSS files into one
  - Compile ES6 files into backward compatible versions of JS using Babel
  - Concatenate all JS files and minify them
  - Compress images and copy them to the dist folder
  - Initialize a local server with BrowserSync at http://localhost:3000 with autoreloading

### Use
To start using the kit, open the project, go to the dev-gulp folder and run ```npm install``` then command ```gulp```

```
npm install
cd dev-gulp
gulp
```

This will open up a browser window with the project running, and any made changed and saved on a pug, js or scss file will autoreload the browser window.
