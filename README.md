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
  if (DecoratorUtils.getDeclarationType(arguments) !== DecoratorUtils.declarationTypes.CLASS_METHOD) {
    throw new Error("Decorator must be applied to a class method declaration.");
  }
}

@decorator // Error will be thrown.
class Dog {
  @decorator // Error will NOT be thrown.
  woof() {}
}
```

## API

The package exposes a static class, `DecoratorUtils`, which has the following functions and properties:

### getDeclarationType(arguments)

- A function that can be called from within a decorator to determine the type of declaration that is being targeted. Useful for guarding a decorator against certain declaration types.
- Parameters:
  - **arguments** - The `arguments` object the decorator function was called with. Just pass it through!
- Returns a value from `DecoratorUtils.declarationTypes`.

### declarationTypes

- A property describing the set of possible declaration types that a decorator can target, as key-value pairs of an object (`String` -> [`Symbol`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)). To be used in conjunction with `DecoratorUtils.getDeclarationType()`.
- Keys:
  - `CLASS`
  - `CLASS_METHOD`
  - `CLASS_ACCESSOR`
  - `OBJECT_LITERAL_METHOD`
  - `OBJECT_LITERAL_ACCESSOR`
