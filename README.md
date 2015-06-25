# Citra-admin
This project contains the admin interface source code for Citra-emu's website.
It consists entirely of frontend code that will interface with the RESTful APIs of
the main site.

## Building
Citra-admin requires Node.js to be built. For Linux, you may either want to consult your
distribution's package manager or [NodeSource](https://github.com/nodesource/distributions). For Mac OS X and Windows, you can install Node.js using the [official packages](https://nodejs.org/download/). Finally, you can use [Homebrew](http://brew.sh/) to install Node.js on Mac OS X.

Once you have Node.js installed, you'll want to install the citra-admin requirements. Do this with the following:

```sh
npm install
```

To compile everything, just call `npm run build`. To run a test server at localhost:8080, run `npm run serve`.
