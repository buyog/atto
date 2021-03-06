# Atto: Ultralight, Pure-JavaScript UI Components

## Introduction

Atto is a collection of lightweight JavaScript helper functions and basic UI components that I've built for my own personal use, but figured I'd share in case anyone else wants a *super* light library for something where the overhead of a full-blown library like [Dojo](http://dojotoolkit.com), [YUI](http://developer.yahoo.com/yui/), or [jQuery UI](http://jqueryui.com/) is undesirable. They have only one external dependency: since they're in AMD format, you'll need an AMD-compatible script loader like [RequireJS](http://requirejs.org/) or [curl](https://github.com/cujojs/curl), along with its associated Text plugin (which I use for dynamic template insertion). Beyond that, they're free from any other dependencies, work on all modern web browsers, and [degrade gracefully](http://en.wikipedia.org/wiki/Progressive_enhancement) on IE8 (IE6 and 7 are another matter, sadly, but I'm making the conscious decision not to support those at the moment).

In spirit they're probably more similar to [Wijmo](http://wijmo.com/widgets/) than anything else, but my goal is to make them even smaller and more self-contained than those (awesome though they are). Mostly, though, I just wrote them because I like to tinker. ;)

They're built using as much HTML5 and CSS3 as I could cram in, and lean on CSS3 Transitions to do the heavy lifting of state transformations and animations. As such, the user experience in IE8 is pretty barebones compared to that of more modern browsers. Of course you can replicate these behaviors using jQuery or Mootools or Dojo.FX, but then they wouldn't be quite so ultralight anymore, so I'd rather not.

More information can be found on Atto's official home [here](http://www.buyog.com/atto/).

## Running the demos locally

*Note:* It's probably still better to just set up a web server on your machine, as the demos weren't really meant to be run locally. But, if that's not an option, this solution should get you the majority of the core functionality.

* Download the atto source code. Place it somewhere like C:\\code\\js\\atto
* Download require.js, *and* its text.js plugin (required to load CSS). Place it in the directory above atto, e.g. C:\\code\\js
* OPTIONAL: Download the GoodDog font and CSS file [from FontSquirrel](http://www.fontsquirrel.com/fonts/GoodDog). Place it in C:\\fonts\\gooddog. Or, edit the location pointed to from the import statement in demopage.css.
* You'll probably need to run your browser with custom flags enabled so that XHR requests (dynamic CSS/template fetching) will work. In Google Chrome, you do this by specifying "--disable-web-security" on the command line.
