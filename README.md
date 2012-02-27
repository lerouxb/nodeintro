Node.js Introduction.
===


### package.json

Contains the npm info. Run `npm install` to install the dependencies.

### build.js

Use [node-markdown](https://github.com/andris9/node-markdown) to convert slides.markdown to html and then replace {{slides}} in template.html with that and save to index.html. Run it with `node build`.

### index.html

The slideshow generated by build.js. Visit http://thisip:3000/ to view.

### app.js

The [socket.io](http://socket.io/)-backed server-side portion of the app that advances the slides. Run it with `node app`.

### config.json

The secret key that allows you to act as the speaker, the hostname and port.

### slides.markdown

Just some h1, ul, li, a, strong, em and code tags in markdown that make up the content of the presentation. Each h1+ul group becomes a "screen" and each h1 or li tag becomes a "step".

### template.html

The html boilerplate that surrounds the slides.

### slides.js

Client-side code for changing the slides.

### slides.css

The stylesheet.

