# dpub: Deno static site generator

A simple Deno-based static site generator. Transforms markdown files to HTML, slots into EJS templates, and minifies the result. Github-style markdown is supported with code blocks and tables.

Experimental code. Not recommended for production but you can adapt it if you like.


## Usage

Build a site to `./build` directory using source `.md`, `.ejs`, `.html` etc. files contained in a `./src` directory.

```sh
deno run --allow-env --allow-read=./src --allow-write=./build dpub.js
```

Add a `--watch` parameter for automated builds when files change.

```sh
deno run --allow-env --allow-read=./src --allow-write=./build dpub.js --watch
```

EJS templates are found in `./src/_layout`. Front matter determines which template to use, e.g.

```md
---
title: Main heading
layout: main.ejs
---
Content
```

The following parameters can be used:

* `--watch` - watch files and rebuild
* `--production` - production build (currently does nothing)
* `--src=<dir>` - set the source directory
* `--layout=<dir>` - set the EJS templates directory (inside `src`)
* `--build=<dir>` - set the build directory

Changing `src` or `build` directories requires changes to `--allow-read` and `--allow-write`.
