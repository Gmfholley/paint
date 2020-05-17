# Description

This is a fun side project implementation of an online coloring app using SVGs and css.

The production website is a static site.  All work of converting image files, downloading them, and coloring them, are done client side.

I couldn't find a site that allowed you to color your own SVG, quite like this, so I built it.

## Dev Dependencies

1. npm and Node (to use npm commands - optional)
1. ruby (or some other way to run a server)
1. svgstore (to build svg sprite sheets - or do this manually)


## Vendor Dependencies

1. [potrace-wasm](https://github.com/IguteChung/potrace-wasm), a web assembly of potrace, for converting images into svg
1. [vanilla-picker](https://vanilla-picker.js.org/), a vanilla JS implementation of a color picker

This is a very simplified site with no minification, tasks, or bundling.  I've included the dependent packages from npm, but they are only there for reference.

## Local Tasks

### Sprite sheets
Svgs are defined on a sprite sheet in `images/svg-sprite.svg` and included in `index.html` as an object.  On window load, JavaScript moves those definitions inline, but that only works locally on Firefox without adjustment (or by adjusting Chrome settings).

To add/change sprites:
1. Add sprites to the `images/icons` folder with an extension of `.svg`.
1. Run `$ bin/svg_icon.sh` in terminal/bash, and that will remove the old sprite sheet and create a new one.

Or update the sprites sheet manually.


### Local Server
This website uses native JS modules, which are not supported locally due to CORS restrictions.  So to run this locally, you will need to run a server.

Run a local server however you'd like from this directory.

If you have ruby installed, then run the following command in terminal/bash.
`$ ruby -run -e httpd . -p 8000`

(I use ruby, so the `npm start` command is defined as the above ruby command, and you could use it too.)

Or with python:

```
 $ python -m SimpleHTTPServer 8000  # Python 2
 $ python -m http.server 8000       # Python 3
```

If you then visit local host and the port specified in a browser, it will server the `index.html` file.