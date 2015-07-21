# decorator-utils [![NPM version](http://img.shields.io/npm/v/decorator-utils.svg?style=flat-square)](https://www.npmjs.org/package/decorator-utils) [![Build status](http://img.shields.io/travis/lukehorvat/decorator-utils.svg?style=flat-square)](https://travis-ci.org/lukehorvat/decorator-utils)

Utilities for ES7 decorators.

## Installation

Install the package with NPM:

```bash
$ npm install decorator-utils
```

## Usage

A simple example:

```javascript
import {DecoratorUtils} from "decorator-utils";

function decorator() {
  if (DecoratorUtils.getType(arguments) !== DecoratorUtils.type.CLASS_METHOD) {
    throw new Error("Decorator target must be a class method declaration.");
  }
}

@decorator // Error will be thrown.
class Hello {
  @decorator // Error will NOT be thrown.
  world() {}
}
```

## API

TODO.
