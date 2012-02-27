Browse to http://<span class="hostname">hostname</span>:<span class="port">port</span>/
===

What is node.js?
================

* Evented I/O for V8 JavaScript.
* It isn't a language.
* It isn't a library (in the usual sense).
* It isn't a framework (in the usual sense).
* It is the virtual machine plus batteries included.
* [Event loop hidden from the user](http://nodejs.org/about/). (just like in the browser)
* Or consider it a C/C++ I/O engine that's scriptable in JavaScript.
* First class support for [HTTP](https://github.com/joyent/http-parser) and
[processes](http://nodejs.org/docs/latest/api/child_processes.html#child_process.fork).


A step back
===========


Why Evented I/O?
================

* The [C10K problem](http://www.kegel.com/c10k.html) has lots more info than what I'm about to go into.
* Most things are I/O bound and not CPU bound.
* Processes (can be) heavy.
* Threads are not (always) ideal.
* Memory usage per concurrent connection.
* Evented: Typically everything runs in parallel _except_ your code.


Why JavaScript?
===============

* Made for event-driven programming.
* Closures.
* Anonymous functions.
* Functions are first-class objects.
* Curly-brace language.
* No "standard library" to speak of.
* You don't need IDEs that generate code.


Why node?
=========

* V8 is really fast, mature and in active development.
* The important parts of node are really fast.
* You're writing a web server, not serialising/deserialising http again.
* You can deal with http requests before they are complete.
* `function(req, res) {res.send();}` vs
  <br>`function(req) {return response();}`
* Incredible momentum. In fact - no real competition in this space.


Installing node
===============

* **windows:** download and run the .msi
* **mac:** download and run the .pkg
* **linux/unix:** download the .tar.gz, ./configure, make, make install
* npm is now bundled.


What's npm? How does it work?
=============================

* [Node Package Manager](http://npmjs.org/).
* npm init; edit packages.json
* git clone; npm install
* node\_modules directory
* No (or little) need for virtualenv-like things.
* [TONS of packages](http://search.npmjs.org/).
* **Packages, dependencies and installation are already solved problems.**


When should you consider node?
==============================

* Whenever you're already considering an evented framework/library.
* If your team already has html5+css+js (whatever flavours) people.
* Chatty "soft-realtime" communication type things centered around the browser.
* JSON-heavy apps.
* Single-page "HTML5" apps.
* Spawn processes, use existing unix tools.
* Streaming.
* Proxying (nginx on steroids).
* Sharing code between the browser and elsewhere.


Sharing code between the browser and elsewhere
==============================================

* Testing pure JavaScript outside the browser.
* Use the same templating engine and the same templates.
* Run the model or form validation.
* Use the system from the command-line.
* Why implement things twice?
* CSS pre-processors (less, sass, stylus, prefix-free, etc.)
* Languages like CoffeeScript and others.
* Text-to-html like markdown, textile.
* Date/number/string formatting or other utilities.
* Syntax parsers and hilighters.
* Full apps (games?) that run inside AND outside the browser.


Node isn't always the answer (yet)
==================================

* CPU-bound apps.
* Anywhere you just don't care about scaling to lots of connections per CPU.
* Think twice whenever you're considering using it for non-I/O-heavy things.
* Don't reinvent the wheel. Get the job done.


The bad
=======


JavaScript warts
================

* There is no PEP 8 for JavaScript. [Douglas Crockford](http://javascript.crockford.com/) comes closest.
* 'this'-binding will enrage you.
* You'll miss Python's for loops, duck-typing "protocols", built-in types.
* You'll miss Python-style exceptions and Python's way of using exceptions.
* [There are two ways of defining functions](http://stackoverflow.com/questions/336859/javascript-var-functionname-function-vs-function-functionname).
* Only global and function-level variable scoping, variables are global by default.
* == and ===, != and !==, null and undefined.
* Automatic variable conversion can confuse you.
* Unicode is pre version 2.0 (circa 1996) that only supports the lower 16 bits.
* No 64 bit ints, but 64 bit floats with a 52 bit mantissa.
* Prototypes just aren't classes.
* Some people extend the built-in prototypes. Please don't do this.
* It is easy to write spaghetti code.
* There is a lot of misinformation out there.


Problems that aren't JavaScript specific
========================================

* Within your node.js process "cooperative multi-tasking" is taking place.
* Unhandled exceptions can easily kill your server.
* Don't just do `if (err) throw err;`
* You have to pass on errors as the first parameter _everywhere_.
* `if (err) return callback(err);`
* Calling callbacks immediately vs only "once the stack is gone" will cause bugs. Probably only after you refactor.
* `callback(err);` vs
  <br>`setTimeout(function() {callback(err);}, 0);`


Resources
=========

* [node.js site](http://nodejs.org/)
* [node.js documentation](http://nodejs.org/docs/latest/api/index.html)
* [npm modules](http://search.npmjs.org/)
* [node modules wiki](https://github.com/joyent/node/wiki/modules)
* [Mozilla's JavaScript Reference](https://developer.mozilla.org/en/JavaScript/Reference)
* [Convincing the boss](http://nodeguide.com/convincing_the_boss.html)
* [The C10K problem](http://www.kegel.com/c10k.html)
* [The Changelog](http://thechangelog.com/)
* [Badass JS](http://badassjs.com/)
* [FunctionSource](http://functionsource.com/)
* [JS1K](http://js1k.com/)


Whom to follow
==============

* [Ryan Dahl](https://github.com/ry). Also [Joyent](https://github.com/joyent).
* [Isaac Z. Schlueter](https://github.com/isaacs).
* [TJ Holowaychuck](https://github.com/visionmedia).
* [Guillermo Rauch](https://github.com/guille).
* [Sencha Labs](https://github.com/senchalabs).
* [Jeremy Ashkenas](https://github.com/jashkenas).
* [Caolan McMahon](https://github.com/caolan).
* [Brendan Eich](https://twitter.com/BrendanEich).
* [CouchDB](http://couchdb.apache.org/), [MongoDB](http://www.mongodb.org/), [Redis](http://redis.io/)
